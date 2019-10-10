define(['jquery'], function ($) {

    return false;

    if (typeof OverlayPluginApi === "undefined" ||
        typeof OverlayPluginApi.endEncounter === "undefined") {
        return false;
    }

    this.state = {
        encounterFactor : 1,
        encounterTime: 6,
        encounterWatcher : 0,
        longEncounters : [

        ]
    };

    var that = this;

    function encounterSplit (encounterData, state) {

        clearTimeout(state.encounterWatcher);

        if (
            (typeof encounterData !== "undefined" && encounterData.Encounter.CurrentZoneName.indexOf('Savage') > 0) ||
            state.longEncounters.indexOf(encounterData.Encounter.title) > 0
        ) {
            state.encounterFactor = 10;
        }

        state.encounterWatcher = setTimeout(function () {
            OverlayPluginApi.endEncounter();
        }, state.encounterTime * 1000 * state.encounterFactor);
    }

    $(document).on('heartbeat', function (event) {
        encounterSplit(event.data, that.state);
    });

});