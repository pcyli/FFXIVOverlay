define(['jquery'], function ($) {

    this.state = {
        heartBeatWatcher: 0,
        fadeOutTime: 25,
        fadeOutOpacity: 0.2
    };

    var that = this;

    function fadeOverlay (state) {
        var targetElement = $('#combatantTable');

        function toggleChartVisibility(displayType) {
            var opacity,
                otherElements = $('#toggle, #encounter');

            if (displayType === 'table') {
                opacity = 1;
            } else {
                opacity = state.fadeOutOpacity;
            }

            targetElement.css('display', displayType);
            otherElements.css('opacity', opacity);
        }

        targetElement.css('display') === 'table' || toggleChartVisibility('table');

        clearTimeout(state.heartBeatWatcher);

        state.heartBeatWatcher = setTimeout(function () {
            targetElement.fadeOut('slow', function () {
                toggleChartVisibility('none');
            });
        }, state.fadeOutTime * 1000);
    };

    $(document).on('heartbeat',
        function () {
            fadeOverlay(that.state);
    });


});