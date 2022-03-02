export default function WebSocketController() {
    let wsUrl = /[?&]HOST_PORT=([^&]+)/.exec(window.location.href);
    let ws = null;
    let queue = [];
    let rseqCounter = 0;
    let responsePromises = {};
    let subscribers = {};
    let sendMessage = null;
    let eventsStarted = false;

    if (wsUrl) {
        sendMessage = (obj) => {
            if (queue)
                queue.push(obj);
            else
                ws.send(JSON.stringify(obj));
        };

        function connectWs() {
            ws = new WebSocket(wsUrl[1]);
            debugger;
            ws.addEventListener('error', (e) => {
                console.error(e);
            });

            ws.addEventListener('open', () => {
                console.log('Connected via WebSocket.');

                let q = queue;
                queue = null;

                for (let msg of q)
                    sendMessage(msg);
            });

            ws.addEventListener('message', (msg) => {
                try {
                    msg = JSON.parse(msg.data);
                } catch (e) {
                    console.error('Invalid message received: ', msg);
                    return;
                }

                if (msg.rseq !== undefined && responsePromises[msg.rseq]) {
                    responsePromises[msg.rseq](msg);
                    delete responsePromises[msg.rseq];
                } else {
                    processEvent(msg);
                }
            });

            ws.addEventListener('close', () => {
                queue = [];

                console.log('Trying to reconnect...');
                // Don't spam the server with retries.
                setTimeout(() => {
                    connectWs();
                }, 300);
            });
        }

        connectWs();
    } else {
        sendMessage = (obj, cb) => {
            if (queue) {
                queue.push([obj, cb]);
            } else {
                window.OverlayPluginApi.callHandler(JSON.stringify(obj), cb);
            }
        };

        function waitForApi() {
            if (!window.OverlayPluginApi || !window.OverlayPluginApi.ready) {
                setTimeout(waitForApi, 300);
                return;
            }

            console.log('Connected via OverlayPluginApi.');

            let q = queue;
            queue = null;

            window.__OverlayCallback = processEvent;

            for (let [msg, resolve] of q)
                sendMessage(msg, resolve);
        }

        waitForApi();
    }

    function processEvent(msg) {
        if (subscribers[msg.type]) {
            for (let sub of subscribers[msg.type])
                sub(msg);
        }
    }

    const dispatchOverlayEvent = processEvent;

    const addOverlayListener = (event, cb) => {
        if (eventsStarted && subscribers[event]) {
            console.warn(`A new listener for ${event} has been registered after event transmission has already begun.
Some events might have been missed and no cached values will be transmitted.
Please register your listeners before calling startOverlayEvents().`);
        }

        if (!subscribers[event]) {
            subscribers[event] = [];
        }

        subscribers[event].push(cb);
    };

    const removeOverlayListener = (event, cb) => {
        if (subscribers[event]) {
            let list = subscribers[event];
            let pos = list.indexOf(cb);

            if (pos > -1) list.splice(pos, 1);
        }
    };

    const callOverlayHandler = (msg) => {
        let p;

        if (ws) {
            msg.rseq = rseqCounter++;
            p = new Promise((resolve) => {
                responsePromises[msg.rseq] = resolve;
            });

            sendMessage(msg);
        } else {
            p = new Promise((resolve) => {
                sendMessage(msg, (data) => {
                    resolve(data == null ? null : JSON.parse(data));
                });
            });
        }

        return p;
    };

    const startOverlayEvents = () => {
        eventsStarted = false;

        sendMessage({
            call: 'subscribe',
            events: Object.keys(subscribers),
        });
    };

    return {
        dispatchOverlayEvent : dispatchOverlayEvent,
        addOverlayListener : addOverlayListener,
        removeOverlayListener : removeOverlayListener,
        callOverlayHandler : callOverlayHandler,
        startOverlayEvents : startOverlayEvents
    }
}