import '../../css/FadeController.css';

export default function FadeController (props) {
    let heartBeatWatcher = 0;
    const { setTableHidden } = props;
    const FADE_OUT_TIME = 25;

    const startListener = () => {
        fadeOverlay();
        document.addEventListener('heartbeat', fadeOverlay);
    }

    const stopListener = () => {
        document.removeEventListener('heartbeat', fadeOverlay);
    }

    function fadeOverlay () {
        setTableHidden(false);

        clearTimeout(heartBeatWatcher);

        heartBeatWatcher = setTimeout(() => {setTableHidden(true)}, FADE_OUT_TIME * 1000);
    }

    return {
        start: startListener,
        stop: stopListener
    }
}