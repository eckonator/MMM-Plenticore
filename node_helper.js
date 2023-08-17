const NodeHelper = require('node_helper');
const axios = require('axios');
const {KOSTAL} = require("./lib/kostal");
const https = require("https");
const http = require("http");

module.exports = NodeHelper.create({
    ipaddress: "192.168.178.xxx",
    apiurl: "/api/v1/",
    port: "80",
    https: false,
    password: "",
    pollinterval: 20000,
    loginSessionId: false,
    hasBattery: false,
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
            console.log('Missing method in http request');
            return;
        } else if (!endpoint) {
            console.log('Missing endpoint in http request');
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
        console.log('Making request to endpoint ' + endpoint + ' with data ' + JSON.stringify(reqOpts));
        request.on('response', function (response) {
            let code = response.statusCode;
            let headers = response.headers;
            response.setEncoding('utf8');
            let body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                console.log('Result of request: ' + JSON.stringify({code: code, headers: headers, body: body}));
                if (code === 401 || code === 403) {
                    console.log('Request failed: ' + JSON.stringify({code: code, headers: headers, body: body}));
                    return;
                }
                callback && callback(body, code, headers);
            });
        });

        request.on('error', function (error) {
            console.log('API request failed with error ' + JSON.stringify(error));
            callback && callback('', 0, null);
        });
        request.on('close', function () {
            console.log('API connection closed');
        });

        if (data && (method === 'POST' || method === 'PUT')) {
            console.log('Sending post data to request: ' + data);
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
                    console.log('Login failed with code ' + code + ': ' + body);
                    callback && callback(true);
                    return;
                }

                let json = JSON.parse(body);
                if (!json.nonce) {
                    console.log('No nonce in json reply to start: ' + body);
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
                        console.log('auth/finish failed with code ' + code + ': ' + body);
                        callback && callback(true);
                        return;
                    }

                    let json = JSON.parse(body);
                    if (!json.token) {
                        console.log('No nonce in json reply to finish: ' + body);
                        callback && callback(true);
                        return;
                    }

                    let bitSignature = KOSTAL.base64.toBits(json.signature);

                    if (!KOSTAL.bitArray.equal(bitSignature, cHmac)) {
                        console.log('Signature verification failed!');
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
                            console.log('auth/create_session failed with code ' + code + ': ' + body);
                            callback && callback(true);
                            return;
                        }

                        let json = JSON.parse(body);
                        if (!json.sessionId) {
                            console.log('No session id in json reply to create session: ' + body);
                            callback && callback(true);
                            return;
                        }

                        current.loginSessionId = json.sessionId;
                        console.log('Session id is ' + current.loginSessionId);

                        current.loginSuccess(callback);
                    });
                });
            });
        } catch (error) {
            console.error('Error:', error);
        }
    },

    loginSuccess: function (callback) {
        let current = this;
        current.apiCall('GET', 'auth/me', null, function (body, code, headers) {
            console.log('auth/me: ' + body);
        });

        current.apiCall('GET', 'modules', null, function (body, code, headers) {
            if (code !== 200) {
                console.log('Could not get supported modules information. Code: ' + code + ', contents: ' + body);
                return;
            }

            let json = JSON.parse(body);
            if (!json.length) {
                console.log('No valid module info in json reply: ' + body);
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

            PVStringCount = pvcount;

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

            if (PVStringCount < 3 && pl.moduleid === 'devices:local:pv3') {
                continue;
            } else if (PVStringCount < 2 && pl.moduleid === 'devices:local:pv2') {
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
                console.log('Requesting ' + params.processdataids.join(',') + ' from ' + pl.moduleid + ' (processdata)');
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
                console.log('Requesting ' + params.settingids.join(',') + ' from ' + pl.moduleid + ' (settings)');
                payload_2.push(params);
            }
        }
    },

    logout: async function (callback) {
        try {
            this.apiCall('POST', 'auth/logout', null, function(body, code, headers) {
                if(code !== 200) {
                    console.log('Logout failed with code ' + code);
                } else {
                    console.log('Logged out from API');
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    },

    socketNotificationReceived: async function (notification, payload) {
        if (notification === 'FETCH_PLENTICORE_DATA') {
            try {
                this.ipaddress = payload.ipaddress;
                this.port = payload.port;
                this.https = payload.https;
                this.password = payload.password;
                this.pollinterval = payload.pollinterval;
                await this.login();
                console.log(this.loginSessionId);
                //await this.logout();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    },
});