
document.addEventListener('click', e => {
    console.log('click');
    const clickedButton = e.target.closest('.ui-popover-trigger');
    const openedPopovers = Array.from(document.querySelectorAll('.ui-popover.opened'));
    
    // close if not parent
    openedPopovers.forEach(popover => {
        if(!(popover.contains(e.target))) {
            popover.classList.remove('opened');
        } else {
            // close if should close menu
            if(e.target.closest('[data-close-menu]')) {
                popover.classList.remove('opened');
            }
        }
    });

    if(clickedButton) {
        clickedButton.closest('.ui-popover').classList.toggle('opened');
    }

});