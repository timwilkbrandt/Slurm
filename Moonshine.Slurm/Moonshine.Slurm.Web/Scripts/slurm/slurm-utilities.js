var slurm = slurm || {};

slurm.utilities = {

    settings: {
        fbOauthToken: null,
        views: ['#homepage-content', '#calendar-content', '#event-choice-content', '#event-section-content', '#excuse-section-content', '#trending-excuses', '#facebook-login', '#rosetta-excuse'],
        navBttns: ['#nav-calendar-btn', '#nav-public-events-btn', '#nav-private-events-btn', '#nav-trending-excuses-btn']
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

    addSpecificClass: function(selector, className)
    {
        if (!$(selector).hasClass(className)) {

            $(selector).addClass(className);
        }
    },

    removeSpecificClass: function (selector, className) {
        if ($(selector).hasClass(className)) {

            $(selector).removeClass(className);
        }
    },

    showHomeContainer: function () {

        $('#wrapper').removeClass('generating');

        if (!$('#wrapper').hasClass('home')) {

            $('#wrapper').addClass('home');
        }

    },

    hideHomeContainer: function () {

        $('#wrapper').removeClass('home');

        if (!$('#wrapper').hasClass('generating')) {

            $('#wrapper').addClass('generating');
        }
    },

    changeViews: function (selector) {
        $.each(slurm.utilities.settings.views, function (index, view) {
            if ($(view).hasClass('active')) {
                $(view).fadeOut('fast', function () {
                    slurm.utilities.removeSpecificClass(view, 'active');
                    slurm.utilities.addSpecificClass(selector, 'active');
                    $(selector).fadeIn('slow', function () { });
                });
            }
        });
    },

    changeNavItems: function (selector) {
        $.each(slurm.utilities.settings.navBttns, function (index, navBttn) {
            if ($(navBttn).hasClass('active')) {
                $(navBttn).fadeOut('fast', function () {
                    slurm.utilities.removeSpecificClass(navBttn, 'active');
                    slurm.utilities.addSpecificClass(selector, 'active');
                    $(selector).fadeIn('slow', function () { });
                });
            }
        });
    }

};