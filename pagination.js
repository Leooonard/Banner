import * as Util from './util.js';

const CONTAINER_STYLE = `
    width: 60%;
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -30%;
    text-align: center;
    list-style: none;
`;

const PAGINATION_STYLE = `
    display: inline-block;
    margin: 0px;
    margin-left: 2px;
    margin-right: 2px;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    border: solid 1px gray;
    background-color: gray;
`;

const ACTIVE_PAGINATION_STYLE = PAGINATION_STYLE + `
    background-color: white;
`;

class Pagination {
    constructor (pageCount, activeIndex) {
        this._pageCount = pageCount;
        this._activeIndex = activeIndex;

        this._paginationElement = this.getElement();
    }

    updateActiveIndex (activeIndex) {
        [].slice.call(this._paginationElement.children).forEach((paginationElement, index) => {
            if (index === activeIndex) {
                paginationElement.setAttribute('style', ACTIVE_PAGINATION_STYLE);
            } else {
                paginationElement.setAttribute('style', PAGINATION_STYLE);
            }
        });
    }

    _getTemplate (pageCount, activeIndex) {
        return `
            <ul style = '${CONTAINER_STYLE}'>
                ${this._generateArrayByCount(pageCount).reduce((previousValue, count) => {
                    return previousValue + `
                        <li style = '${count === activeIndex ? ACTIVE_PAGINATION_STYLE : PAGINATION_STYLE}'></li>
                    `;
                }, '')}
            </ul>
        `;
    }

    _generateArrayByCount (count) {
        let array = [];

        for (let i = 0 ; i < count ; i++) {
            array.push(i);
        }

        return array;
    }

    getElement () {
        let activeIndex = this._activeIndex;
        let pageCount = this._pageCount;

        if (this._paginationElement === undefined) {
            let template = this._getTemplate(pageCount, activeIndex);
            return Util.generateElementByTemplate(template);
        } else {
            return this._paginationElement;
        }
    }
}

export default Pagination;
