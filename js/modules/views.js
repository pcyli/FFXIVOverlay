define(['./effects'], function(effects) {

    return {
        dps: {
            headerConfig:
                [
                    {text: "Job", width: "2em", align: "center"},
                    {text: "Name", width: "9em", align: "center"},
                    {text: "DPS", width: "4em", align: "center"},
                    {text: "DMG", width: "3.3em", align: "right"},
                    {text: "", width: "3em", align: "left"},
                    {text: "Crit", width: "2.5em", align: "center"},
                    {text: "DHit", width: "2.5em", align: "center"},
                    {text: "Miss", width: "2.5em", align: "center"},
                    {text: "Best Hit", width: "7.5em", align: "center"}
                ],
            charConfig:
                [
                    {
                        html: "<img src='./img/colorbg/{JobOrName}.png' onerror='$(this).attr(\"src\", \"./img/error.png\");' style='width=60%;height:60%;' />",
                        align: "center",
                        effect: effects.scoreBarEffect
                    },
                    {text: "{name}", width: "", align: "center", effect: effects.myCharacterEffect},
                    {text: "{encdps}", width: "", align: "center"},
                    {text: "{damage}", width: "", align: "right"},
                    {text: "({damage%})", width: "", align: "left"},
                    {text: "{crithit%}", width: "", align: "center"},
                    {text: "{DirectHitPct}", width: "", align: "center"},
                    {text: "{misses}", width: "", align: "center", effect: effects.redTextEffect},
                    {text: "{maxhit}", width: "", align: "center"}
                ]
        },
        tank: {
            headerConfig:
                [
                    {text: "Job", width: "2em", align: "center"},
                    {text: "Name", width: "9em", align: "center"},
                    {text: "DmgTkn", width: "4em", align: "center"},
                    {text: "BlockPct", width: "3.3em", align: "center"},
                    {text: "ParryPct", width: "2.5em", align: "center"},
                    {text: "Deaths", width: "2.5em", align: "center"},
                    {text: "Best Hit", width: "7.5em", align: "center"}
                ],
            charConfig:
                [
                    {
                        html: "<img src='./img/colorbg/{JobOrName}.png' onerror='$(this).attr(\"src\", \"./img/error.png\");' style='width=60%;height:60%;' />",
                        align: "center",
                        effect: effects.scoreBarEffect
                    },
                    {text: "{name}", width: "", align: "center", effect: effects.myCharacterEffect},
                    {text: "{damagetaken}", width: "", align: "center"},
                    {text: "{BlockPct}", width: "", align: "center"},
                    {text: "{ParryPct}", width: "", align: "center"},
                    {text: "{deaths}", width: "", align: "center", effect: effects.redTextEffect},
                    {text: "{maxhit}", width: "", align: "center"}
                ]
        },
        heal: {
            headerConfig:
                [
                    {text: "Job", width: "2em", align: "center"},
                    {text: "Name", width: "9em", align: "center"},
                    {text: "HPS", width: "4em", align: "center"},
                    {text: "Healed", width: "3.3em", align: "right"},
                    {text: "", width: "3em", align: "left"},
                    {text: "Crit", width: "2.5em", align: "center"},
                    {text: "Best Heal", width: "7.5em", align: "center"},
                    {text: "Best Shield", width: "7.5em", align: "center"}
                ],
            charConfig:
                [
                    {
                        html: "<img src='./img/colorbg/{JobOrName}.png' onerror='$(this).attr(\"src\", \"./img/error.png\");' style='width=60%;height:60%;' />",
                        align: "center",
                        effect: effects.scoreBarEffect
                    },
                    {text: "{name}", width: "", align: "center", effect: effects.myCharacterEffect},
                    {text: "{enchps}", width: "", align: "center"},
                    {text: "{healed}", width: "", align: "right"},
                    {text: "({healed%})", width: "", align: "left"},
                    {text: "{critheal%}", width: "", align: "center"},
                    {text: "{maxheal}", width: "", align: "center",},
                    {text: "{maxhealward}", width: "", align: "center"}
                ]
        }
    };
});