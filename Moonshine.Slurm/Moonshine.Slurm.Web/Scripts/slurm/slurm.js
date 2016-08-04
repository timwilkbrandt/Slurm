/// <reference path="slurm-utilities.js" />

var slurm = new slurm || {};

slurm.main = {
    util: slurm.utilities || {},
    completedSteps: [],

    init: function () { },

    returnToSteps: function () {
        
        var id = '#step1';

        if(slurm.main.completedSteps.length > 0) {
            id = slurm.main.completedSteps[slurm.main.completedSteps.length - 1];
        }
        
        slurm.main.changeViews(id);

    },

    returnHome: function () {

        slurm.main.completedSteps = [];
        slurm.main.changeViews('#home');

    },

    changeViews: function (id) {

        slurm.main.util.changeViews(id);

    },

    ShowStep1: function () { slurm.main.changeViews('#step1'); slurm.main.completedSteps = [];},

    ShowStep2: function () { slurm.main.changeViews('#step2'); slurm.main.completedSteps.push('#step1'); },

    ShowStep3: function () { slurm.main.changeViews('#step3'); slurm.main.completedSteps.push('#step2'); },

    ShowStep4: function () { slurm.main.changeViews('#step4'); slurm.main.completedSteps.push('#step3'); },

    ShowRosettaExcuses: function () { slurm.main.changeViews('#rosetta-excuses'); },

    ShowTrendingExcuses: function () { slurm.main.changeViews('#trending-excuses'); },

    ShowFacebookLogin: function () { slurm.main.changeViews('#facebook-login'); },

    CloseRosettaExcuses: function () { slurm.main.returnToSteps(); },

    CloseTrendingExcuses: function () { slurm.main.returnToSteps(); },

    CloseFacebookLogin: function () { slurm.main.returnToSteps(); },

    FBEventSelected: function () {
        $('.fb-event-item').on('click', function () {
            slurm.main.ShowStep4();
        });
       
    },

    ExecuseSelected: function () {
        $('.excuse-item').on('click', function () {
            //Save - copy excuse and return - display excuse confirmation
        });
    },

    CalendarDateSelected: function () {
        $('.calendar-date-selected').on('click', function () {
            slurm.main.ShowStep2();
        });
    },

    PublicEventTypeClick: function () {
        $('#public-event-bttn').on('click', function () {
            slurm.main.ShowStep3();
        });
    },

    PrivateEventTypeClick: function () {
        $('#private-event-bttn').on('click', function () {
            //TODO Grab authtoken from cache see if it's null;
            if (false) {
                slurm.main.ShowFacebookLogin();
            } else {
                slurm.main.ShowStep3();
            }
        });
    },

    TrendingEventTypeClick: function () {
        $('#trending-event-bttn').on('click', function () {
            slurm.main.ShowTrendingExcuses();
        })
    },

    GoHomeClick: function () {
        $('#home-bttn').on('click', function () {
            slurm.main.returnHome();
        })
    },
  
};

