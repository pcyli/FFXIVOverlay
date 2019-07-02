requirejs(['jquery', 'modules/views', 'modules/config', 'testing'],
    function ($, views, config, testing) {

//
// プラグイン側から以下のような ActXiv オブジェクトとしてデータが提供される
//
// var ActXiv = {
//	"Encounter": {...},
//	"Combatant": {
//		"PlayerName1": {...},
//		"PlayerName2": {...},
//		...
//	}
// };
//
// データの更新は 1 秒毎。
//
// プラグインから onOverlayDataUpdate イベントが発行されるので、それを受信することもできる
// イベントハンドラの第一引数の detail プロパティ内に上記のオブジェクトが入る
//

//
// 表示設定 (2)
//

    var trackerState = {
        dataStore: {},
        activeView: 'dps',
        bodyDefine: views,
        config: config,
        heartBeatWatcher: 0,
        useHTMLEncounterDefine: true
    };

// エンカウント情報の定義
    var encounterDefine = "Time:<span class='enc'>{duration}</span> &nbsp;&nbsp;&nbsp;Total DPS:<span class='enc'>{dps}</span> &nbsp;&nbsp;&nbsp;Best Hit:<span class='enc'>{maxhit}</span>";

    function graphRendering(table) {
        $("tr:eq(0) > td.graphCell", table)
            .each(function () {
                var max = 0;

                $("tr > td:nth-child(" + ($("tr:eq(0) td", table).index($(this)) + 1) + ")", table)
                    .each(function () {
                        max = (max < parseInt($(this).text().replace(/[^\d]/g, ""))) ?
                            parseInt($(this).text().replace(/[^\d]/g, "")) :
                            max;
                    });

                $("tr > td:nth-child(" + ($("tr:eq(0) td", table)
                    .index($(this)) + 1) + ")", table)
                    .each(function () {
                        p = (max == 0) ?
                            "0%" :
                            (parseInt($(this).text().replace(/[^\d]/g, "")) / max * 100) + "%";

                        $(this).css("background-size", p + " 100%, 100% 100%");
                    });
            });
    }


//
// 以下表示用スクリプト
//

// onOverlayDataUpdate イベントを購読
    document.addEventListener("onOverlayDataUpdate", function (e) {
        update(e.detail);
        encounterHeartbeat();
        trackerState.dataStore = e.detail;
    });
    window.addEventListener("message", function (e) {
        if (e.data.type === "onOverlayDataUpdate") {
            update(e.data.detail);
            encounterHeartbeat();
            trackerState.dataStore = e.data.detail;
        }
    });

    //testing.start();

    function encounterHeartbeat() {
        var targetElement = $('#combatantTable')
        otherElements = $('#toggle, #encounter');

        targetElement.css('display') === 'block' || toggleChartVisibility('block');

        clearTimeout(trackerState.heartBeatWatcher);

        trackerState.heartBeatWatcher = setTimeout(function () {
            targetElement.fadeOut('slow', function () {
                toggleChartVisibility('none');
            });
        }, trackerState.config.fadeOutTime * 1000);

        function toggleChartVisibility(displayType) {
            var opacity;

            if (displayType === 'block') {
                opacity = 1;
            } else {
                opacity = trackerState.config.fadeOutOpacity;
            }

            targetElement.css('display', displayType);
            otherElements.css('opacity', opacity);
        }
    }

    function toggleActiveButton(element) {
        $('.active').removeClass('active');
        $(element).addClass('active');

        encounterHeartbeat();

        trackerState.activeView = $(element).attr('value');
    }

    $('html').on('click', '#toggle *', function () {
        var element = this;

        toggleActiveButton(element);
        updateCombatantListHeader();
        updateCombatantList(trackerState.dataStore);
    });

// 表示要素の更新
    function update(data) {
        updateEncounter(data);
        if (document.getElementById("combatantTableHeader") == null) {
            updateCombatantListHeader();
        }
        updateCombatantList(data);
    }

// エンカウント情報を更新する
    function updateEncounter(data) {
        // 要素取得
        var encounterElem = document.getElementById('encounter');

        // テキスト取得
        var elementText;
        if (typeof encounterDefine === 'function') {
            elementText = encounterDefine(data.Encounter);
            if (typeof elementText !== 'string') {
                console.log("updateEncounter: 'encounterDefine' is declared as function but not returns a value as string.");
                return;
            }
        } else if (typeof encounterDefine === 'string') {
            elementText = parseActFormat(encounterDefine, data.Encounter);
        } else {
            console.log("updateEncounter: Could not update the encounter element due to invalid type.");
            return;
        }

        // テキスト設定
        if (!trackerState.useHTMLEncounterDefine) {
            encounterElem.innerText = parseActFormat(encounterDefine, data.Encounter);
        } else {
            encounterElem.innerHTML = parseActFormat(encounterDefine, data.Encounter);
        }
    }

// ヘッダを更新する
    function updateCombatantListHeader() {
        var table = document.getElementById('combatantTable');
        var tableHeader = document.createElement("thead");
        tableHeader.id = "combatantTableHeader";
        var headerRow = tableHeader.insertRow();
        var headerConfig = trackerState.bodyDefine[trackerState.activeView].headerConfig;

        for (var i = 0; i < headerConfig.length; i++) {
            var cell = document.createElement("th");
            // テキスト設定
            if (typeof headerConfig[i].text !== 'undefined') {
                cell.innerText = headerConfig[i].text;
            } else if (typeof headerConfig[i].html !== 'undefined') {
                cell.innerHTML = headerConfig[i].html;
            }
            // 幅設定
            cell.style.width = headerConfig[i].width;
            cell.style.maxWidth = headerConfig[i].width;
            // 横結合数設定
            if (typeof headerConfig[i].span !== 'undefined') {
                cell.colSpan = headerConfig[i].span;
            }
            // 行揃え設定
            if (typeof headerConfig[i].align !== 'undefined') {
                cell.style["textAlign"] = headerConfig[i].align;
            }
            headerRow.appendChild(cell);
        }

        table.tHead = tableHeader;
    }

    function sortCombatants(data, orderBy) {
        var output = {},
            sortArray = [],
            keySort,
            combatantName, combatant, value;

        for (combatantName in data) {
            combatant = data[combatantName];
            sortArray[parseInt(combatant[orderBy]) * 1] = combatantName;
        }

        keySort = Object.keys(sortArray)
            .sort(function (a, b) {
                return parseInt(b) - parseInt(a);
            });

        for (value in keySort) {
            combatantName = sortArray[keySort[value]];
            output[combatantName] = data[combatantName];
        }

//update data.sortCombatants
        return output;
    }

// プレイヤーリストを更新する
    function updateCombatantList(data) {
        // 要素取得＆作成
        var table = document.getElementById('combatantTable'),
            oldTableBody = table.tBodies.namedItem('combatantTableBody'),
            newTableBody = document.createElement("tbody"),
            sortedCombatants = sortCombatants(data.Combatant, trackerState.config[trackerState.activeView].topScoreProp);

        newTableBody.id = "combatantTableBody";


        // tbody の内容を作成
        var combatantIndex = 0;
        for (var combatantName in sortedCombatants) {
            var combatant = sortedCombatants[combatantName];
            //ペットのジョブ画像読み込み用の設定
            if (combatantName.search("エオス") != -1) {
                var combatantName = 'Eos';
            }
            if (combatantName.search("ガルーダ") != -1) {
                var combatantName = 'Garuda';
            }
            if (combatantName.search("タイタン") != -1) {
                var combatantName = 'Titan';
            }
            if (combatantName.search("イフリート") != -1) {
                var combatantName = 'Ifrit';
            }
            if (combatantName.search("セレネ") != -1) {
                var combatantName = 'Selene';
            }
            if (combatantName.search("エメラルド") != -1) {
                var combatantName = 'emerald';
            }
            if (combatantName.search("トパーズ") != -1) {
                var combatantName = 'topaz';
            }
            if (combatantName.search(/\)$/) != -1) {
                var combatantName = 'Chocobo';
            }
            combatant.JobOrName = combatant.Job || combatantName;
            var tableRow = newTableBody.insertRow(newTableBody.rows.length);

            var bodyDefinition = trackerState.bodyDefine[trackerState.activeView].charConfig;

            for (var i = 0; i < bodyDefinition.length; i++) {
                var cell = tableRow.insertCell(i);
                // テキスト設定
                if (typeof bodyDefinition[i].text !== 'undefined') {
                    var cellText;
                    if (typeof bodyDefinition[i].text === 'function') {
                        cellText = bodyDefinition[i].text(combatant, combatantIndex);
                    } else {
                        cellText = parseActFormat(bodyDefinition[i].text, combatant);
                    }
                    cell.innerText = cellText;
                } else if (typeof bodyDefinition[i].html !== 'undefined') {
                    var cellHTML;
                    if (typeof bodyDefinition[i].html === 'function') {
                        cellHTML = bodyDefinition[i].html(combatant, combatantIndex);
                    } else {
                        cellHTML = parseActFormat(bodyDefinition[i].html, combatant);
                    }
                    cell.innerHTML = cellHTML;
                }
                // 幅設定
                cell.style.width = bodyDefinition[i].width;
                cell.style.maxWidth = bodyDefinition[i].width;
                // 行構え設定
                if (typeof(bodyDefinition[i].align) !== 'undefined') {
                    cell.style.textAlign = bodyDefinition[i].align;
                }

                if (trackerState.config.petShading.indexOf(combatantName) > 0) {
                    $(cell).addClass('petShading');
                }

                // エフェクト実行
                if (typeof bodyDefinition[i].effect === 'function') {
                    bodyDefinition[i].effect(cell, combatant, combatantIndex, trackerState.activeView);
                }
            }
            combatantIndex++;
        }

        graphRendering(newTableBody);

        // tbody が既に存在していたら置換、そうでないならテーブルに追加
        if (oldTableBody != void(0)) {
            table.replaceChild(newTableBody, oldTableBody);
        }
        else {
            table.appendChild(newTableBody);
        }
    }

// Miniparse フォーマット文字列を解析し、表示文字列を取得する
    function parseActFormat(str, dictionary) {
        var result = "";

        var currentIndex = 0;
        do {
            var openBraceIndex = str.indexOf('{', currentIndex);
            if (openBraceIndex < 0) {
                result += str.slice(currentIndex);
                break;
            }
            else {
                result += str.slice(currentIndex, openBraceIndex);
                var closeBraceIndex = str.indexOf('}', openBraceIndex);
                if (closeBraceIndex < 0) {
                    // parse error!
                    console.log("parseActFormat: Parse error: missing close-brace for " + openBraceIndex.toString() + ".");
                    return "ERROR";
                }
                else {
                    var tag = str.slice(openBraceIndex + 1, closeBraceIndex);
                    if (typeof dictionary[tag] !== 'undefined') {
                        result += dictionary[tag];
                    } else {
                        console.log("parseActFormat: Unknown tag: " + tag);
                        result += "ERROR";
                    }
                    currentIndex = closeBraceIndex + 1;
                }
            }
        } while (currentIndex < str.length);

        return result;
    }
});