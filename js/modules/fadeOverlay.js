define(['jquery'], function ($) {

    var state = {
        heartBeatWatcher: 0,
        targetElement: $('#combatantTable'),
        fadeOutTime: 25,
        fadeOutOpacity: 0.2
    };

    function toggleChartVisibility(displayType) {
        var opacity,
            targetElement = getState().targetElement,
            otherElements = $('#toggle, #encounter');

        if (displayType === 'table') {
            opacity = 1;
        } else {
            opacity = state.fadeOutOpacity;
        }

        targetElement.css('display', displayType);
        otherElements.css('opacity', opacity);
    }

    function hideOverlay () {
        var targetElement = getState().targetElement;

        targetElement.fadeOut('slow', postFade);

        function postFade () {
            toggleChartVisibility('none');
        }
    }

    function fadeOverlay () {
        var state = getState(),
            targetElement = state.targetElement,
            oldTimeout = state.heartBeatWatcher;

        targetElement.css('display') === 'table' || toggleChartVisibility('table');

        clearTimeout(state.heartBeatWatcher);

        state.heartBeatWatcher = setTimeout(hideOverlay, state.fadeOutTime * 1000);

        console.log('Old: ' + oldTimeout + ' | New: ' + state.heartBeatWatcher);
    }

    function startListener () {
        $(document).on('heartbeat.fade', fadeOverlay);
        return state;
    }

    function stopListener () {
        $(document).off('heartbeat.fade');
        return state;
    }

    function getState () {
        return state;
    }

    function setState(property, value) {
        state[property] = value;
        return state;
    }

    startListener();

    return {
        startListener: startListener,
        stopListener: stopListener,
        getState: getState,
        setState: setState
    }

});