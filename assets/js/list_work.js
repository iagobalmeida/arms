window.addEventListener('load', () => {
    const listWorkWrapper = document.querySelector('#list-work-wrapper');
    const template = listWorkWrapper.children[0].outerHTML;
    while(listWorkWrapper.childElementCount < 12) {
        listWorkWrapper.innerHTML += template;
    }
})