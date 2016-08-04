var slurm = new slurm || {};

slurm.utilities = {

    Settings: {
        fbOauthToken: null,
        views: ['#home', '#step1', '#step2', '#step3', '#step4', '#trending', '#facebook-login', '#event-excuses']
    },

    ShowContainer: function (selector) {

        if ($(selector).hasClass('hidden')) {

            $(selector).removeClass('hidden');
        }

    },

    HideContainer: function (selector) {

        if (!$(selector).hasClass('hidden')) {

            $(selector).addClass('hidden');
        }
    },

    ChangeViews: function (selector) {

        $.each(slurm.utilities.Settings.views, function (index, view) {
            if (!$(view).hasClass('hidden')) {
                $(view).fadeOut('fast', function () {
                    $(selector).fadeIn('slow', function () { });
                });
            }
        });
    }

};