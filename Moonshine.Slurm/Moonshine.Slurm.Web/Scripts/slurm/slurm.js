/// <reference path="slurm-utilities.js" />
/// <reference path="../clipboard.min.js" />

var slurm = slurm || {};

slurm.main = {

    util: slurm.utilities || {},
    completedSteps: [],
    lastView: null,
    selectedDate: null,
    fb_authtoken:null,

    init: function () {
        slurm.main.initDatePicker();
        slurm.main.FBEventSelected();
        slurm.main.ExecuseSelected();
        slurm.main.PrivateEventTypeClick();
        slurm.main.PublicEventTypeClick();
        slurm.main.TrendingEventTypeClick();
        slurm.main.BeginStepsClick();
        slurm.main.GoHomeClick();
        slurm.main.FBCloseClick();
    },

    initDatePicker: function () {
        $("#datepicker").datepicker({
            //inline: true
        });

        $("#datepicker").on("change", function () {
            slurm.main.selectedDate = $(this).val();
            slurm.main.ShowStep2();
        });
    },

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
        
        id === '#home' ? slurm.main.util.showHomeContainer() : slurm.main.util.hideHomeContainer();

        if (slurm.main.completedSteps.length < 1) {
            slurm.main.util.showContainer(id);
            slurm.main.util.addSpecificClass(id, 'active');
            slurm.main.util.addSpecificClass('#nav-calendar-btn', 'active');
            $(id).fadeIn('slow', function () { slurm.main.initFBAuthToken(); });
        } else {
            slurm.main.util.changeViews(id);
        }
    },

    ShowStep1: function () { slurm.main.changeViews('#calendar-content'); slurm.main.completedSteps = []; },

    ShowStep2: function () { slurm.main.completedSteps.push('#calendar-content'); slurm.main.changeViews('#event-choice-content'); slurm.main.ShowNavBttns('#nav-calendar-btn'); },

    ShowStep3: function () { slurm.main.completedSteps.push('#event-choice-content'); slurm.main.changeViews('#event-section-content'); slurm.main.ShowNavBttns('#nav-private-events-btn'); slurm.main.ShowNavBttns('#nav-public-events-btn') },

    ShowStep4: function () { slurm.main.completedSteps.push('#excuse-section-content'); slurm.main.changeViews('#excuse-section-content'); slurm.main.ShowNavBttns('#nav-trending-excuses-btn') },

    ShowRosettaExcuses: function () { slurm.main.changeViews('#rosetta-excuses'); },

    ShowTrendingExcuses: function () { slurm.main.changeViews('#trending-excuses'); },

    ShowFacebookLogin: function () { slurm.main.changeViews('#facebook-login'); },

    CloseRosettaExcuses: function () { slurm.main.returnToSteps(); },

    CloseTrendingExcuses: function () { slurm.main.returnToSteps(); },

    CloseFacebookLogin: function () { slurm.main.returnToSteps(); },

    /*clicks events*/
    FBEventSelected: function () {
        $(document).on('click', '.event', function () {
            slurm.main.ShowStep4();
        });
       
    },

    ExecuseSelected: function () {
        $(document).on('click', '.excuse', function () {

            //Save - copy excuse and return - display excuse confirmation
            /*
            <textarea id="bar">Mussum ipsum cacilds...</textarea>
            <!-- Trigger -->
            <button class="btn" data-clipboard-action="cut" data-clipboard-target="#bar">
                Cut to clipboard
            </button>
            */
        });
    },

    BeginStepsClick: function () {
        $('.logo-large').on('click', function () {
            slurm.main.ShowStep1();
        });     
    },

    PublicEventTypeClick: function () {
        $('#public-btn').on('click', function () {
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

    RosettaExcuseCloseBttnClick: function () {
        $('#rosetta-close-bttn').on('click', function () {
            slurm.main.returnHome();
        })
    },

    GoHomeClick: function () {
        $('#home-bttn').on('click', function () {
            slurm.main.returnHome();
        })
    },

    ShowNavBttns: function (id) {
        $(id).fadeIn('slow', function () { });
    },

    ShowOverlay: function () { },
    HideOverlay: function () { },

    initFBAuthToken: function () {
        FB.getLoginStatus(function (response) {
            console.log(response);
            if (response.status === 'connected') {

                var uid = response.authResponse.userID;
                slurm.main.fb_authtoken = response.authResponse.accessToken;
            } else if (response.status === 'not_authorized') {
                slurm.main.ShowOverlay();
            } else {
                slurm.main.ShowOverlay();
            }
        });
    },

    FBCloseClick: function () {
        $('.fb-close-bttn').on('click', function () {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    // the user is logged in and has authenticated your
                    // app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed
                    // request, and the time the access token 
                    // and signed request each expire
                    var uid = response.authResponse.userID;
                    slurm.main.fb_authtoken = response.authResponse.accessToken;

                    slurm.utilities.removeSpecificClass('.overlay-container','active')

                } else if (response.status === 'not_authorized') {
                    // the user is logged in to Facebook, 
                    // but has not authenticated your app
                } else {
                    // the user isn't logged in to Facebook.
                }
            });
        });
    }
  
};

$(document).ready(function () {
    slurm.main.init();
});