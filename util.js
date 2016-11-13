function generateElementByTemplate (template) {
    let div = document.createElement('div');
    div.innerHTML = template;

    return div.children[0];
}

export {generateElementByTemplate};
