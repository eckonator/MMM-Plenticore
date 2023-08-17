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

    // Override start method
    start: function () {
        console.log("Starting module: " + this.name);
        this.config = Object.assign({}, this.defaults, this.config);
        this.sendSocketNotification("FETCH_PLENTICORE_DATA", this.config);
    },

    // Override notificationReceived method
    notificationReceived: function (notification, payload, sender) {
        // Handle notifications if needed
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
        // Here you can update the module's DOM to display the received data
        // For example, you can use the data to update text, symbols, or tables
        // Use the data to populate the relevant information in the DOM
    },

    // Override getDom method
    getDom: function () {
        // Here you can generate and return the DOM element for your module
        // For example, create and return tables, texts, symbols, etc.
    },
});