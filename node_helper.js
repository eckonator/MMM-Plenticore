const NodeHelper = require('node_helper');
const {KOSTAL} = require("./lib/kostal");
const https = require("https");
const http = require("http");

module.exports = NodeHelper.create({
    ipaddress: "192.168.178.xxx",
    apiurl: "/api/v1/",
    port: "80",
    https: false,
    password: "",
    ownAPIServerStarted: false,
    runOwnJsonApiServerInLocalNetwork: false,
    ownJsonApiServerPort: 4000,
    pollinterval: 20000,
    debugMode: false,
    pVStringCount: null,
    proccessData: null,
    loginSessionId: false,
    hasBattery: false,
    plenticoreData: null,
    payloadData: [
        {
            "moduleid": "devices:local",
            "mappings": {
                "Dc_P": {
                    id: "devices.local.Dc_P",
                    type: 'float'
                },
                "DigitalIn": {
                    id: "devices.local.DigitalIn",
                    type: 'int'
                },
                "EM_State": {
                    id: "devices.local.EM_State",
                    type: 'int'
                },
                "HomeBat_P": {
                    id: "devices.local.HomeBat_P",
                    type: 'float'
                },
                "HomeGrid_P": {
                    id: "devices.local.HomeGrid_P",
                    type: 'float'
                },
                "HomeOwn_P": {
                    id: "devices.local.HomeOwn_P",
                    type: 'float'
                },
                "HomePv_P": {
                    id: "devices.local.HomePv_P",
                    type: 'float'
                },
                "Home_P": {
                    id: "devices.local.Home_P",
                    type: 'float'
                },
                "Inverter:State": {
                    id: "devices.local.inverter.State",
                    type: 'int'
                },
                "LimitEvuAbs": {
                    id: "devices.local.LimitEvuAbs",
                    type: 'float'
                }
            }
        },
        {
            "moduleid": "devices:local:ac",
            "mappings": {
                "CosPhi": {
                    id: "devices.local.ac.CosPhi",
                    type: 'float'
                },
                "Frequency": {
                    id: "devices.local.ac.Frequency",
                    type: 'float'
                },
                "L1_I": {
                    id: "devices.local.ac.L1_I",
                    type: 'float'
                },
                "L1_P": {
                    id: "devices.local.ac.L1_P",
                    type: 'float'
                },
                "L1_U": {
                    id: "devices.local.ac.L1_U",
                    type: 'float'
                },
                "L2_I": {
                    id: "devices.local.ac.L2_I",
                    type: 'float'
                },
                "L2_P": {
                    id: "devices.local.ac.L2_P",
                    type: 'float'
                },
                "L2_U": {
                    id: "devices.local.ac.L2_U",
                    type: 'float'
                },
                "L3_I": {
                    id: "devices.local.ac.L3_I",
                    type: 'float'
                },
                "L3_P": {
                    id: "devices.local.ac.L3_P",
                    type: 'float'
                },
                "L3_U": {
                    id: "devices.local.ac.L3_U",
                    type: 'float'
                },
                "P": {
                    id: "devices.local.ac.P",
                    type: 'int'
                },
                "Q": {
                    id: "devices.local.ac.Q",
                    type: 'float'
                },
                "S": {
                    id: "devices.local.ac.S",
                    type: 'float'
                }
            }
        },
        {
            "moduleid": "devices:local:battery",
            "mappings": {
                "Cycles": {
                    id: "devices.local.battery.Cycles",
                    type: 'int'
                },
                "SoC": {
                    id: "devices.local.battery.SoC",
                    type: 'int'
                },
                "I": {
                    id: "devices.local.battery.I",
                    type: 'float'
                },
                "U": {
                    id: "devices.local.battery.U",
                    type: 'float'
                },
                "P": {
                    id: "devices.local.battery.P",
                    type: 'int'
                }
            }
        },
        {
            "moduleid": "devices:local:pv1",
            "mappings": {
                "I": {
                    id: "devices.local.pv1.I",
                    type: 'float'
                },
                "U": {
                    id: "devices.local.pv1.U",
                    type: 'float'
                },
                "P": {
                    id: "devices.local.pv1.P",
                    type: 'float'
                }
            }
        },
        {
            "moduleid": "devices:local:pv2",
            "mappings": {
                "I": {
                    id: "devices.local.pv2.I",
                    type: 'float'
                },
                "U": {
                    id: "devices.local.pv2.U",
                    type: 'float'
                },
                "P": {
                    id: "devices.local.pv2.P",
                    type: 'float'
                }
            }
        },
        {
            "moduleid": "devices:local:pv3",
            "mappings": {
                "I": {
                    id: "devices.local.pv3.I",
                    type: 'float'
                },
                "U": {
                    id: "devices.local.pv3.U",
                    type: 'float'
                },
                "P": {
                    id: "devices.local.pv3.P",
                    type: 'float'
                }
            }
        },
        {
            "moduleid": "scb:export",
            "mappings": {
                "PortalConActive": {
                    id: "scb.export.PortalConActive",
                    type: 'boolean'
                }

            }
        },
        {
            "moduleid": "scb:statistic:EnergyFlow",
            "mappings": {
                "Statistic:Autarky:Day": {
                    id: "scb.statistic.EnergyFlow.AutarkyDay",
                    type: 'float'
                },
                "Statistic:Autarky:Month": {
                    id: "scb.statistic.EnergyFlow.AutarkyMonth",
                    type: 'float'
                },
                "Statistic:Autarky:Total": {
                    id: "scb.statistic.EnergyFlow.AutarkyTotal",
                    type: 'float'
                },
                "Statistic:Autarky:Year": {
                    id: "scb.statistic.EnergyFlow.AutarkyYear",
                    type: 'float'
                },
                "Statistic:EnergyHome:Day": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeDay",
                    type: 'float'
                },
                "Statistic:EnergyHome:Month": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeMonth",
                    type: 'float'
                },
                "Statistic:EnergyHome:Total": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeTotal",
                    type: 'float'
                },
                "Statistic:EnergyHome:Year": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeYear",
                    type: 'float'
                },
                "Statistic:EnergyHomeBat:Day": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeBatDay",
                    type: 'float'
                },
                "Statistic:EnergyHomeBat:Month": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeBatMonth",
                    type: 'float'
                },
                "Statistic:EnergyHomeBat:Total": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeBatTotal",
                    type: 'float'
                },
                "Statistic:EnergyHomeBat:Year": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeBatYear",
                    type: 'float'
                },
                "Statistic:EnergyHomeGrid:Day": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeGridDay",
                    type: 'float'
                },
                "Statistic:EnergyHomeGrid:Month": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeGridMonth",
                    type: 'float'
                },
                "Statistic:EnergyHomeGrid:Total": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeGridTotal",
                    type: 'float'
                },
                "Statistic:EnergyHomeGrid:Year": {
                    id: "scb.statistic.EnergyFlow.EnergyHomeGridYear",
                    type: 'float'
                },
                "Statistic:EnergyHomePv:Day": {
                    id: "scb.statistic.EnergyFlow.EnergyHomePvDay",
                    type: 'float'
                },
                "Statistic:EnergyHomePv:Month": {
                    id: "scb.statistic.EnergyFlow.EnergyHomePvMonth",
                    type: 'float'
                },
                "Statistic:EnergyHomePv:Total": {
                    id: "scb.statistic.EnergyFlow.EnergyHomePvTotal",
                    type: 'float'
                },
                "Statistic:EnergyHomePv:Year": {
                    id: "scb.statistic.EnergyFlow.EnergyHomePvYear",
                    type: 'float'
                },
                "Statistic:OwnConsumptionRate:Day": {
                    id: "scb.statistic.EnergyFlow.OwnConsumptionRateDay",
                    type: 'float'
                },
                "Statistic:OwnConsumptionRate:Month": {
                    id: "scb.statistic.EnergyFlow.OwnConsumptionRateMonth",
                    type: 'float'
                },
                "Statistic:OwnConsumptionRate:Total": {
                    id: "scb.statistic.EnergyFlow.OwnConsumptionRateTotal",
                    type: 'float'
                },
                "Statistic:OwnConsumptionRate:Year": {
                    id: "scb.statistic.EnergyFlow.OwnConsumptionRateYear",
                    type: 'float'
                },
                "Statistic:Yield:Day": {
                    id: "scb.statistic.EnergyFlow.YieldDay",
                    type: 'float'
                },
                "Statistic:Yield:Month": {
                    id: "scb.statistic.EnergyFlow.YieldMonth",
                    type: 'float'
                },
                "Statistic:Yield:Total": {
                    id: "scb.statistic.EnergyFlow.YieldTotal",
                    type: 'float'
                },
                "Statistic:Yield:Year": {
                    id: "scb.statistic.EnergyFlow.YieldYear",
                    type: 'float'
                },
                "Statistic:CO2Saving:Day": {
                    id: "scb.statistic.EnergyFlow.CO2SavingDay",
                    type: 'float'
                },
                "Statistic:CO2Saving:Month": {
                    id: "scb.statistic.EnergyFlow.CO2SavingMonth",
                    type: 'float'
                },
                "Statistic:CO2Saving:Year": {
                    id: "scb.statistic.EnergyFlow.CO2SavingYear",
                    type: 'float'
                },
                "Statistic:CO2Saving:Total": {
                    id: "scb.statistic.EnergyFlow.CO2SavingTotal",
                    type: 'float'
                }
            }
        }
    ],
    payloadSettings: [
        {
            "moduleid": "devices:local",
            "mappings": {
                "Battery:DynamicSoc:Enable": {
                    id: "devices.local.battery.DynamicSoc",
                    type: 'boolean'
                },
                "Battery:MinHomeComsumption": {
                    id: "devices.local.battery.MinHomeConsumption", // YES, it is named Comsumption in the API
                    type: 'float'
                },
                "Battery:MinSoc": {
                    id: "devices.local.battery.MinSoc",
                    type: 'int'
                },
                "Battery:SmartBatteryControl:Enable": {
                    id: "devices.local.battery.SmartBatteryControl",
                    type: 'boolean'
                },
                "Battery:Strategy": {
                    id: "devices.local.battery.Strategy",
                    type: 'int'
                },
                "Battery:SupportedTypes": {
                    id: "devices.local.battery.SupportedTypes",
                    type: 'int'
                },
                "Battery:Type": {
                    id: "devices.local.battery.Type",
                    type: 'int'
                },
                "Battery:ExternControl": {
                    id: "devices.local.battery.ExternControl",
                    type: 'int'
                },
                "Battery:ExternControl:DcPowerAbs": {
                    id: "devices.local.battery.ExternControl_DcPowerAbs",
                    type: 'int'
                },
                "Battery:ExternControl:MaxChargePowerAbs": {
                    id: "devices.local.battery.ExternControl_MaxChargePowerAbs",
                    type: 'int'
                },
                "Inverter:MaxApparentPower": {
                    id: "devices.local.inverter.MaxApparentPower",
                    type: 'int'
                },
                "EnergySensor:InstalledSensor": {
                    id: "devices.local.EnergySensor",
                    type: 'int'
                },
                "OptionKeys:StateKey0": {
                    id: "devices.local.StateKey0",
                    type: 'int'
                },
                /*"Properties:InverterType": {
                    id: "devices.local.inverter.Type",
                    type: 'boolean'
                },*/
                "Generator:ExtModuleControl:Enable": {
                    id: "devices.local.generator.ExtModuleControl",
                    type: 'boolean'
                },
                "Generator:ShadowMgmt:Enable": {
                    id: "devices.local.generator.ShadowMgmt",
                    type: 'int'
                }
                // "Inverter:ActivePowerLimitation","Inverter:MinActivePowerLimitation","Inverter:MaxActivePowerLimitation","EnergySensor:InstalledSensor","EnergySensor:SupportedSensors","EnergySensor:SensorPosition","EnergySensor:SupportedPositions","DigitalOutputs:Customer:ConfigurationFlags","DigitalInputs:Mode","EnergyMgmt:AcStorage
            }
        },
        {
            "moduleid": "scb:network",
            "mappings": {
                "Hostname": {
                    id: "scb.network.Hostname",
                    type: 'string'
                },
                "IPv4Address": {
                    id: "scb.network.IPv4Address",
                    type: 'string'
                },
                "IPv4Auto": {
                    id: "scb.network.IPv4Auto",
                    type: 'boolean'
                },
                "IPv4DNS1": {
                    id: "scb.network.IPv4DNS1",
                    type: 'string'
                },
                "IPv4DNS2": {
                    id: "scb.network.IPv4DNS2",
                    type: 'string'
                },
                "IPv4Gateway": {
                    id: "scb.network.IPv4Gateway",
                    type: 'string'
                },
                "IPv4Subnetmask": {
                    id: "scb.network.IPv4Subnetmask",
                    type: 'string'
                }
            }
        },
        {
            "moduleid": "scb:time",
            "mappings": {
                "NTPuse": {
                    id: "scb.time.NTPuse",
                    type: 'boolean'
                },
                "NTPservers": {
                    id: "scb.time.NTPservers",
                    type: 'string'
                },
                "Timezone": {
                    id: "scb.time.Timezone",
                    type: 'string'
                }
            }
        },
        {
            "moduleid": "scb:modbus",
            "mappings": {
                "ModbusEnable": {
                    id: "scb.modbus.ModbusEnable",
                    type: 'boolean'
                },
                "ModbusUnitId": {
                    id: "scb.modbus.ModbusUnitId",
                    type: 'int'
                }
            }
        },
        {
            "moduleid": "scb:export",
            "mappings": {
                "LastExport": {
                    id: "scb.export.LastExport",
                    type: 'timestamp'
                },
                "LastExportOk": {
                    id: "scb.export.LastExportOk",
                    type: 'timestamp'
                },
                "Portal": {
                    id: "scb.export.Portal",
                    type: 'int'
                },
                "ExportEnable": {
                    id: "scb.export.ExportEnable",
                    type: 'boolean'
                }
            }
        }
    ],
    booleanStates: [
        'scb.export.PortalConActive',
        'scb.time.NTPuse',
        'scb.network.IPv4Auto',
        'scb.modbus.ModbusEnable',
        'scb.export.ExportEnable',
        'devices.local.generator.ExtModuleControl',
        'devices.local.battery.SmartBatteryControl'
    ],
    batteryIds: [
        'devices.local.battery.Cycles',
        'devices.local.battery.SoC',
        'devices.local.battery.I',
        'devices.local.battery.U',
        'devices.local.battery.P',
        'devices.local.battery.DynamicSoc',
        'devices.local.battery.SmartBatteryControl',
        "devices.local.battery.MinHomeConsumption",
        "devices.local.battery.MinSoc",
        "devices.local.battery.SmartBatteryControl",
        "devices.local.battery.Strategy",
        "devices.local.battery.SupportedTypes",
        "devices.local.battery.Type",
        "devices.local.battery.ExternControl",
        "devices.local.battery.ExternControl_DcPowerAbs",
        "devices.local.battery.ExternControl_MaxChargePowerAbs"
    ],


    start: function () {
        console.log(this.name + ' is started!');
    },

    apiCall: async function (method, endpoint, data, callback) {
        if (!method) {
            if(this.debugMode) {
                console.log('Missing method in http request');
            }
            return;
        } else if (!endpoint) {
            if(this.debugMode) {
                console.log('Missing endpoint in http request');
            }
            return;
        }
        method = method.toUpperCase();
        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }
        const headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0'
        };
        if (data) {
            headers['Content-Type'] = 'application/json';
        }
        if (this.loginSessionId) {
            headers['Authorization'] = 'Session ' + this.loginSessionId;
        }
        const reqOpts = {
            method: method,
            port: this.port,
            host: this.ipaddress,
            path: this.apiurl + endpoint,
            headers: headers,
            rejectUnauthorized: false
        };

        let request;
        if (this.https) {
            request = https.request(reqOpts);
        } else {
            request = http.request(reqOpts);
        }
        if(this.debugMode) {
            console.log('Making request to endpoint ' + endpoint + ' with data ' + JSON.stringify(reqOpts));
        }
        request.on('response', function (response) {
            let code = response.statusCode;
            let headers = response.headers;
            response.setEncoding('utf8');
            let body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                if(this.debugMode) {
                    console.log('Result of request: ' + JSON.stringify({code: code, headers: headers, body: body}));
                }
                if (code === 401 || code === 403) {
                    if(this.debugMode) {
                        console.log('Request failed: ' + JSON.stringify({code: code, headers: headers, body: body}));
                    }
                    return;
                }
                callback && callback(body, code, headers);
            });
        });

        request.on('error', function (error) {
            if(this.debugMode) {
                console.log('API request failed with error ' + JSON.stringify(error));
            }
            callback && callback('', 0, null);
        });
        request.on('close', function () {
            if(this.debugMode) {
                console.log('API connection closed');
            }
        });

        if (data && (method === 'POST' || method === 'PUT')) {
            if(this.debugMode) {
                console.log('Sending post data to request: ' + data);
            }
            request.write(data);
        }
        request.end();
    },

    login: async function (callback) {
        try {
            let nonce = KOSTAL.getNonce();
            let payload = {
                username: 'user',
                nonce: nonce
            };

            let current = this;

            current.apiCall('POST', 'auth/start', payload, function (body, code, headers) {
                if (code !== 200) {
                    if(current.debugMode) {
                        console.log('Login failed with code ' + code + ': ' + body);
                    }
                    callback && callback(true);
                    return;
                }

                let json = JSON.parse(body);
                if (!json.nonce) {
                    if(current.debugMode) {
                        console.log('No nonce in json reply to start: ' + body);
                    }
                    callback && callback(true);
                    return;
                }

                let mainTransactionId = json.transactionId;
                let serverNonce = json.nonce;
                let salt = json.salt;
                let hashRounds = parseInt(json.rounds);

                let r = KOSTAL.pbkdf2(current.password, KOSTAL.base64.toBits(salt), hashRounds);
                let sKey = new KOSTAL.hash.hmac(r, KOSTAL.hash.sha256).mac('Client Key');
                let cKey = new KOSTAL.hash.hmac(r, KOSTAL.hash.sha256).mac('Server Key');
                let sHash = KOSTAL.hash.sha256.hash(sKey);
                let hashString = 'n=user,r=' + nonce + ',r=' + serverNonce + ',s=' + salt + ',i=' + hashRounds + ',c=biws,r=' + serverNonce;
                let sHmac = new KOSTAL.hash.hmac(sHash, KOSTAL.hash.sha256).mac(hashString);
                let cHmac = new KOSTAL.hash.hmac(cKey, KOSTAL.hash.sha256).mac(hashString);
                let proof = sKey.map(function (l, n) {
                    return l ^ sHmac[n];
                });

                let payload = {
                    transactionId: mainTransactionId,
                    proof: KOSTAL.base64.fromBits(proof)
                };

                current.apiCall('POST', 'auth/finish', payload, function (body, code, headers) {
                    if (code !== 200) {
                        if(current.debugMode) {
                            console.log('auth/finish failed with code ' + code + ': ' + body);
                        }
                        callback && callback(true);
                        return;
                    }

                    let json = JSON.parse(body);
                    if (!json.token) {
                        if(current.debugMode) {
                            console.log('No nonce in json reply to finish: ' + body);
                        }
                        callback && callback(true);
                        return;
                    }

                    let bitSignature = KOSTAL.base64.toBits(json.signature);

                    if (!KOSTAL.bitArray.equal(bitSignature, cHmac)) {
                        if(current.debugMode) {
                            console.log('Signature verification failed!');
                        }
                        callback && callback(true);
                        return;
                    }

                    let hashHmac = new KOSTAL.hash.hmac(sHash, KOSTAL.hash.sha256);
                    hashHmac.update('Session Key');
                    hashHmac.update(hashString);
                    hashHmac.update(sKey);
                    let digest = hashHmac.digest();
                    json.protocol_key = digest;
                    json.transactionId = mainTransactionId;

                    let pkey = json.protocol_key,
                        tok = json.token,
                        transId = json.transactionId,
                        encToken = KOSTAL.encrypt(pkey, tok);
                    let iv = encToken.iv,
                        tag = encToken.tag,
                        ciph = encToken.ciphertext,
                        payload = {
                            transactionId: transId,
                            iv: KOSTAL.base64.fromBits(iv),
                            tag: KOSTAL.base64.fromBits(tag),
                            payload: KOSTAL.base64.fromBits(ciph)
                        };

                    current.apiCall('POST', 'auth/create_session', payload, function (body, code, headers) {
                        if (code !== 200) {
                            if(current.debugMode) {
                                console.log('auth/create_session failed with code ' + code + ': ' + body);
                            }
                            callback && callback(true);
                            return;
                        }

                        let json = JSON.parse(body);
                        if (!json.sessionId) {
                            if(current.debugMode) {
                                console.log('No session id in json reply to create session: ' + body);
                            }
                            callback && callback(true);
                            return;
                        }

                        current.loginSessionId = json.sessionId;
                        console.log('MMM-Plenticore: Session id is ' + current.loginSessionId);

                        current.loginSuccess(callback);
                    });
                });
            });
        } catch (error) {
            if(this.debugMode) {
                console.error('Error:', error);
            }
        }
    },

    loginSuccess: function (callback) {
        let current = this;
        current.apiCall('GET', 'auth/me', null, function (body, code, headers) {
            if(current.debugMode) {
                console.log('auth/me: ' + body);
            }
        });

        current.apiCall('GET', 'modules', null, function (body, code, headers) {
            if (code !== 200) {
                if(current.debugMode) {
                    console.log('Could not get supported modules information. Code: ' + code + ', contents: ' + body);
                }
                return;
            }

            let json = JSON.parse(body);
            if (!json.length) {
                if(current.debugMode) {
                    console.log('No valid module info in json reply: ' + body);
                }
                return;
            }

            let pvcount = 0;
            for (let i = 0; i < json.length; i++) {
                let obj = json[i];
                if (obj.id.substr(0, 16) === 'devices:local:pv') {
                    pvcount++;
                } else if (obj.id === 'devices:local:battery') {
                    current.hasBattery = true;
                }
            }

            current.pVStringCount = pvcount;

            current.pollStates(current.pollinterval);
        });

        callback && callback(false);
    },

    pollStates: function (pollingTime) {
        let payload = [];
        let payload_2 = [];
        let current = this;

        for (let p = 0; p < this.payloadData.length; p++) {
            let pl = this.payloadData[p];

            if (current.pVStringCount < 3 && pl.moduleid === 'devices:local:pv3') {
                continue;
            } else if (current.pVStringCount < 2 && pl.moduleid === 'devices:local:pv2') {
                continue;
            }

            let params = {
                "moduleid": pl.moduleid,
                "processdataids": []
            };
            for (let idx in pl.mappings) {
                if (current.hasBattery !== true && this.batteryIds.includes(pl.mappings[idx].id)) {
                    continue;
                }
                params.processdataids.push(idx);
            }

            if (params.processdataids.length > 0) {
                if(current.debugMode) {
                    console.log('Requesting ' + params.processdataids.join(',') + ' from ' + pl.moduleid + ' (processdata)');
                }
                payload.push(params);
            }
        }

        for (let p = 0; p < this.payloadSettings.length; p++) {
            let pl = this.payloadSettings[p];

            let params = {
                "moduleid": pl.moduleid,
                "settingids": []
            };
            for (let idx in pl.mappings) {
                if (current.hasBattery !== true && this.batteryIds.includes(pl.mappings[idx].id)) {
                    continue;
                }
                params.settingids.push(idx);
            }

            if (params.settingids.length > 0) {
                if(current.debugMode) {
                    console.log('Requesting ' + params.settingids.join(',') + ' from ' + pl.moduleid + ' (settings)');
                }
                payload_2.push(params);
            }
        }

        current.apiCall('POST', 'processdata', payload, function (body, code, headers) {
            if (code === 200) {
                current.proccessData = JSON.parse(body);
                let Inverter_P = 0;
                let Grid_P = 0;
                let Home_P = 0;
                let PvGenerator_P = 0;
                let Battery_P = 0;
                let Battery_SoC = 0;
                let Battery_Type = 0;

                let Statistic_Autarky_Day = 0;
                let Statistic_Autarky_Month = 0;
                let Statistic_Autarky_Total = 0;
                let Statistic_Autarky_Year = 0;
                let Statistic_CO2Saving_Day = 0;
                let Statistic_CO2Saving_Month = 0;
                let Statistic_CO2Saving_Total = 0;
                let Statistic_CO2Saving_Year = 0;
                let Statistic_EnergyHome_Day = 0;
                let Statistic_EnergyHome_Month = 0;
                let Statistic_EnergyHome_Total = 0;
                let Statistic_EnergyHome_Year = 0;
                let Statistic_EnergyHomeBat_Day = 0;
                let Statistic_EnergyHomeBat_Month = 0;
                let Statistic_EnergyHomeBat_Total = 0;
                let Statistic_EnergyHomeBat_Year = 0;
                let Statistic_EnergyHomeGrid_Day = 0;
                let Statistic_EnergyHomeGrid_Month = 0;
                let Statistic_EnergyHomeGrid_Total = 0;
                let Statistic_EnergyHomeGrid_Year = 0;
                let Statistic_EnergyHomePv_Day = 0;
                let Statistic_EnergyHomePv_Month = 0;
                let Statistic_EnergyHomePv_Total = 0;
                let Statistic_EnergyHomePv_Year = 0;
                let Statistic_OwnConsumptionRate_Day = 0;
                let Statistic_OwnConsumptionRate_Month = 0;
                let Statistic_OwnConsumptionRate_Total = 0;
                let Statistic_OwnConsumptionRate_Year = 0;
                let Statistic_Yield_Day = 0;
                let Statistic_Yield_Month = 0;
                let Statistic_Yield_Total = 0;
                let Statistic_Yield_Year = 0;
                for (const obj of current.proccessData) {
                    if('devices:local:ac' === obj.moduleid) {
                        for (const data of obj.processdata) {
                            if('L1_P' === data.id) {
                                Inverter_P = Inverter_P + data.value;
                            }
                            if('L2_P' === data.id) {
                                Inverter_P = Inverter_P + data.value;
                            }
                            if('L3_P' === data.id) {
                                Inverter_P = Inverter_P + data.value;
                            }
                        }
                    }
                    if('devices:local:pv1' === obj.moduleid) {
                        for (const data of obj.processdata) {
                            if('P' === data.id) {
                                PvGenerator_P = PvGenerator_P + data.value;
                            }
                        }
                    }
                    if('devices:local:pv2' === obj.moduleid) {
                        for (const data of obj.processdata) {
                            if('P' === data.id) {
                                PvGenerator_P = PvGenerator_P + data.value;
                            }
                        }
                    }
                    if('devices:local:pv3' === obj.moduleid) {
                        for (const data of obj.processdata) {
                            if('P' === data.id) {
                                PvGenerator_P = PvGenerator_P + data.value;
                            }
                        }
                    }
                    if('devices:local' === obj.moduleid) {
                        for (const data of obj.processdata) {
                            if('Home_P' === data.id) {
                                Home_P = Home_P + data.value;
                            }
                        }
                    }

                    if('devices:local:battery' === obj.moduleid) {
                        for (const data of obj.processdata) {
                            if('P' === data.id) {
                                Battery_P = Battery_P + data.value;
                            }
                            if('SoC' === data.id) {
                                Battery_SoC = Battery_SoC + data.value;
                            }
                            if('Type' === data.id) {
                                Battery_Type = data.value;
                            }
                        }
                    }
                    if ('scb:statistic:EnergyFlow' === obj.moduleid) {
                        for (const data of obj.processdata) {
                            if ('Statistic:Autarky:Day' === data.id) {
                                Statistic_Autarky_Day = data.value;
                            }
                            if ('Statistic:Autarky:Month' === data.id) {
                                Statistic_Autarky_Month = data.value;
                            }
                            if ('Statistic:Autarky:Total' === data.id) {
                                Statistic_Autarky_Total = data.value;
                            }
                            if ('Statistic:Autarky:Year' === data.id) {
                                Statistic_Autarky_Year = data.value;
                            }
                            if ('Statistic:CO2Saving:Day' === data.id) {
                                Statistic_CO2Saving_Day = data.value;
                            }
                            if ('Statistic:CO2Saving:Month' === data.id) {
                                Statistic_CO2Saving_Month = data.value;
                            }
                            if ('Statistic:CO2Saving:Total' === data.id) {
                                Statistic_CO2Saving_Total = data.value;
                            }
                            if ('Statistic:CO2Saving:Year' === data.id) {
                                Statistic_CO2Saving_Year = data.value;
                            }
                            if ('Statistic:EnergyHome:Day' === data.id) {
                                Statistic_EnergyHome_Day = data.value;
                            }
                            if ('Statistic:EnergyHome:Month' === data.id) {
                                Statistic_EnergyHome_Month = data.value;
                            }
                            if ('Statistic:EnergyHome:Total' === data.id) {
                                Statistic_EnergyHome_Total = data.value;
                            }
                            if ('Statistic:EnergyHome:Year' === data.id) {
                                Statistic_EnergyHome_Year = data.value;
                            }
                            if ('Statistic:EnergyHomeBat:Day' === data.id) {
                                Statistic_EnergyHomeBat_Day = data.value;
                            }
                            if ('Statistic:EnergyHomeBat:Month' === data.id) {
                                Statistic_EnergyHomeBat_Month = data.value;
                            }
                            if ('Statistic:EnergyHomeBat:Total' === data.id) {
                                Statistic_EnergyHomeBat_Total = data.value;
                            }
                            if ('Statistic:EnergyHomeBat:Year' === data.id) {
                                Statistic_EnergyHomeBat_Year = data.value;
                            }
                            if ('Statistic:EnergyHomeGrid:Day' === data.id) {
                                Statistic_EnergyHomeGrid_Day = data.value;
                            }
                            if ('Statistic:EnergyHomeGrid:Month' === data.id) {
                                Statistic_EnergyHomeGrid_Month = data.value;
                            }
                            if ('Statistic:EnergyHomeGrid:Total' === data.id) {
                                Statistic_EnergyHomeGrid_Total = data.value;
                            }
                            if ('Statistic:EnergyHomeGrid:Year' === data.id) {
                                Statistic_EnergyHomeGrid_Year = data.value;
                            }
                            if ('Statistic:EnergyHomePv:Day' === data.id) {
                                Statistic_EnergyHomePv_Day = data.value;
                            }
                            if ('Statistic:EnergyHomePv:Month' === data.id) {
                                Statistic_EnergyHomePv_Month = data.value;
                            }
                            if ('Statistic:EnergyHomePv:Total' === data.id) {
                                Statistic_EnergyHomePv_Total = data.value;
                            }
                            if ('Statistic:EnergyHomePv:Year' === data.id) {
                                Statistic_EnergyHomePv_Year = data.value;
                            }
                            if ('Statistic:OwnConsumptionRate:Day' === data.id) {
                                Statistic_OwnConsumptionRate_Day = data.value;
                            }
                            if ('Statistic:OwnConsumptionRate:Month' === data.id) {
                                Statistic_OwnConsumptionRate_Month = data.value;
                            }
                            if ('Statistic:OwnConsumptionRate:Total' === data.id) {
                                Statistic_OwnConsumptionRate_Total = data.value;
                            }
                            if ('Statistic:OwnConsumptionRate:Year' === data.id) {
                                Statistic_OwnConsumptionRate_Year = data.value;
                            }
                            if ('Statistic:Yield:Day' === data.id) {
                                Statistic_Yield_Day = data.value;
                            }
                            if ('Statistic:Yield:Month' === data.id) {
                                Statistic_Yield_Month = data.value;
                            }
                            if ('Statistic:Yield:Total' === data.id) {
                                Statistic_Yield_Total = data.value;
                            }
                            if ('Statistic:Yield:Year' === data.id) {
                                Statistic_Yield_Year = data.value;
                            }
                        }
                    }
                    // console.log(`Module ID: ${obj.moduleid}`);
                    // for (const data of obj.processdata) {
                    //     console.log(data.id + ': ' + data.value);
                    //     // if(typeof data.value === 'number' && data.value > 10000) {
                    //     //     let value = (data.value/1000).toFixed(1) + ' kWh';
                    //     //     console.log(data.id + ': ' + value);
                    //     // } else {
                    //     //     let value = data.value;
                    //     //     console.log(data.id + ': ' + value);
                    //     // }
                    // }
                    // console.log('---');
                }

                console.log('MMM-Plenticore: Polling newest data from Plenticroe API...');

                Grid_P = Inverter_P - Home_P;

                if(current.debugMode) {
                    console.log('Inverter: ' + Math.floor(Inverter_P));
                    console.log('PvGenerator: ' + Math.floor(PvGenerator_P));
                    console.log('Battery: ' + Math.floor(Battery_P));
                    console.log('Battery_SoC: ' + Math.floor(Battery_SoC));
                    console.log('Battery_Type: ' + Math.floor(Battery_Type));
                    console.log('HomeConsumption: ' + Math.floor(Home_P));
                    console.log('Grid: ' + Math.floor(Grid_P));
                    console.log('Statistic_Autarky_Day: ' + Math.floor(Statistic_Autarky_Day));
                    console.log('Statistic_Autarky_Month: ' + Math.floor(Statistic_Autarky_Month));
                    console.log('Statistic_Autarky_Total: ' + Math.floor(Statistic_Autarky_Total));
                    console.log('Statistic_Autarky_Year: ' + Math.floor(Statistic_Autarky_Year));
                    console.log('Statistic_CO2Saving_Day: ' + Math.floor(Statistic_CO2Saving_Day));
                    console.log('Statistic_CO2Saving_Month: ' + Math.floor(Statistic_CO2Saving_Month));
                    console.log('Statistic_CO2Saving_Total: ' + Math.floor(Statistic_CO2Saving_Total));
                    console.log('Statistic_CO2Saving_Year: ' + Math.floor(Statistic_CO2Saving_Year));
                    console.log('Statistic_EnergyHome_Day: ' + Math.floor(Statistic_EnergyHome_Day));
                    console.log('Statistic_EnergyHome_Month: ' + Math.floor(Statistic_EnergyHome_Month));
                    console.log('Statistic_EnergyHome_Total: ' + Math.floor(Statistic_EnergyHome_Total));
                    console.log('Statistic_EnergyHome_Year: ' + Math.floor(Statistic_EnergyHome_Year));
                    console.log('Statistic_EnergyHomeBat_Day: ' + Math.floor(Statistic_EnergyHomeBat_Day));
                    console.log('Statistic_EnergyHomeBat_Month: ' + Math.floor(Statistic_EnergyHomeBat_Month));
                    console.log('Statistic_EnergyHomeBat_Total: ' + Math.floor(Statistic_EnergyHomeBat_Total));
                    console.log('Statistic_EnergyHomeBat_Year: ' + Math.floor(Statistic_EnergyHomeBat_Year));
                    console.log('Statistic_EnergyHomeGrid_Day: ' + Math.floor(Statistic_EnergyHomeGrid_Day));
                    console.log('Statistic_EnergyHomeGrid_Month: ' + Math.floor(Statistic_EnergyHomeGrid_Month));
                    console.log('Statistic_EnergyHomeGrid_Total: ' + Math.floor(Statistic_EnergyHomeGrid_Total));
                    console.log('Statistic_EnergyHomeGrid_Year: ' + Math.floor(Statistic_EnergyHomeGrid_Year));
                    console.log('Statistic_EnergyHomePv_Day: ' + Math.floor(Statistic_EnergyHomePv_Day));
                    console.log('Statistic_EnergyHomePv_Month: ' + Math.floor(Statistic_EnergyHomePv_Month));
                    console.log('Statistic_EnergyHomePv_Total: ' + Math.floor(Statistic_EnergyHomePv_Total));
                    console.log('Statistic_EnergyHomePv_Year: ' + Math.floor(Statistic_EnergyHomePv_Year));
                    console.log('Statistic_OwnConsumptionRate_Day: ' + Math.floor(Statistic_OwnConsumptionRate_Day));
                    console.log('Statistic_OwnConsumptionRate_Month: ' + Math.floor(Statistic_OwnConsumptionRate_Month));
                    console.log('Statistic_OwnConsumptionRate_Total: ' + Math.floor(Statistic_OwnConsumptionRate_Total));
                    console.log('Statistic_OwnConsumptionRate_Year: ' + Math.floor(Statistic_OwnConsumptionRate_Year));
                    console.log('Statistic_Yield_Day: ' + Math.floor(Statistic_Yield_Day));
                    console.log('Statistic_Yield_Month: ' + Math.floor(Statistic_Yield_Month));
                    console.log('Statistic_Yield_Total: ' + Math.floor(Statistic_Yield_Total));
                    console.log('Statistic_Yield_Year: ' + Math.floor(Statistic_Yield_Year));
                }

                current.plenticoreData = {
                    Inverter: Math.floor(Inverter_P),
                    PvGenerator: Math.floor(PvGenerator_P),
                    Battery: Math.floor(Battery_P),
                    Battery_SoC: Math.floor(Battery_SoC),
                    Battery_Type: Math.floor(Battery_Type),
                    HomeConsumption: Math.floor(Home_P),
                    Grid: Math.floor(Grid_P),
                    Statistic_Autarky_Day: Math.floor(Statistic_Autarky_Day),
                    Statistic_Autarky_Month: Math.floor(Statistic_Autarky_Month),
                    Statistic_Autarky_Total: Math.floor(Statistic_Autarky_Total),
                    Statistic_Autarky_Year: Math.floor(Statistic_Autarky_Year),
                    Statistic_CO2Saving_Day: Math.floor(Statistic_CO2Saving_Day),
                    Statistic_CO2Saving_Month: Math.floor(Statistic_CO2Saving_Month),
                    Statistic_CO2Saving_Total: Math.floor(Statistic_CO2Saving_Total),
                    Statistic_CO2Saving_Year: Math.floor(Statistic_CO2Saving_Year),
                    Statistic_EnergyHome_Day: Math.floor(Statistic_EnergyHome_Day),
                    Statistic_EnergyHome_Month: Math.floor(Statistic_EnergyHome_Month),
                    Statistic_EnergyHome_Total: Math.floor(Statistic_EnergyHome_Total),
                    Statistic_EnergyHome_Year: Math.floor(Statistic_EnergyHome_Year),
                    Statistic_EnergyHomeBat_Day: Math.floor(Statistic_EnergyHomeBat_Day),
                    Statistic_EnergyHomeBat_Month: Math.floor(Statistic_EnergyHomeBat_Month),
                    Statistic_EnergyHomeBat_Total: Math.floor(Statistic_EnergyHomeBat_Total),
                    Statistic_EnergyHomeBat_Year: Math.floor(Statistic_EnergyHomeBat_Year),
                    Statistic_EnergyHomeGrid_Day: Math.floor(Statistic_EnergyHomeGrid_Day),
                    Statistic_EnergyHomeGrid_Month: Math.floor(Statistic_EnergyHomeGrid_Month),
                    Statistic_EnergyHomeGrid_Total: Math.floor(Statistic_EnergyHomeGrid_Total),
                    Statistic_EnergyHomeGrid_Year: Math.floor(Statistic_EnergyHomeGrid_Year),
                    Statistic_EnergyHomePv_Day: Math.floor(Statistic_EnergyHomePv_Day),
                    Statistic_EnergyHomePv_Month: Math.floor(Statistic_EnergyHomePv_Month),
                    Statistic_EnergyHomePv_Total: Math.floor(Statistic_EnergyHomePv_Total),
                    Statistic_EnergyHomePv_Year: Math.floor(Statistic_EnergyHomePv_Year),
                    Statistic_OwnConsumptionRate_Day: Math.floor(Statistic_OwnConsumptionRate_Day),
                    Statistic_OwnConsumptionRate_Month: Math.floor(Statistic_OwnConsumptionRate_Month),
                    Statistic_OwnConsumptionRate_Total: Math.floor(Statistic_OwnConsumptionRate_Total),
                    Statistic_OwnConsumptionRate_Year: Math.floor(Statistic_OwnConsumptionRate_Year),
                    Statistic_Yield_Day: Math.floor(Statistic_Yield_Day),
                    Statistic_Yield_Month: Math.floor(Statistic_Yield_Month),
                    Statistic_Yield_Total: Math.floor(Statistic_Yield_Total),
                    Statistic_Yield_Year: Math.floor(Statistic_Yield_Year)
                }
                current.sendSocketNotification("PLENTICORE_DATA", current.plenticoreData);

                current.processDataResponse(body, 'processdata');
            } else {
                if(current.debugMode) {
                    console.log('Requesting processdata - ' + JSON.stringify(payload) + ') failed with code ' + code + ': ' + body);
                }
            }

            current.apiCall('POST', 'settings', payload_2, function (body, code, headers) {
                if (code === 200) {
                    current.processDataResponse(body, 'settings');
                } else {
                    if(current.debugMode) {
                        console.log('Requesting settings - ' + JSON.stringify(payload) + ') failed with code ' + code + ': ' + body);
                    }
                }

                let polling = setTimeout(function () {
                    current.pollStates(pollingTime);
                }, pollingTime);
            });
        });
    },

    processDataResponse: function (data, dataname) {
        let json = JSON.parse(data);
        if ('undefined' === typeof json) {
            if(this.debugMode) {
                console.log('Invalid json data received: ' + data);
            }
            return;
        }

        if (json.length <= 0 || !json[0]) {
            if(this.debugMode) {
                console.log('Invalid json data received: ' + JSON.stringify(data));
            }
            return;
        }

        let mappings_base = (dataname === 'settings' ? this.payloadSettings : this.payloadData);

        let ac_p = null;
        let home_p = null;
        let grid_p = null;

        let energy_yield = {
            'Day': null,
            'Month': null,
            'Year': null,
            'Total': null
        };

        let energy_own = {
            'Day': null,
            'Month': null,
            'Year': null,
            'Total': null
        };

        for (let j = 0; j < json.length; j++) {
            let moduleid = json[j].moduleid;
            if (json[j][dataname]) {
                for (let i in json[j][dataname]) {
                    let setting = json[j][dataname][i];

                    let mappings = {};
                    for (let m = 0; m < mappings_base.length; m++) {
                        if (mappings_base[m].moduleid === moduleid) {
                            mappings = mappings_base[m].mappings;
                            break;
                        }
                    }

                    if (mappings[setting.id]) {
                        let obj = mappings[setting.id];
                        let objid = obj.id;
                        let objtype = obj.type;

                        if (objtype === 'boolean') {
                            if(this.debugMode) {
                                console.log('Converting ' + setting.value + ' to bool for ' + objid);
                            }
                            setting.value = (setting.value === 1 || setting.value === '1');
                        } else if (objtype === 'int') {
                            if(this.debugMode) {
                                console.log('Converting ' + setting.value + ' to int for ' + objid);
                            }
                            setting.value = parseInt(setting.value);
                        } else if (objtype === 'float') {
                            if(this.debugMode) {
                                console.log('Converting ' + setting.value + ' to float for ' + objid);
                            }
                            setting.value = parseFloat(setting.value);
                        } else if (objtype === 'timestamp') {
                            if(this.debugMode) {
                                console.log('Converting ' + setting.value + ' to timestamp for ' + objid);
                            }
                            setting.value = parseInt(setting.value) * 1000;
                        }

                        let set_yield_grid = false;
                        let set_grid_p = false;
                        if (objid === 'devices.local.ac.P') {
                            ac_p = setting.value;
                            set_grid_p = true;
                        } else if (objid === 'devices.local.Home_P') {
                            home_p = setting.value;
                            set_grid_p = true;
                        } else if (objid === 'scb.statistic.EnergyFlow.OwnConsumptionRateDay') {
                            energy_own['Day'] = setting.value;
                            set_yield_grid = 'Day';
                        } else if (objid === 'scb.statistic.EnergyFlow.OwnConsumptionRateMonth') {
                            energy_own['Month'] = setting.value;
                            set_yield_grid = 'Month';
                        } else if (objid === 'scb.statistic.EnergyFlow.OwnConsumptionRateYear') {
                            energy_own['Year'] = setting.value;
                            set_yield_grid = 'Year';
                        } else if (objid === 'scb.statistic.EnergyFlow.OwnConsumptionRateTotal') {
                            energy_own['Total'] = setting.value;
                            set_yield_grid = 'Total';
                        } else if (objid === 'scb.statistic.EnergyFlow.YieldDay') {
                            energy_yield['Day'] = setting.value;
                            set_yield_grid = 'Day';
                        } else if (objid === 'scb.statistic.EnergyFlow.YieldMonth') {
                            energy_yield['Month'] = setting.value;
                            set_yield_grid = 'Month';
                        } else if (objid === 'scb.statistic.EnergyFlow.YieldYear') {
                            energy_yield['Year'] = setting.value;
                            set_yield_grid = 'Year';
                        } else if (objid === 'scb.statistic.EnergyFlow.YieldTotal') {
                            energy_yield['Total'] = setting.value;
                            set_yield_grid = 'Total';
                        }

                        if (set_grid_p === true && ac_p !== null && home_p !== null) {
                            grid_p = Math.round(ac_p - home_p);
                            if (grid_p > 0) {
                                if(this.debugMode) {
                                    console.log('Setting devices.local.ToGrid_P to ' + grid_p + " now.");
                                }
                            }
                        } else if (set_yield_grid !== false && energy_yield[set_yield_grid] !== null && energy_own[set_yield_grid] !== null) {
                            grid_p = Math.round(energy_yield[set_yield_grid] * (1 - (energy_own[set_yield_grid] / 100)));
                            if (grid_p > 0) {
                                if(this.debugMode) {
                                    console.log('Setting scb.statistic.EnergyFlow.EnergyToGrid' + set_yield_grid + ' to ' + grid_p + " now.");
                                }
                            }
                        }

                        if(this.debugMode) {
                            console.log('Setting ' + objid + ' to ' + setting.value + " now.");
                        }
                    } else {
                        if(this.debugMode) {
                            console.log('Not in mappings: ' + setting.id + ' = ' + setting.value);
                        }
                    }
                }
            }
        }
    },

    logout: async function (callback) {
        try {
            this.apiCall('POST', 'auth/logout', null, function (body, code, headers) {
                if (code !== 200) {
                    if(this.debugMode) {
                        console.log('Logout failed with code ' + code);
                    }
                } else {
                    if(this.debugMode) {
                        console.log('Logged out from API');
                    }
                }
            });
        } catch (error) {
            if(this.debugMode) {
                console.error('Error:', error);
            }
        }
    },

    startOwnJsonApiServer: async function() {
        const self = this;
        const requestListener = function(req, res) {
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.writeHead(200);
            res.end(JSON.stringify(self.plenticoreData));
        };
        const app = http.createServer(requestListener);
        app.listen(self.ownJsonApiServerPort);
    },

    socketNotificationReceived: async function (notification, payload) {
        if (notification === 'FETCH_PLENTICORE_DATA') {
            try {
                this.ipaddress = payload.ipaddress;
                this.port = payload.port;
                this.https = payload.https;
                this.password = payload.password;
                this.pollinterval = payload.pollinterval;
                this.runOwnJsonApiServerInLocalNetwork = payload.runOwnJsonApiServerInLocalNetwork;
                this.ownJsonApiServerPort = payload.ownJsonApiServerPort;
                this.debugMode = payload.debugMode;
                await this.login();
                if(this.runOwnJsonApiServerInLocalNetwork && !this.ownAPIServerStarted) {
                    this.ownAPIServerStarted = true;
                    await this.startOwnJsonApiServer();
                }
                if(this.debugMode) {
                    console.log(this.loginSessionId);
                }
                //await this.logout();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
});