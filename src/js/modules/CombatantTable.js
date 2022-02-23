import {useState} from 'react';
import Combatant from "./Combatant";
import '../../css/CombatantTable.css'
import config from "../config/config";
import views from "../config/views";

export default function CombatantTable (props) {
    const { sortProp, activeView, setSortProp, players = {} } = props;
    const { headerConfig, charConfig } = views[activeView];

    const [sortDirection, setSortDirection] = useState('desc');

    const roleDictionary = (() => {
        const dict = {};

        ['dps', 'tank', 'heal'].forEach((role) => {
            config[role].classes.forEach((job) => {
                dict[job] = role;
            })
        });

        return dict;
    })()

    const columnSizes = [];
    const headers = headerConfig.map(
        (header) => {
            const { text, act_variable, size } = header;
            columnSizes.push(size);

            return  <div
                        key = {`combatantHeader${text}`}
                        className = {`size${size}`}
                        onClick = {
                            () => {
                                if (sortProp === act_variable) {
                                    setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
                                } else {
                                    setSortDirection('desc');
                                    setSortProp(act_variable);
                                }
                            }
                        }
                    >
                        {text}
                    </div>
        }
    );

    const body =
        Object.keys(players)
            .sort((previous, current) => {
                if (parseFloat(players[previous][sortProp]) > parseFloat(players[current][sortProp])) {
                    return sortDirection === 'desc' ? -1 : 1;
                } else {
                    return sortDirection === 'desc' ? 1 : -1;
                }
            })
            .map((player) => {
                if(players.hasOwnProperty(player)) {
                    return <Combatant
                                config={config}
                                charConfig={charConfig}
                                player={players[player]}
                                columnSizes = {columnSizes}
                                roleDictionary = {roleDictionary}
                                key = {`Combatant${player}`}
                            />;
                }
                return null;
            });

    return (
        <div key="combatantTable" id="combatantTable">
            <div className={'header'}>{ headers }</div>
            { body }
        </div>
    );
}