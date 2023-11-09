window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.anim-slide').forEach(el => {
            el.classList.add('active');
        });
    }, 250);
})