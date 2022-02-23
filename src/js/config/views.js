import effects from './effects';

let views =
    {
        dps:  {
            headerConfig:
                [
                    {text: "Job", act_variable: 'Job', size: 1},
                    {text: "Name", act_variable: 'name', size: 3},
                    {text: "DPS", act_variable: 'encdps', size: 2},
                    {text: "DMG", act_variable: 'damage', size: 1},
                    {text: "", act_variable: '', size: 0},
                    {text: "Crit", act_variable: 'crithit%', size: 1},
                    {text: "DHit", act_variable: 'DirectHitPct', size: 1},
                    {text: "Deaths", act_variable: 'deaths', size: 1},
                    {text: "Best Hit", act_variable: 'maxhit', size: 4}
                ],
            charConfig:
                [
                    {
                        img:   'img/colorbg/{JobOrName}.png',
                        effect: effects.scoreBarEffect
                    },
                    {text: "{name}", effect: effects.myCharacterEffect},
                    {text: "{encdps}"},
                    {text: "{damage}"},
                    {text: "({damage%})"},
                    {text: "{crithit%}"},
                    {text: "{DirectHitPct}"},
                    {text: '{deaths}'},
                    //{text: "{misses}", width: "", align: "center", effect: effects.redTextEffect},
                    {text: "{maxhit}"}
                ]
        },
        tank: {
            headerConfig:
                [
                    {text: "Job", act_variable: 'JobOrName', size: 1},
                    {text: "Name", act_variable: 'name', size: 4},
                    {text: "DmgTkn", act_variable: 'damagetaken', size: 2},
                    {text: "Block%", act_variable: 'BlockPct', size: 1},
                    {text: "Parry%", act_variable: 'ParryPct', size: 1},
                    {text: "Deaths", act_variable: 'deaths', size: 1},
                    {text: "Best Hit", act_variable: 'maxhit', size: 5}
                ],
            charConfig:
                [
                    {
                        img:   'img/colorbg/{JobOrName}.png',
                        align:  "center",
                        effect: effects.scoreBarEffect
                    },
                    {text: "{name}", effect: effects.myCharacterEffect},
                    {text: "{damagetaken}"},
                    {text: "{BlockPct}"},
                    {text: "{ParryPct}"},
                    {text: "{deaths}", effect: effects.redTextEffect},
                    {text: "{maxhit}"}
                ]
        },
        heal: {
            headerConfig:
                [
                    {text: "Job", act_variable: 'JobOrName', size: 1},
                    {text: "Name", act_variable: 'name', size: 3},
                    {text: "EHPS", act_variable: 'enchps', size: 2},
                    {text: "Effective Heal", act_variable: 'healed', size: 1},
                    {text: "", act_variable: 'healed%', size: 0},
                    {text: "OverHeal (%)", act_variable: 'OverHealPct', size: 2},
                    {text: "Crit", act_variable: 'critheal%', size: 1},
                    {text: "Best Heal", act_variable: 'maxheal', size: 4}
                ],
            charConfig:
                [
                    {
                        img:   'img/colorbg/{JobOrName}.png',
                        effect: effects.scoreBarEffect
                    },
                    {text: "{name}", effect: effects.myCharacterEffect},
                    {
                        text:  combatant => Math.floor(combatant.enchps * (1 - parseInt(combatant.OverHealPct) / 100) * 10) / 10
                    },
                    {
                        text:  combatant => Math.floor(combatant.healed * (1 - parseInt(combatant.OverHealPct) / 100))
                    },
                    {
                        text:  combatant => "(" + Math.floor(parseInt(combatant["healed%"]) * (1 - parseInt(combatant.OverHealPct) / 100)) + "%)"
                    },
                    {text: "{OverHealPct}", effect: effects.redTextEffect},
                    {text: "{critheal%}"},
                    {text: "{maxheal}"}
                ]
        }
    };

export default views;