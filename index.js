import DomEvent, {EVENT_TYPE} from './domevent.js';
import * as Util from './util.js';
import {getImageContainerStyle, getImageItemStyle, getImageStyle} from './style.js';
import Pagination from './pagination.js';

let IMAGE_WIDTH = undefined;

class Banner {
    constructor (imageList, options) {
        if (!this._checkParams(imageList, options)) {
            throw 'error params';
        }
        IMAGE_WIDTH = options.imageWidth;

        this._imageList = this._paddingImageList(imageList);
        this._bannerElement = this.getElement();
        this._options = options;
        this._domEvent = new DomEvent(this._bannerElement);

        this._currentSlideIndex = 1;
        this._currentTranslateX = IMAGE_WIDTH * this._currentSlideIndex * -1;

        this._show(this._currentSlideIndex);

        this._domEvent.on(EVENT_TYPE.click, () => {}); // 点击事件先不管。
        this._domEvent.on(EVENT_TYPE.draging, this._onBannerDraging.bind(this));
        this._domEvent.on(EVENT_TYPE.dragEnd, this._onBannerDragEnd.bind(this));

        this._controls = {};
        this._addControls(this._imageList.length - 2, this._currentSlideIndex - 1);
    }

    _checkParams (imageList, options) {
        if (!Array.isArray(imageList) || imageList.length === 0) {
            return false;
        }

        return true;
    }

    _paddingImageList (imageList) {
        imageList.push(imageList[0]);
        imageList.unshift(imageList[imageList.length - 1]);

        return imageList;
    }

    _onBannerDraging (e) {
        let {lx: lastMoveX} = e;

        this._slide(lastMoveX);
    }

    _onBannerDragEnd (e) {
        let {sx: startX, ex: endX} = e;

        if (this._needChangeSlide(endX - startX)) {
            this._currentSlideIndex = this._decideNextSlideIndex(this._currentSlideIndex, endX - startX);
            this._show(this._currentSlideIndex, () => {
                if (this._currentSlideIndex === 0) {
                    this._currentSlideIndex = this._imageList.length - 2;
                    this._jump(this._imageList.length - 2);
                } else if (this._currentSlideIndex === this._imageList.length - 1) {
                    this._currentSlideIndex = 1;
                    this._jump(1);
                }

                this._controls['pagination'].updateActiveIndex(this._currentSlideIndex - 1);
            });
        } else {
            this._show(this._currentSlideIndex);
        }
    }

    _needChangeSlide (moveX) {
        if (Math.abs(moveX) < IMAGE_WIDTH / 2) {
            return false;
        } else {
            return true;
        }
    }

    _decideNextSlideIndex (currentSlideIndex, moveX) {
        if (moveX > 0) {
            return currentSlideIndex - 1;
        } else {
            return currentSlideIndex + 1;
        }
    }

    _jump (index) {
        if (index < 0 || index > this._imageList.length - 1) {
            return;
        }

        this._slideToWithoutAnimation(IMAGE_WIDTH * index * -1);
    }

    _show (index, showFinish) {
        if (index < 0 || index > this._imageList.length - 1) {
            return;
        }

        this._slideTo(IMAGE_WIDTH * index * -1, showFinish);
    }

    _slideTo (translateX, slideFinish) {
        this._currentTranslateX = translateX;

        this._addTransition(this._bannerElement.querySelector('#container'), 'all', 0.5);
        setTimeout(() => {
            this._removeTransition(this._bannerElement.querySelector('#container'));
            typeof slideFinish === 'function' && slideFinish();
        }, 500);
        this._bannerElement.querySelector('#container').style.transform = `translateX(${translateX}px)`;
    }

    _slideToWithoutAnimation (translateX) {
        this._currentTranslateX = translateX;

        this._bannerElement.querySelector('#container').style.transform = `translateX(${translateX}px)`;
    }

    _addTransition (element, target, time) {
        element.style.transition = `${target} ${time}s`;
    }

    _removeTransition (element) {
        element.style.transition = `none`;
    }

    _slide (distance) {
        distance *= -1;
        this._currentTranslateX += distance;

        if (this._currentTranslateX > 0) {
            this._currentTranslateX = 0;
        } else if (this._currentTranslateX < IMAGE_WIDTH * (this._imageList.length - 1) * -1) {
            this._currentTranslateX = IMAGE_WIDTH * (this._imageList.length - 1) * -1;
        }

        this._bannerElement.querySelector('#container').style.transform = `translateX(${this._currentTranslateX}px)`;
    }

    _getTemplate (imageList, imageWidth, imageCount) {
        return `
            <div style = 'overflow: hidden; position: relative;'>
                <div id = 'container' style = '${getImageContainerStyle(imageWidth, imageCount)}'>
                    ${imageList.map(image => {
                        return `
                            <div style = '${getImageItemStyle()}'>
                                <img style = '${getImageStyle(imageWidth)}' src = '${image}'></img>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    getElement () {
        let imageList = this._imageList;

        if (this._bannerElement === undefined) {
            let template = this._getTemplate(imageList, IMAGE_WIDTH, imageList.length);
            return Util.generateElementByTemplate(template);
        } else {
            return this._bannerElement;
        }
    }

    _addControls (totalImageCount, currentIndex) {
        this._addPaginationControl(totalImageCount, currentIndex);
    }

    _addPaginationControl (totalImageCount, currentIndex) {
        let pagination = new Pagination(totalImageCount, currentIndex);
        let paginationElement = pagination.getElement();

        this._bannerElement.appendChild(paginationElement);
        this._controls['pagination'] = pagination;
    }
}

export default Banner;
