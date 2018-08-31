define(function () {

    function dpsBarEffect (cell, combatant, index, type) {
        var tank = ["Gla", "Pld", "Mrd", "War", "Drk"];
        var dps = ["Pgl", "Mnk", "Lnc", "Drg", "Arc", "Brd", "Rog", "Nin", "Acn", "Smn", "Thm", "Blm", "Mch", "Sam", "Rdm"];
        var healer = ["Cnj", "Whm", "Sch", "Ast"];

        var topScore;

        switch (type) {
            case 'dps':
                topScore = 'encdps';
                break;
            case 'tank':
                topScore = 'damagetaken';
                break;
            case 'heal':
                topScore = 'enchps';
                break;
        }

        if (index == 0 || typeof dpsBarEffect.topdeeps == 'undefined') {
            dpsBarEffect.topdeeps = combatant[topScore];
        }
        var deeps = combatant[topScore];

        // 色指定
        var job = combatant["Job"];
        if (dps.indexOf(job) > -1) {
            var color = "rgba(200,3,8,0.3)";
        } else if (tank.indexOf(job) > -1) {
            var color = "rgba(41,112,243,0.3)";
        } else if (healer.indexOf(job) > -1) {
            var color = "rgba(107,240,86,0.3)";
        } else {
            var color = "rgba(128,0,255,0.3)";
        }

        var tableRow = cell.parentNode;
        tableRow.style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.95," + color + "), to(rgba(24,24,24,0.0)))";
        tableRow.style.backgroundSize = (parseInt(deeps) * 100 / parseInt(dpsBarEffect.topdeeps)) + "% 100%";
        tableRow.style.backgroundAttachment = "fixed";
        tableRow.style.backgroundRepeat = "no-repeat";
    }

    function redTextEffect (cell) {
        var num = parseInt(cell.innerText)
        if (num > 0) {
            $(cell).addClass("textred");
        }
    }

    function myCharacterEffect (cell, combatant, index) {
        var myname = "YOU";
        if (myname == combatant["name"]) {
            $(cell).parents("tr").addClass("mc");
        }
    }

    return {
        dpsBarEffect : dpsBarEffect,
        redTextEffect : redTextEffect,
        myCharacterEffect : myCharacterEffect
    };
});