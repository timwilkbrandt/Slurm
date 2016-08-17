var slurm = slurm || {};

slurm.services = {

    GetTrendingEvent: function (callback) {

        var sa = new serviceAdapter();
        sa.settings.enableLogging = true;
        sa.settings.isJson = true;
        sa.settings.url = 'SlurmServices/GetTrendingEvent';
        sa.settings.contentType = 'application/json';
        sa.callbacks.customSuccessCallback = function (e) {
            callback
        };
        sa.get();
    },

    GetPublicEvents: function (callback, authToken, eventDate) {
        var requestData = { 'Token': authToken, 'EventDate': eventDate };
        var sa = new serviceAdapter();
        sa.settings.enableLogging = false;
        sa.settings.data = JSON.stringify(requestData);
        sa.settings.isJson = true;
        sa.settings.url = 'SlurmServices/GetEvents';
        sa.callbacks.customSuccessCallback = callback;
        sa.postJson();
    },

    SaveSelectedEvent: function (data, calllback) {
        var sa = new serviceAdapter();
        sa.settings.enableLogging = true;
        sa.settings.isJson = true;
        sa.settings.url = 'SlurmServices/SaveSelectedEvent';
        sa.settings.data = data;
        sa.settings.contentType = 'application/json';
        sa.callbacks.customSuccessCallback = function (e) {
            callback
        };
        sa.send();
    }
};