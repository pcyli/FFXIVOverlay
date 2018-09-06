define(['./config', 'jquery'], function (config, $) {
    var topScore;             //dpsBarEffect.topdeeps

    function scoreBarEffect(cell, combatant, index, type) {
        var tank = config.tank.classes,
            dps = config.dps.classes,
            heal = config.heal.classes,
            topScoreProp = config[type].topScoreProp,
            jobClass, score, tableRow;

        // 色指定
        var job = combatant["Job"];

        if (dps.indexOf(job) > -1) {
            jobClass = config.dps;
        } else if (tank.indexOf(job) > -1) {
            jobClass = config.tank;
        } else if (heal.indexOf(job) > -1) {
            jobClass = config.heal;
        } else {
            jobClass = 'base';
        }

        if (index == 0 || typeof topScore == 'undefined') {
            topScore = combatant[topScoreProp];
        }
        score = combatant[topScoreProp];

        tableRow = cell.parentNode;
        tableRow.style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.95," + jobClass.color + "), to(rgba(24,24,24,0.0)))";
        tableRow.style.backgroundSize = (parseInt(score) * 100 / parseInt(topScore)) + "% 100%";
        tableRow.style.backgroundAttachment = "fixed";
        tableRow.style.backgroundRepeat = "no-repeat";
    }

    function redTextEffect(cell) {
        var num = parseInt(cell.innerText);

        if (num > 0) {
            $(cell).addClass("textred");
        }
    }

    function myCharacterEffect(cell, combatant, index) {
        var myname = "YOU";

        if (myname == combatant["name"]) {
            $(cell).parents("tr").addClass("mc");
        }
    }

    return {
        scoreBarEffect: scoreBarEffect,
        redTextEffect: redTextEffect,
        myCharacterEffect: myCharacterEffect
    };
});