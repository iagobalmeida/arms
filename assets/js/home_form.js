window.addEventListener('load', () => {
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keyup', () => {
            input.value = input.value.toString().toUpperCase();
        })
    })
})