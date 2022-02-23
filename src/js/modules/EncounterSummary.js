import '../../css/EncounterSummary.css';

export default function EncounterSummary (props) {
    const {encounter = {}} = props;
    const {duration, dps, maxhit} = encounter;

    return (
        <div id="encounter">
            {
                encounter.duration ?
                    (
                        <>
                            <span className='title'>Time: </span>
                            <span className='content'>{duration}</span>
                            <span className='title'>Total DPS: </span>
                            <span className='content'>{dps}</span>
                            <span className='title'>Best Hit: </span>
                            <span className='content'>{maxhit}</span>
                        </>
                    ) :
                    'No data to show.'
            }
        </div>

    )
}