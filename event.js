export default class EventListener {
    constructor () {
        this._eventMap = {};
        this._EVENT_TYPE = {
            regular: 1,
            once: 2,
            buffer: 3
        };
    }

    on (eventName, callback, listenerID, listenerType, triggerAfterTimes) {
        if (arguments.length === 3 && typeof listenerID === 'number') {
            listenerType = listenerID;
            listenerID = undefined;
        } else if (arguments.length === 4) {
            triggerAfterTimes = listenerType;
            listenerType = listenerID;
            triggerAfterTimes = undefined;
        }

        if (this._eventMap[eventName] === undefined) {
            this._eventMap[eventName] = [];
        }

        let eventItem = {
            callback,
            listenerID,
            listenerType,
            triggerAfterTimes,
            currentTriggerTime: 0
        };

        this._eventMap[eventName].push(eventItem);
    }

    off (eventName, callback, listenerID) {
        if (typeof callback === 'string') {
            listenerID = callback;
            callback = undefined;
        }

        let events = this._eventMap[eventName];

        if (listenerID !== undefined) {
            this._eventMap[eventName] = events.filter(eventItem => eventItem.listenerID !== listenerID);
        } else if (callback !== undefined) {
            this._eventMap[eventName] = events.filter(eventItem => eventItem.callback !== callback);
        } else {
            this._eventMap[eventName] = [];
        }
    }

    once (eventName, callback) {
        this.on(eventName, callback, this._EVENT_TYPE.once);
    }

    buffer (eventName, callback, triggerAfterTimes) {
        this.on(eventName, callback, this._EVENT_TYPE.buffer, triggerAfterTimes);
    }

    fire (eventName, args) {
        if (this._eventMap[eventName] === undefined) {
            return;
        }

        this._addBufferTimes(this._eventMap[eventName]);
        let listenerListCopy = this._eventMap[eventName].slice();
        this._eventMap[eventName] = this._filterEvents(this._eventMap[eventName]);

        listenerListCopy.forEach(eventItem => {
            if (eventItem.listenerType === this._EVENT_TYPE.buffer) {
                if (eventItem.currentTriggerTime === eventItem.triggerAfterTimes) {
                    eventItem.callback(args);
                }
                return;
            }

            eventItem.callback(args);
        });
    }

    _addBufferTimes (events) {
        events.forEach(eventItem => {
            if (eventItem.listenerType === this._EVENT_TYPE.buffer) {
                eventItem.currentTriggerTime++;
            }
        });
    }

    _filterEvents (events) {
        return events.filter(eventItem => {
            if (eventItem.listenerType === this._EVENT_TYPE.once) {
                return false;
            } else if (eventItem.listenerType === this._EVENT_TYPE.buffer) {
                if (eventItem.currentTriggerTime === eventItem.triggerAfterTimes) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });
    }
}
