
Array.from(document.querySelectorAll('.ui-toast')).forEach(e => {
    e.addEventListener('show', () => {
        e.classList.add('show');
    });
});

Array.from(document.querySelectorAll('.ui-toast-close')).forEach(e => {
    e.addEventListener('click', () => {
        e.closest('.ui-toast').classList.remove('show');
    });
});