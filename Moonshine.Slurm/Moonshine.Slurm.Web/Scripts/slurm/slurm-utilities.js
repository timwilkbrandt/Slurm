var slurm = new slurm || {};

slurm.utiliies = {

    ShowContainer: function (selector) {

        $(selector).removeClass('hidden');
    },

    HideContainer: function (selector) {

        $(selector).addClass('hidden');

    }


};