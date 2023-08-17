Module.register("MMM-Plenticore", {
    // Module config defaults
    defaults: {
        ipaddress: "192.168.178.xxx",
        port: "80",
        https: false,
        password: "",
        pollinterval: 20000,
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
        if (notification === "PLENTICORE_DATA") {
            // Handle the received data and update the module's DOM
            this.updateDomWithData(payload);
        }
    },

    // Method to update the module's DOM with received data
    updateDomWithData: function (data) {
        this.pentiData = data;
        if (this.pentiData.PvGenerator >= 1000) {
            this.pentiData.PvGenerator = (this.pentiData.PvGenerator / 1000).toFixed(2) + ' kW >';
        } else {
            this.pentiData.PvGenerator = this.pentiData.PvGenerator + ' W >';
        }

        if(this.pentiData.PvGenerator === '0 W >') {
            this.pentiData.PvGenerator = 'Standby'
        }

        if (this.pentiData.State === 'buy') {
            if (this.pentiData.GridPurchase >= 1000) {
                this.pentiData.Grid = '< ' + (this.pentiData.GridPurchase / 1000).toFixed(2) + ' kW';
            } else {
                this.pentiData.Grid = '< ' + this.pentiData.GridPurchase + ' W';
            }
        } else {
            if (this.pentiData.GridSale >= 1000) {
                this.pentiData.Grid = (this.pentiData.GridSale / 1000).toFixed(2) + ' kW >';
            } else {
                this.pentiData.Grid = this.pentiData.GridSale + ' W >';
            }
        }

        if (this.pentiData.HomeConsumption >= 1000) {
            this.pentiData.HomeConsumption = (this.pentiData.HomeConsumption / 1000).toFixed(2) + ' kW >';
        } else {
            this.pentiData.HomeConsumption = this.pentiData.HomeConsumption + ' W >';
        }

        this.updateDom();
    },

    // Override getDom method
    getDom: function () {
        const self = this;

        console.log('MMM-Plenticore: Refreshing DOM...');

        const wrapperEl = document.createElement("div")
        wrapperEl.setAttribute("class", "mmm-plenticore-wrapper")
        wrapperEl.innerHTML = '<svg id="a" data-name="shape-inverter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 597 599.64">\n' +
            '  <g id="b" data-name="DcContainer">\n' +
            '    <polyline id="c" data-name="line-dc" class="s" points="84.6 182.64 84.6 277.24 234 277.24"/>\n' +
            '    <g id="d" data-name="gid 3cee6746 3">\n' +
            '      <rect id="e" data-name="canvas-text-dc" class="t" x="92.46" y="259.38" width="125.24" height="35.72" rx="11.91" ry="11.91"/>\n' +
            '      <g id="f" data-name="text-dc" class="q">\n' +
            '        <text class="r" transform="translate(108.25 284.33)"><tspan x="0" y="0" class="textBox" id="plentiPvGenerator">--- W</tspan></text>\n' +
            '      </g>\n' +
            '    </g>\n' +
            '    <path class="t" d="m72.73,157.34h-21.15v-36.12c0-1.71,3.01-4.09,4.97-4.09h11.04c1.97,0,5.08,2.38,5.08,4.09v.33s.05.07.05.12v35.66h0Z"/>\n' +
            '    <path class="t" d="m99.09,157.34h-21.17v-57.26c0-1.71,3.01-4.09,4.97-4.09h11.04c1.97,0,5.08,2.38,5.08,4.09v.31c.01.11.08.15.08.29v56.66h0Z"/>\n' +
            '    <path class="t" d="m125.46,157.34h-21.18v-49.6c0-1.71,3.01-4.09,4.98-4.09h11.04c1.14,0,2.59.81,3.68,1.81.32.24.57.52.79.82.04.05.08.09.11.14.33.51.58,1.04.58,1.61v49.3h0Z"/>\n' +
            '    <path class="t" d="m98.98,70.9l-10.11-9.5,7.6-11.65-13.85-.78-1.66-13.77-11.11,8.31-10.15-9.5-3.17,13.5-13.84-.77,6.2,12.39-11.1,8.31,12.77,5.5-3.16,13.52,13.27-4.02,6.29,12.38,7.61-11.6,12.75,5.45-1.61-13.78,13.28-4.01Zm-15.65.62c-2.17,4.04-5.44,6.71-9.83,8.04-4.36,1.32-8.57.9-12.61-1.27-4.05-2.16-6.73-5.43-8.06-9.82-1.32-4.39-.9-8.6,1.27-12.64,2.16-4.03,5.44-6.71,9.83-8.03,4.39-1.32,8.59-.9,12.63,1.26,4.04,2.17,6.72,5.44,8.04,9.83,1.32,4.39.9,8.6-1.27,12.63Z"/>\n' +
            '  </g>\n' +
            '  <g id="g" data-name="GridContainer">\n' +
            '    <polyline id="h" data-name="line-grid" class="s" points="501.29 182.64 501.29 277.24 351 277.24"/>\n' +
            '    <g id="i" data-name="gid 3cee6746 36">\n' +
            '      <rect id="j" data-name="canvas-text-grid" class="t" x="368.19" y="259.38" width="125.24" height="35.72" rx="11.91" ry="11.91"/>\n' +
            '      <g id="k" data-name="text-grid" class="q">\n' +
            '        <text class="r" transform="translate(383.98 284.33)"><tspan x="0" y="0" class="textBox" id="plentiGrid">--- W</tspan></text>\n' +
            '      </g>\n' +
            '    </g>\n' +
            '    <polygon class="t" points="516.55 161.09 485.82 161.55 492.12 108.77 457.77 108.77 493.96 92.16 494.87 79.02 465.09 79.02 496.74 63.37 501.27 30.09 505.76 63.34 537.24 79.02 507.61 79.02 508.52 92.21 544.81 108.77 510.33 108.77 516.55 161.09"/>\n' +
            '  </g>\n' +
            '  <g id="l" data-name="homeContainer">\n' +
            '    <polyline id="m" data-name="line-home" class="s" points="501.29 431.64 501.29 336.76 351 336.76"/>\n' +
            '    <g id="n" data-name="gid 3cee6746 48">\n' +
            '      <rect id="o" data-name="canvas-text-home" class="t" x="368.19" y="318.91" width="125.24" height="35.72" rx="11.91" ry="11.91"/>\n' +
            '      <g id="p" data-name="text-home" class="q">\n' +
            '        <text class="r" transform="translate(383.98 344.86)"><tspan x="0" y="0" class="textBox" id="plentiHome">--- W</tspan></text>\n' +
            '      </g>\n' +
            '    </g>\n' +
            '    <path class="t" d="m556.63,508.53h-8.01l-38.76-35.98c-4.73-4.71-12.41-4.86-17.07-.21l-39.1,36.19h-7.75c-3.75,0-4.6-1.82-1.87-4.42l52.25-49.4c2.74-2.59,7.2-2.52,9.94.07l52.24,49.29c2.74,2.6,1.9,4.46-1.87,4.46Z"/>\n' +
            '    <path class="t" d="m506.33,478.36c-2.19-2.17-6.17-2.15-8.24-.09l-38.41,35.78v50.32c0,2.89,1.59,7.55,4.48,7.55h74.25c2.89,0,6.45-4.65,6.45-7.55v-50.09l-38.54-35.93Zm-23.22,31.58c6.26,0,11.51,3.65,12.87,8.53h-4.73c-1.31-2.4-4.46-4.1-8.14-4.1-3.67,0-6.82,1.7-8.14,4.1h-4.73c1.36-4.88,6.61-8.53,12.87-8.53Zm18.67,46.86c-14.4,0-26.23-9.57-27.58-21.81h55.16c-1.35,12.24-13.18,21.81-27.59,21.81Zm26.77-38.33c-1.31-2.4-4.47-4.1-8.14-4.1s-6.82,1.7-8.14,4.1h-4.73c1.36-4.88,6.6-8.53,12.87-8.53s11.51,3.65,12.87,8.53h-4.73Z"/>\n' +
            '  </g>\n' +
            '  <path class="t" d="m254.39,356.35c-.31-1.24-2.58-89.19-2.58-89.98,0-2.25,4.36-6.76,7.28-8.88l2.13,107.24c-2.74-2.31-6.32-6.3-6.83-8.37Z"/>\n' +
            '  <path class="t" d="m331.5,356.33c-.56,2.2-4.52,6.52-7.3,8.74l2.15-107.93c2.88,1.94,7.73,6.83,7.73,9.21,0,.79-2.27,88.72-2.58,89.97Z"/>\n' +
            '  <path class="t" d="m292.92,278.17c-6.21,0-11.26,5.05-11.26,11.26s5.05,11.26,11.26,11.26,11.26-5.05,11.26-11.26-5.05-11.26-11.26-11.26Z"/>\n' +
            '  <path class="t" d="m292.94,254.41c-10.35.25-22.47.7-28.79,1.5l2.2,110.95c6.11.84,18.96,1.51,23.98,1.51.56,0,1.06-.01,1.48-.02l1.1-.05c.3.02.76.04,1.15.05.43,0,.93.02,1.48.02,4.9,0,17.25-.65,23.51-1.45l2.2-111.07c-6.45-.77-18.2-1.2-28.31-1.44Zm13.52,70.98c0,1.98-1.61,3.6-3.59,3.6h-19.89c-1.98,0-3.59-1.61-3.59-3.6v-8.92c0-1.97,1.62-3.59,3.59-3.59h19.89c1.98,0,3.59,1.61,3.59,3.59v8.92h0Zm-13.54-19.6c-9.02,0-16.36-7.34-16.36-16.36s7.34-16.36,16.36-16.36,16.36,7.34,16.36,16.36c0,9.02-7.34,16.36-16.36,16.36Z"/>\n' +
            '</svg>';

        if (this.pentiData) {
            let textElement = wrapperEl.querySelector('#plentiPvGenerator');
            textElement.textContent = this.pentiData.PvGenerator;

            textElement = wrapperEl.querySelector('#plentiGrid');
            textElement.textContent = this.pentiData.Grid;

            textElement = wrapperEl.querySelector('#plentiHome');
            textElement.textContent = this.pentiData.HomeConsumption;
        }

        return wrapperEl;
    },
});