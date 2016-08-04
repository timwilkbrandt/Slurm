var slurm = new slurm || {};

slurm.utiliies = {

    Settings: {
        fbOauthToken: null
    },

    ShowContainer: function (selector) {

        $(selector).removeClass('hidden');
    },

    HideContainer: function (selector) {

        $(selector).addClass('hidden');

    }
};