import './css/App.css';
import { useState, useEffect } from 'react';
import DataController from "./js/lib/DataController";
import CombatantTable from "./js/modules/CombatantTable";
import EncounterSummary from "./js/modules/EncounterSummary";
import RoleToggle from "./js/modules/RoleToggle";
import FadeController from "./js/lib/FadeController";
import config from "./js/config/config";

function App() {
    const [activeView, setActiveView] = useState('dps');
    const [sortProp, setSortProp] = useState(config[activeView].topScoreProp);
    const [isTableHidden, setTableHidden] = useState(false);
    const [encounterData, setEncounterData] = useState({});

    useEffect(() => {
        setSortProp(config[activeView].topScoreProp);
    }, [activeView]);

    useEffect( () => {
        const fadeCtrl = new FadeController({
                'isTableHidden': isTableHidden,
                'setTableHidden': setTableHidden
        });

        fadeCtrl.start();

        const dataCtrl = new DataController({setEncounterData: setEncounterData});
        dataCtrl.init();
    }, []);

    return (
        <div className={`App ${isTableHidden ? 'hidden' : 'active'}`}>
            <CombatantTable
                players = {encounterData.Combatant}
                activeView = {activeView}
                sortProp = {sortProp}
                setSortProp = {setSortProp}
            />

            <EncounterSummary
                encounter = {encounterData.Encounter}
            />

            <RoleToggle
                activeView = {activeView}
                setActiveView = {setActiveView}
            />
        </div>
    );
}

export default App;
