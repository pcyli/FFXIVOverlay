import '../../css/RoleToggle.css';

export default function RoleToggle (props) {
    const {activeView, setActiveView} = props;
    const jobs = ['dps', 'tank', 'heal'];
    const activeClass = (job) => activeView === job ? 'active' : '';

    const buttons = jobs.map((job) =>
        <span
            onClick={() => setActiveView(job)}
            className={activeClass(job)}
            key={`RoleToggle${job}`}
            >
            {job.toUpperCase()}
        </span>
    )

    return (
        <div id="toggle" key={'toggle'}>
            { buttons }
        </div>
    )
}