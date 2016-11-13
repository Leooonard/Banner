import Banner from './index.js';

window.onload = function () {
    const IMAGE_LIST = ['./image/image1.jpg', './image/image2.jpg', './image/image3.jpg'];
    let container = document.querySelector('#banner-container');

    let banner = new Banner(IMAGE_LIST, {
        imageWidth: document.body.getBoundingClientRect().width
    });
    let bannerElement = banner.getElement();

    container.appendChild(bannerElement);
};
