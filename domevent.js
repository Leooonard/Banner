/*
    draging提供距离开始drag的x，y差值，以及距离上一次触发draging的x，y差值。还应该有开始drag的x，y值。
*/

import Event from './event.js';

export const EVENT_TYPE = {
    click: 'click',
    draging: 'draging',
    dragEnd: 'dragEnd'
};

export default class DomEvent extends Event {
    constructor(target) {
        super();

        this._target = target;

        this._startPosition = {
            x: undefined,
            y: undefined
        };

        this._lastMovePosition = {
            x: undefined,
            y: undefined
        };

        this._clickEvent = false;

        this._onStart();
        this._onMove();
        this._onEnd();
    }

    _onStart() {
        this._target.addEventListener('touchstart', e => {
            let startPosition = this._getPosition(e);
            this._startPosition = startPosition;
            this._lastMovePosition = startPosition;
            this._clickEvent = true;

            return false;
        });
    }

    _onMove() {
        this._target.addEventListener('touchmove', e => {
            let movePosition = this._getPosition(e);
            let distanceToStart = this._getDistance(this._startPosition, movePosition);
            let distanceToLastMove = this._getDistance(this._lastMovePosition, movePosition);
            this._lastMovePosition = movePosition;

            if (this._isMoveTooFar(distanceToStart)) {
                this._clickEvent = false;
            }

            this.fire(EVENT_TYPE.draging, {
                sx: this._startPosition.x,
                sy: this._startPosition.y,
                dx: distanceToStart.x,
                dy: distanceToStart.y,
                lx: distanceToLastMove.x,
                ly: distanceToLastMove.y
            });

            return false;
        });
    }

    _onEnd() {
        this._target.addEventListener('touchend', e => {
            if (this._clickEvent) {
                this.fire(EVENT_TYPE.click);
            } else {
                this.fire(EVENT_TYPE.dragEnd, {
                    sx: this._startPosition.x,
                    sy: this._startPosition.y,
                    ex: this._lastMovePosition.x,
                    ey: this._lastMovePosition.y
                });
            }

            this._clickEvent = true;

            return false;
        });
    }

    _getPosition(e) {
        return {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    }

    _getDistance(startPosition, endPosition) {
        return {
            x: startPosition.x - endPosition.x,
            y: startPosition.y - endPosition.y
        };
    }

    _isMoveTooFar(moveDistance) {
        const THRESHOLD = 10;

        if (Math.abs(moveDistance.x) > THRESHOLD || Math.abs(moveDistance.y) > THRESHOLD) {
            return true;
        } else {
            return false;
        }
    }
}
