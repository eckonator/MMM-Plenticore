Module.register("MMM-Plenticore", {
    // Module config defaults
    defaults: {
        ipaddress: "192.168.178.xxx",
        port: "80",
        https: false,
        password: "",
        pollinterval: 20000,
        showStats: true,
        colored: false,
        runOwnJsonApiServerInLocalNetwork: false,
        ownJsonApiServerPort: 4000,
        debugMode: false
    },

    pentidata: null,

    getStyles: function () {
        return ['MMM-Plenticore.css'];
    },

    getScripts: function() {
        return [];
    },

    start: function() {
        this.config = Object.assign({}, this.defaults, this.config);
        Log.info("Starting module: " + this.name);
        this.sendSocketNotification("FETCH_PLENTICORE_DATA", this.config);
    },

    // Override socketNotificationReceived method
    socketNotificationReceived: function (notification, payload) {
        if(notification === "PLENTICORE_DATA") {
            // Handle the received data and update the module's DOM
            this.updateDomWithData(payload);
        }
    },

    // Method to update the module's DOM with received data
    updateDomWithData: function (data) {
        this.pentiData = data;
        this.pentiDataOrig = Object.assign({}, this.pentiData);
        this.pentiDataOrig.MaxHomeConsumptionSource = Math.max(...[this.pentiData.PvGenerator,
                                                                (this.pentiData.Grid*-1),
                                                                this.pentiData.Battery]);
        this.colorPvGenerator = '#B4CD34';
        this.colorPvGeneratorText = '#000000';
        this.colorGridPurchase = '#C8CCCB';
        this.colorGridPurchaseText = '#000000';
        this.colorGridFeedIn = '#FFC033';
        this.colorGridFeedInText = '#000000';
        this.colorBatteryCharge = '#76DAFE';
        this.colorBatteryChargeText = '#000000';
        this.colorBatteryDischarge = '#1E7DB5';
        this.colorBatteryDischargeText = '#FFFFFF';

        if(this.pentiData.PvGenerator >= 1000) {
            this.pentiData.PvGenerator = (this.pentiData.PvGenerator / 1000).toFixed(2) + ' kW >';
        } else if(this.pentiData.PvGenerator <= 0) {
            this.pentiData.PvGenerator = 'Standby';
        } else {
            this.pentiData.PvGenerator = Math.floor(this.pentiData.PvGenerator) + ' W >';
        }

        if(this.pentiData.HomeConsumption >= 1000) {
            this.pentiData.HomeConsumption = (this.pentiData.HomeConsumption / 1000).toFixed(2) + ' kW >';
        } else if(this.pentiData.HomeConsumption <= -1000) {
            this.pentiData.HomeConsumption = '< ' +((this.pentiData.HomeConsumption / 1000).toFixed(2)*(-1)) + ' kW';
        } else if(this.pentiData.HomeConsumption < 0) {
            this.pentiData.HomeConsumption = '< ' + (Math.floor(this.pentiData.HomeConsumption)*(-1)) + ' W';
        } else {
            this.pentiData.HomeConsumption = Math.floor(this.pentiData.HomeConsumption) + ' W >';
        }

        if(this.pentiData.Grid >= 1000) {
            this.pentiData.Grid = (this.pentiData.Grid / 1000).toFixed(2) + ' kW >';
        } else if(this.pentiData.Grid <= -1000) {
            this.pentiData.Grid = '< ' +((this.pentiData.Grid / 1000).toFixed(2)*(-1)) + ' kW';
        } else if(this.pentiData.Grid < 0) {
            this.pentiData.Grid = '< ' + (Math.floor(this.pentiData.Grid)*(-1)) + ' W';
        } else {
            this.pentiData.Grid = Math.floor(this.pentiData.Grid) + ' W >';
        }

        if(this.pentiData.Battery >= 1000) {
            this.pentiData.Battery = (this.pentiData.Battery / 1000).toFixed(2) + ' kW >';
        } else if(this.pentiData.Battery <= -1000) {
            this.pentiData.Battery = '< ' +((this.pentiData.Battery / 1000).toFixed(2)*(-1)) + ' kW';
        } else if(this.pentiData.Battery < 0) {
            this.pentiData.Battery = '< ' + (Math.floor(this.pentiData.Battery)*(-1)) + ' W';
        } else {
            this.pentiData.Battery = Math.floor(this.pentiData.Battery) + ' W >';
        }

        this.updateDom();
    },

    createRingChart: function(wrapper, selector, percent) {
        const ringTarget = wrapper.querySelector(selector);

        if (!ringTarget) {
            return;
        }

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "50");
        svg.setAttribute("height", "50");

        const backgroundCircle = document.createElementNS(svgNS, "circle");
        backgroundCircle.setAttribute("cx", "25");
        backgroundCircle.setAttribute("cy", "25");
        backgroundCircle.setAttribute("r", "20");
        backgroundCircle.setAttribute("fill", "none");
        backgroundCircle.setAttribute("stroke", "rgba(255,255,255,.1)");
        backgroundCircle.setAttribute("stroke-width", "5");
        svg.appendChild(backgroundCircle);

        const ring = document.createElementNS(svgNS, "circle");
        ring.setAttribute("cx", "25");
        ring.setAttribute("cy", "25");
        ring.setAttribute("r", "20");
        ring.setAttribute("fill", "none");
        ring.setAttribute("stroke", "white");
        ring.setAttribute("stroke-width", "5");
        const circumference = 2 * Math.PI * 20;
        ring.setAttribute("stroke-dasharray", circumference);
        ring.setAttribute("stroke-dashoffset", circumference * (1 - percent / 100));
        svg.appendChild(ring);

        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", "25");
        text.setAttribute("y", "25");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-size", "12");
        text.setAttribute("fill", "white");
        text.textContent = percent + "%";
        svg.appendChild(text);

        ringTarget.innerHTML = '';
        ringTarget.appendChild(svg);
    },

    // Override getDom method
    getDom: function () {
        const self = this;

        console.log('MMM-Plenticore: Refreshing DOM...');

        const wrapperEl = document.createElement("div")
        wrapperEl.setAttribute("class", "mmm-plenticore-wrapper");
        wrapperEl.innerHTML = '<svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 568.36 489.05">\n' +
            '  <g id="b">\n' +
            '    <polyline id="c" class="x" points="71.71 170.23 71.71 217.87 221.11 217.87"/>\n' +
            '    <g id="d">\n' +
            '      <rect id="e" class="y" x="79.57" y="200.01" width="125.24" height="35.72" rx="11.91" ry="11.91"/>\n' +
            '      <g id="f">\n' +
            '        <g class="w">\n' +
            '          <text class="v" transform="translate(95.36 224.96)"><tspan x="0" y="0" class="textBox" id="plentiPvGenerator">--- W</tspan></text>\n' +
            '        </g>\n' +
            '      </g>\n' +
            '    </g>\n' +
            '    <path class="y" d="m59.84,149.97h-21.15v-36.12c0-1.71,3.01-4.09,4.97-4.09h11.04c1.97,0,5.08,2.38,5.08,4.09v.33s.05.07.05.12v35.66h0Z"/>\n' +
            '    <path class="y" d="m86.2,149.97h-21.17v-57.26c0-1.71,3.01-4.09,4.97-4.09h11.04c1.97,0,5.08,2.38,5.08,4.09v.31c.01.11.08.15.08.29v56.66h0Z"/>\n' +
            '    <path class="y" d="m112.57,149.97h-21.18v-49.6c0-1.71,3.01-4.09,4.98-4.09h11.04c1.14,0,2.59.81,3.68,1.81.32.24.57.52.79.82.04.05.08.09.11.14.33.51.58,1.04.58,1.61v49.3h0Z"/>\n' +
            '    <path class="y" d="m86.09,63.53l-10.11-9.5,7.6-11.65-13.85-.78-1.66-13.77-11.11,8.31-10.15-9.5-3.17,13.5-13.84-.77,6.2,12.39-11.1,8.31,12.77,5.5-3.16,13.52,13.27-4.02,6.29,12.38,7.61-11.6,12.75,5.45-1.61-13.78,13.28-4.01v.02Zm-15.65.62c-2.17,4.04-5.44,6.71-9.83,8.04-4.36,1.32-8.57.9-12.61-1.27-4.05-2.16-6.73-5.43-8.06-9.82-1.32-4.39-.9-8.6,1.27-12.64,2.16-4.03,5.44-6.71,9.83-8.03,4.39-1.32,8.59-.9,12.63,1.26,4.04,2.17,6.72,5.44,8.04,9.83s.9,8.6-1.27,12.63Z"/>\n' +
            '  </g>\n' +
            '  <g id="g">\n' +
            '    <polyline id="h" class="x" points="488.4 169.83 488.4 217.87 338.11 217.87"/>\n' +
            '    <g id="i">\n' +
            '      <rect id="j" class="y" x="355.3" y="200.01" width="125.24" height="35.72" rx="11.91" ry="11.91"/>\n' +
            '      <g id="k">\n' +
            '        <g class="w">\n' +
            '          <text class="v" transform="translate(371.09 224.96)"><tspan x="0" y="0" class="textBox" id="plentiGrid">--- W</tspan></text>\n' +
            '        </g>\n' +
            '      </g>\n' +
            '    </g>\n' +
            '    <polygon class="y" points="503.66 149.72 472.93 150.18 479.23 97.4 444.88 97.4 481.07 80.79 481.98 67.65 452.2 67.65 483.85 52 488.38 18.72 492.87 51.97 524.35 67.65 494.72 67.65 495.63 80.84 531.92 97.4 497.44 97.4 503.66 149.72"/>\n' +
            '  </g>\n' +
            '  <g id="l">\n' +
            '    <polyline id="m" class="x" points="488.4 334.45 488.4 277.39 338.11 277.39"/>\n' +
            '    <g id="n">\n' +
            '      <rect id="o" class="y" x="355.3" y="259.54" width="125.24" height="35.72" rx="11.91" ry="11.91"/>\n' +
            '      <g id="p">\n' +
            '        <g class="w">\n' +
            '          <text class="v" transform="translate(371.09 285.49)"><tspan x="0" y="0" class="textBox" id="plentiHome">--- W</tspan></text>\n' +
            '        </g>\n' +
            '      </g>\n' +
            '    </g>\n' +
            '    <path class="y" d="m543.74,407.16h-8.01l-38.76-35.98c-4.73-4.71-12.41-4.86-17.07-.21l-39.1,36.19h-7.75c-3.75,0-4.6-1.82-1.87-4.42l52.25-49.4c2.74-2.59,7.2-2.52,9.94.07l52.24,49.29c2.74,2.6,1.9,4.46-1.87,4.46Z"/>\n' +
            '    <path class="y" d="m493.44,376.99c-2.19-2.17-6.17-2.15-8.24-.09l-38.41,35.78v50.32c0,2.89,1.59,7.55,4.48,7.55h74.25c2.89,0,6.45-4.65,6.45-7.55v-50.09l-38.54-35.93h0Zm-23.22,31.58c6.26,0,11.51,3.65,12.87,8.53h-4.73c-1.31-2.4-4.46-4.1-8.14-4.1s-6.82,1.7-8.14,4.1h-4.73c1.36-4.88,6.61-8.53,12.87-8.53h0Zm18.67,46.86c-14.4,0-26.23-9.57-27.58-21.81h55.16c-1.35,12.24-13.18,21.81-27.59,21.81h.01Zm26.77-38.33c-1.31-2.4-4.47-4.1-8.14-4.1s-6.82,1.7-8.14,4.1h-4.73c1.36-4.88,6.6-8.53,12.87-8.53s11.51,3.65,12.87,8.53h-4.73Z"/>\n' +
            '  </g>\n' +
            '  <path class="y" d="m241.5,296.98c-.31-1.24-2.58-89.19-2.58-89.98,0-2.25,4.36-6.76,7.28-8.88l2.13,107.24c-2.74-2.31-6.32-6.3-6.83-8.37h0Z"/>\n' +
            '  <path class="y" d="m318.61,296.96c-.56,2.2-4.52,6.52-7.3,8.74l2.15-107.93c2.88,1.94,7.73,6.83,7.73,9.21,0,.79-2.27,88.72-2.58,89.97h0Z"/>\n' +
            '  <path class="y" d="m280.03,218.8c-6.21,0-11.26,5.05-11.26,11.26s5.05,11.26,11.26,11.26,11.26-5.05,11.26-11.26-5.05-11.26-11.26-11.26Z"/>\n' +
            '  <path class="y" d="m280.05,195.04c-10.35.25-22.47.7-28.79,1.5l2.2,110.95c6.11.84,18.96,1.51,23.98,1.51.56,0,1.06-.01,1.48-.02l1.1-.05c.3.02.76.04,1.15.05.43,0,.93.02,1.48.02,4.9,0,17.25-.65,23.51-1.45l2.2-111.07c-6.45-.77-18.2-1.2-28.31-1.44h0Zm13.52,70.98c0,1.98-1.61,3.6-3.59,3.6h-19.89c-1.98,0-3.59-1.61-3.59-3.6v-8.92c0-1.97,1.62-3.59,3.59-3.59h19.89c1.98,0,3.59,1.61,3.59,3.59v8.92h0Zm-13.54-19.6c-9.02,0-16.36-7.34-16.36-16.36s7.34-16.36,16.36-16.36,16.36,7.34,16.36,16.36-7.34,16.36-16.36,16.36h0Z"/>\n' +
            '  <g id="q" data-name="l">\n' +
            '    <polyline id="r" data-name="m" class="x" points="220.21 278.75 69.92 278.75 69.92 369.29"/>\n' +
            '    <g id="s" data-name="n">\n' +
            '      <rect id="t" data-name="o" class="y" x="77.78" y="260.9" width="125.24" height="35.72" rx="11.91" ry="11.91"/>\n' +
            '      <g id="u" data-name="p">\n' +
            '        <g class="w">\n' +
            '          <text class="v" transform="translate(95.35 286.85)"><tspan x="0" y="0" class="textBox" id="plentiBattery">--- W</tspan></text>\n' +
            '        </g>\n' +
            '      </g>\n' +
            '    </g>\n' +
            '    <g id="v" data-name="n">\n' +
            '      <rect id="w" data-name="o" class="y" x="195.78" y="360.9" width="166" height="35.72" rx="11.91" ry="11.91"/>\n' +
            '      <g id="x" data-name="p">\n' +
            '        <g class="w">\n' +
            '          <text class="v" transform="translate(209 386)"><tspan x="0" y="0" class="textBox" id="plentiBatterySoC">Batterie: -- %</tspan></text>\n' +
            '        </g>\n' +
            '      </g>\n' +
            '    </g>\n' +
            '    <path class="y" d="m112.59,394.82h-8.42v-8.56h-23.27v8.56h-22.16v-8.56h-23.27v8.56h-8.49c-5.37,0-9.76,4.39-9.76,9.75v56.35c0,5.36,4.39,9.74,9.76,9.74h85.61c5.36.01,9.76-4.37,9.76-9.74v-56.36c0-5.36-4.4-9.75-9.76-9.75Zm-54.43,43.94h-11.18v11.23h-7.17v-11.23h-11.19v-7.12h11.19v-11.18h7.17v11.18h11.18v7.12Zm49.82-.65h-23.68v-7.37h23.68v7.37Z"/>\n' +
            '  </g>\n' +
            '</svg>';
        
        if(this.pentiData) {
            let textElement = wrapperEl.querySelector('#plentiPvGenerator');
            textElement.textContent = this.pentiData.PvGenerator;

            textElement = wrapperEl.querySelector('#plentiHome');
            textElement.textContent = this.pentiData.HomeConsumption;

            textElement = wrapperEl.querySelector('#plentiGrid');
            textElement.textContent = this.pentiData.Grid;
            
            if(this.pentiData.Battery_U > 0 || this.pentiData.Battery_SoC > 0) {
                textElement = wrapperEl.querySelector('#plentiBattery');
                textElement.textContent = this.pentiData.Battery;
                textElement = wrapperEl.querySelector('#plentiBatterySoC');
                textElement.textContent = 'Batterie: ' + this.pentiData.Battery_SoC + ' %';
            } else {
                textElement = wrapperEl.querySelector('#q');
                textElement.style.display = 'none';
                textElement.style.visibility = "hidden";
            }
            
            if(this.config.colored) {
                textElement = wrapperEl.querySelector('#e');
                if(this.pentiDataOrig.PvGenerator > 0) {
                    textElement.style.fill = this.colorPvGenerator;
                    wrapperEl.querySelector('#plentiPvGenerator').style.fill = this.colorPvGeneratorText;
                    wrapperEl.querySelector('#c').style.stroke = this.colorPvGenerator;
                }
                
                textElement = wrapperEl.querySelector('#j');
                if(this.pentiDataOrig.Grid > 0) {
                    textElement.style.fill = this.colorGridFeedIn;
                    wrapperEl.querySelector('#plentiGrid').style.fill = this.colorGridFeedInText;
                    wrapperEl.querySelector('#h').style.stroke = this.colorGridFeedIn;
                } else if(this.pentiDataOrig.Grid < 0) {
                    textElement.style.fill = this.colorGridPurchase;
                    wrapperEl.querySelector('#plentiGrid').style.fill = this.colorGridPurchaseText;
                    wrapperEl.querySelector('#h').style.stroke = this.colorGridPurchase;
                }
                
                textElement = wrapperEl.querySelector('#o');
                if(this.pentiDataOrig.Grid < 0) {
                    textElement.style.fill = this.colorGridPurchase;
                } else if(this.pentiDataOrig.Battery > 0) {
                    textElement.style.fill = this.colorBatteryDischarge;
                } else {
                    textElement.style.fill = this.colorPvGenerator;
                }
                
                textElement = wrapperEl.querySelector('#t');
                if(this.pentiDataOrig.Battery < 0) {
                    textElement.style.fill = this.colorBatteryCharge;
                    wrapperEl.querySelector('#plentiBattery').style.fill = this.colorBatteryChargeText;
                    wrapperEl.querySelector('#r').style.stroke = this.colorBatteryCharge;
                } else if(this.pentiDataOrig.Battery > 0) {
                    textElement.style.fill = this.colorBatteryDischarge;
                    wrapperEl.querySelector('#plentiBattery').style.fill = this.colorBatteryDischargeText;
                    wrapperEl.querySelector('#r').style.stroke = this.colorBatteryDischarge;
                }
                
                textElement = wrapperEl.querySelector('#o');
                switch(this.pentiDataOrig.MaxHomeConsumptionSource) {
                  case (this.pentiDataOrig.Grid * -1):
                    textElement.style.fill = this.colorGridPurchase;
                    wrapperEl.querySelector('#plentiHome').style.fill = this.colorGridPurchaseText;
                    wrapperEl.querySelector('#m').style.stroke = this.colorGridPurchase;
                    break;
                  case this.pentiDataOrig.Battery:
                    textElement.style.fill = this.colorBatteryDischarge;
                    wrapperEl.querySelector('#plentiHome').style.fill = this.colorBatteryDischargeText;
                    wrapperEl.querySelector('#m').style.stroke = this.colorBatteryDischarge;
                    break;
                  default:
                    textElement.style.fill = this.colorPvGenerator;
                    wrapperEl.querySelector('#plentiHome').style.fill = this.colorPvGeneratorText;
                    wrapperEl.querySelector('#m').style.stroke = this.colorPvGenerator;
                }
            }
        }

        if(this.config.showStats && this.pentiData) {
            wrapperEl.innerHTML = wrapperEl.innerHTML + '<div id="plenti-stats">\n' +
                '    <header class="module-header">PV-Anlagen Statistik</header>\n' +
                '    <div id="plenti-stats-inner" class="container">\n' +
                '        <div class="row">\n' +
                '            <div id="plenti-todayCount" class="col-12 col-md-6">\n' +
                '                <h5>Heute (<span id="plenti-todayConsumption_kWh">--- kWh</span>)</h5>\n' +
                '                <div class="col-md-6">\n' +
                '                    <h6>Verbrauch</h6>\n' +
                '                    <div class="ring-chart" id="plenti-todayConsumption"></div>\n' +
                '                </div>\n' +
                '                <div class="col-md-6">\n' +
                '                    <h6>Autarkie</h6>\n' +
                '                    <div class="ring-chart" id="plenti-todayAutarky"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div id="plenti-monthCount" class="col-12 col-md-6">\n' +
                '                <h5>Monat (<span id="plenti-monthConsumption_kWh">--- kWh</span>)</h5>\n' +
                '                <div class="col-md-6">\n' +
                '                    <h6>Verbrauch</h6>\n' +
                '                    <div class="ring-chart" id="plenti-monthConsumption"></div>\n' +
                '                </div>\n' +
                '                <div class="col-md-6">\n' +
                '                    <h6>Autarkie</h6>\n' +
                '                    <div class="ring-chart" id="plenti-monthAutarky"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '        <div class="row">\n' +
                '            <div id="plenti-yearCount" class="col-12 col-md-6">\n' +
                '                <h5>Jahr (<span id="plenti-yearConsumption_kWh">--- kWh</span>)</h5>\n' +
                '                <div class="col-md-6">\n' +
                '                    <h6>Verbrauch</h6>\n' +
                '                    <div class="ring-chart" id="plenti-yearConsumption"></div>\n' +
                '                </div>\n' +
                '                <div class="col-md-6">\n' +
                '                    <h6>Autarkie</h6>\n' +
                '                    <div class="ring-chart" id="plenti-yearAutarky"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div id="plenti-totalCount" class="col-12 col-md-6">\n' +
                '                <h5>Total (<span id="plenti-totalConsumption_kWh">--- kWh</span>)</h5>\n' +
                '                <div class="col-md-6">\n' +
                '                    <h6>Verbrauch</h6>\n' +
                '                    <div class="ring-chart" id="plenti-totalConsumption"></div>\n' +
                '                </div>\n' +
                '                <div class="col-md-6">\n' +
                '                    <h6>Autarkie</h6>\n' +
                '                    <div class="ring-chart" id="plenti-totalAutarky"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';

            let textElement = wrapperEl.querySelector('#plenti-todayConsumption_kWh');
            textElement.textContent = (this.pentiData.Statistic_Yield_Day / 1000).toFixed(2) + ' kWh';

            textElement = wrapperEl.querySelector('#plenti-monthConsumption_kWh');
            textElement.textContent = (this.pentiData.Statistic_Yield_Month / 1000).toFixed(2) + ' kWh';

            textElement = wrapperEl.querySelector('#plenti-yearConsumption_kWh');
            textElement.textContent = (this.pentiData.Statistic_Yield_Year / 1000).toFixed(2) + ' kWh';

            textElement = wrapperEl.querySelector('#plenti-totalConsumption_kWh');
            textElement.textContent = (this.pentiData.Statistic_Yield_Total / 1000).toFixed(2) + ' kWh';

            this.createRingChart(wrapperEl, '#plenti-todayConsumption', this.pentiData.Statistic_OwnConsumptionRate_Day);
            this.createRingChart(wrapperEl, '#plenti-todayAutarky', this.pentiData.Statistic_Autarky_Day);

            this.createRingChart(wrapperEl, '#plenti-monthConsumption', this.pentiData.Statistic_OwnConsumptionRate_Month);
            this.createRingChart(wrapperEl, '#plenti-monthAutarky', this.pentiData.Statistic_Autarky_Month);

            this.createRingChart(wrapperEl, '#plenti-yearConsumption', this.pentiData.Statistic_OwnConsumptionRate_Year);
            this.createRingChart(wrapperEl, '#plenti-yearAutarky', this.pentiData.Statistic_Autarky_Year);

            this.createRingChart(wrapperEl, '#plenti-totalConsumption', this.pentiData.Statistic_OwnConsumptionRate_Total);
            this.createRingChart(wrapperEl, '#plenti-totalAutarky', this.pentiData.Statistic_Autarky_Total);
        }

        return wrapperEl;

    },
});