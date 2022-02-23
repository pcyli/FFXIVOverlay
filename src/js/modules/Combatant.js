import Image from "./Image";
import '../../css/Combatant.css';

export default function Combatant (props) {
    const { config, charConfig, player, columnSizes, roleDictionary } = props;
    const { Job: job } = player;

    function parseActFormat(str, dictionary) {
        let result = "";

        let currentIndex = 0;
        do {
            let openBraceIndex = str.indexOf('{', currentIndex);
            if (openBraceIndex < 0) {
                result += str.slice(currentIndex);
                break;
            }
            else {
                result += str.slice(currentIndex, openBraceIndex);
                let closeBraceIndex = str.indexOf('}', openBraceIndex);
                if (closeBraceIndex < 0) {
                    // parse error!
                    console.log("parseActFormat: Parse error: missing close-brace for " + openBraceIndex.toString() + ".");
                    return "ERROR";
                }
                else {
                    let tag = str.slice(openBraceIndex + 1, closeBraceIndex);
                    if (typeof dictionary[tag] !== 'undefined') {
                        result += dictionary[tag];
                    } else if (tag === 'JobOrName') {
                        result += dictionary.Job || dictionary.name;
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

    const combatantDetails = charConfig.map(
        (fields, index) => {
            const { text, img } = fields;

            return  <div
                key = {`combatant${text}`}
                className={ `size${columnSizes[index]}`}
            >
                { img ?
                    <Image src={parseActFormat(img, player)} job={job}/> :
                    typeof text === 'function' ?
                        text(player) :
                        parseActFormat(text, player)
                }
            </div>
        }
    );

    return (
        <div className={`combatantRow${player.name === 'YOU' ? ' mc' : ''}`}
             style={{'backgroundColor': config[roleDictionary[job]]?.color || config.base.color}}
        >
            { combatantDetails }
        </div>
    )

}