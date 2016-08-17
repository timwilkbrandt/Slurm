/// <reference path="slurm-utilities.js" />
/// <reference path="../clipboard.min.js" />

var slurm = slurm || {};

slurm.main = {

    util: slurm.utilities || {},
    slurmSvc: slurm.services || {},
    completedSteps: [],
    lastView: null,
    selectedDate: null,
    fb_authtoken:null,
    maxEvent: 8,

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
        slurm.main.NavBttnClicks();
        slurm.main.initClipBoard();
        slurm.main.EventCloseClick();

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

    initClipBoard: function () {
        var clipboard = new Clipboard('.cb-bttn');
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
            slurm.main.initFBAuthToken();
            $(id).fadeIn('slow', function () {  });
        } else {
            slurm.main.util.changeViews(id);
        }
    },

    ShowStep1: function () { slurm.main.changeViews('#calendar-content'); slurm.main.completedSteps = []; },

    ShowStep2: function () { slurm.main.completedSteps.push('#calendar-content'); slurm.main.changeViews('#event-choice-content'); slurm.main.ShowNavBttns('#nav-calendar-btn'); },

    ShowStep3: function () { slurm.main.completedSteps.push('#event-choice-content'); slurm.main.changeViews('#event-section-content'); slurm.main.ShowNavBttns('#nav-private-events-btn'); slurm.main.ShowNavBttns('#nav-public-events-btn') },

    ShowStep4: function () { slurm.main.completedSteps.push('#excuse-section-content'); slurm.main.changeViews('#excuse-section-content'); slurm.main.ShowNavBttns('#nav-trending-excuses-btn');},

    ShowRosettaExcuses: function () { slurm.main.changeViews('#rosetta-excuses'); },

    ShowTrendingExcuses: function () { slurm.main.changeViews('#trending-excuses'); },

    ShowFacebookLogin: function () { slurm.main.changeViews('#facebook-login'); },

    CloseRosettaExcuses: function () { slurm.main.returnToSteps(); },

    CloseTrendingExcuses: function () { slurm.main.returnToSteps(); },

    CloseFacebookLogin: function () { slurm.main.returnToSteps(); },

    /*clicks events*/
    FBEventSelected: function () {
        $(document).on('click', '.event', function (e) {
            slurm.main.CreateExcuses($(this).attr('data-name'));
            slurm.main.ShowStep4();
        });
       
    },

    ExecuseSelected: function () {
        $(document).on('click', '.cb-bttn', function () {
            slurm.utilities.addSpecificClass('.overlay-container', 'active');
            slurm.utilities.addSpecificClass('.excuse-overlay', 'active');
            
        });
    },

    BeginStepsClick: function () {
        $('.logo-large').on('click', function () {
            slurm.main.ShowStep1();
        });     
    },

    PublicEventTypeClick: function () {
        $('#public-btn').on('click', function () {
            slurm.utilities.addSpecificClass('.custom-loader', 'active');
            slurm.main.slurmSvc.GetPublicEvents(slurm.main.PublicEventCallback, slurm.main.fb_authtoken, slurm.main.selectedDate);
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
        $('#header').on('click', function () {
            slurm.main.returnHome();
        });
    },

    NavBttnClicks: function () {
        $('#nav-calendar-btn').on('click', function () {
            slurm.main.ShowStep1();
        });

        $('#nav-public-events-btn').on('click', function () {
            slurm.main.ShowStep3();
        });
    },

    ShowNavBttns: function (id) {
        $(id).fadeIn('slow', function () { });
    },

    initFBAuthToken: function () {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                var uid = response.authResponse.userID;
                slurm.main.fb_authtoken = response.authResponse.accessToken;

            } else if (response.status === 'not_authorized') {
                slurm.utilities.addSpecificClass('.overlay-container', 'active');
                slurm.utilities.addSpecificClass('.fb-overlay', 'active');
            } else {
                slurm.utilities.addSpecificClass('.overlay-container', 'active');
                slurm.utilities.addSpecificClass('.fb-overlay', 'active');
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

                    slurm.utilities.removeSpecificClass('.fb-overlay', 'active');
                    slurm.utilities.removeSpecificClass('.overlay-container', 'active');

                } else if (response.status === 'not_authorized') {
                    // the user is logged in to Facebook, 
                    // but has not authenticated your app
                } else {
                    // the user isn't logged in to Facebook.
                }
            });
        });
    },

    EventCloseClick: function () {
        $('.excuse-close-bttn').on('click', function () {
            slurm.utilities.removeSpecificClass('.excuse-overlay', 'active');
            slurm.utilities.removeSpecificClass('.overlay-container', 'active');
        });
    },

    PublicEventCallback: function (response) {
        var counter = response.length < slurm.main.maxEvent ? response.length : slurm.main.maxEvent;
        var eventHtml = '';
        for (i = 0; i < counter; i++) {
            eventHtml += '<div class="event event-logo-' + i + '" data-name="' + response[i].name + '" data-start="' + response[i].formatted_start_time + '">';
            eventHtml += '<img src="' + response[i].picture.data.url + '" />';
            eventHtml += '<h4>' + response[i].name + '</h4>';
            eventHtml += '<p>' + response[i].formatted_start_time + '</p>'
            eventHtml += '</div>';
        }
        $('.event-container').html(eventHtml);

        slurm.utilities.removeSpecificClass('.custom-loader','active');
    },

    CreateExcuses: function (name) {
        //https://www.youtube.com/watch?v=_n5E7feJHw0
        //https://www.youtube.com/watch?v=3qP_p27l65Q
        //https://www.youtube.com/watch?v=TMjxeZ9FRDE&index=20&list=PLlO0nNY9sHlzWfuhnzH93lCfHISk_B5U8
        $('#excuse-0 a').html('Leela Excuse');
        $('#excuse-0 p').html('Hiya, Id love to, but I got this other event, <b>' + name + '</b>, kicking that day.');

        $('#excuse-1 a').html('Morbo Excuse');
        $('#excuse-1 p').html('I have a better event people are actually going to <b>' + name + '</b>. And your thing is Dooooomed!');

        $('#excuse-2 a').html('Zoidberg Excuse');
        $('#excuse-2 p').html('MmmmmHmmm. An event you say? Oh wait I already have one of those: <b>' + name + '</b>.');

        $('#excuse-3 a').html('Fry Excuse');
        $('#excuse-3 p').html('I cant make it im heading to <b>' + name + '</b>, and drinking some slurm.');

        $('#excuse-4 a').html('Farnsworth Excuse');
        $('#excuse-4 p').html('Whaaaa? Oh, I completely forgot I have an important whatchamacallit that i have to attend: <b>' + name + '</b>');

        $('#excuse-5 a').html('Hypno-Toad Excuse');
        $('#excuse-5 p').html('I have, <b>' + name + '</b>, <b>' + name + '</b>, <b>' + name + '</b>...');
    }
};

$(document).ready(function () {
    slurm.main.init();
});