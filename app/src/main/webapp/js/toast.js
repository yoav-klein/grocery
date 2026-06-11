
Array.from(document.querySelectorAll('.js-toast')).forEach(e => {
    e.addEventListener('show', () => {
        e.classList.add('show');
    });
});

Array.from(document.querySelectorAll('.js-close-toast')).forEach(e => {
    e.addEventListener('click', () => {
        e.closest('.toast').classList.remove('show');
    });
});