var slurm = slurm || {};

slurm.utilities = {

    settings: {
        fbOauthToken: null,
        views: ['#homepage-content', '#calendar-content', '#event-choice-content', '#event-section-content', '#excuse-section-content', '#trending-excuses', '#facebook-login', '#rosetta-excuse']
    },

    showContainer: function (selector) {

        if ($(selector).hasClass('hidden')) {

            $(selector).removeClass('hidden');
        }

    },

    hideContainer: function (selector) {

        if (!$(selector).hasClass('hidden')) {

            $(selector).addClass('hidden');
        }
    },

    changeViews: function (selector) {

        $.each(slurm.utilities.settings.views, function (index, view) {
            if (!$(view).hasClass('hidden')) {
                $(view).fadeOut('fast', function () {
                    $(selector).fadeIn('slow', function () { });
                });
            }
        });
    }

};