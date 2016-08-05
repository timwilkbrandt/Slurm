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

    GetPublicEvents: function (callback) {
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