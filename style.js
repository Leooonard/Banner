
function getImageItemStyle () {
    const IMAGE_ITEM_STYLE = `
        float: left;
    `;

    return IMAGE_ITEM_STYLE;
}

function getImageContainerStyle (imageWidth, imageCount) {
    const IMAGE_CONTAINER_STYLE = `
        width: ${imageWidth * imageCount}px;
    `;

    return IMAGE_CONTAINER_STYLE;
}


function getImageStyle (imageWidth) {
    const IMAGE_STYLE = `
        width: ${imageWidth}px;
    `;

    return IMAGE_STYLE;
}

export {getImageContainerStyle, getImageItemStyle, getImageStyle};
