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
                    //{text: "Miss", width: "2.5em", align: "center"},
                    {text: "Best Hit", width: "10em", align: "center"}
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
                    //{text: "{misses}", width: "", align: "center", effect: effects.redTextEffect},
                    {text: "{maxhit}", width: "", align: "center"}
                ]
        },
        tank: {
            headerConfig:
                [
                    {text: "Job", width: "2em", align: "center"},
                    {text: "Name", width: "9em", align: "center"},
                    {text: "DmgTkn", width: "4em", align: "center"},
                    {text: "Block%", width: "3.5em", align: "center"},
                    {text: "Parry%", width: "3.5em", align: "center"},
                    {text: "Deaths", width: "2.5em", align: "center"},
                    {text: "Best Hit", width: "8em", align: "center"}
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
                    {text: "EHPS", width: "4em", align: "center"},
                    {text: "Effective Heal", width: "4em", align: "right"},
                    {text: "", width: "2.5em", align: "left"},
                    {text: "OverHeal (%)", width: "5.5em", align: "center"},
                    {text: "Crit", width: "2.5em", align: "center"},
                    {text: "Best Heal", width: "8.5em", align: "center"}
                ],
            charConfig:
                [
                    {
                        html: "<img src='./img/colorbg/{JobOrName}.png' onerror='$(this).attr(\"src\", \"./img/error.png\");' style='width=60%;height:60%;' />",
                        align: "center",
                        effect: effects.scoreBarEffect
                    },
                    {text: "{name}", width: "", align: "center", effect: effects.myCharacterEffect},
                    {
                        text: combatant => Math.floor(combatant.enchps * (1-parseInt(combatant.OverHealPct)/100)*10)/10,
                        width: "",
                        align: "center"
                    },
                    {
                        text: combatant => Math.floor(combatant.healed * (1-parseInt(combatant.OverHealPct)/100)),
                        width: "",
                        align: "right"
                    },
                    {
                        text: combatant => "(" + Math.floor(parseInt(combatant["healed%"]) * (1-parseInt(combatant.OverHealPct)/100)) + "%)",
                        width: "",
                        align: "left"
                    },
                    {text: "{OverHealPct}", width: "", align: "center", effect: effects.redTextEffect},
                    {text: "{critheal%}", width: "", align: "center"},
                    {text: "{maxheal}", width: "", align: "center"}
                ]
        }
    };
});