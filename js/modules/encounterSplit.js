define(['jquery'], function ($) {
    return false;
    if (typeof OverlayPluginApi === "undefined" ||
        typeof OverlayPluginApi.endEncounter === "undefined") {
        return false;
    }

    var state = {
        encounterFactor : 1,
        encounterTime: 6,
        encounterWatcher : null,
        longEncounters : [

        ]
    };

    function encounterSplit (encounterData, state) {
        state.encounterWatcher && clearTimeout(state.encounterWatcher);

        if (
            (typeof encounterData !== "undefined" && encounterData.CurrentZoneName.indexOf('Savage') > 0) ||
            state.longEncounters.indexOf(encounterData.title) > 0
        ) {
            state.encounterFactor = 10;
        } else {
            state.encounterFactor = 1;
        }

        state.encounterWatcher = setTimeout(function () {
            OverlayPluginApi.endEncounter();
            console.log('endEncounter:' + JSON.stringify(state));
            state.encounterWatcher = null;
        }, state.encounterTime * 1000 * state.encounterFactor);
    }

    function startListener () {
        $(document).on('heartbeat.encounterSplit', function (event) {
            encounterSplit(event.Encounter, state);
        });
        return state;
    }

    function stopListener () {
        $(document).off('heartbeat.encounterSplit');
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