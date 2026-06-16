
document.addEventListener('click', e => {

    const clickedButton = e.target.closest('.popover-button');
    const clickedMenu = e.target.closest('.popover-menu');
    const openedPopover = document.querySelector('.popover.opened');
    
    if (clickedMenu) {
        return;
    }
    
    if (clickedButton) {
        console.log("here");
        const clickedPopover = clickedButton.closest('.popover');
        const isSamePopover = clickedPopover === openedPopover;
    
        openedPopover?.classList.remove('opened');
    
        if (!isSamePopover) {
            clickedPopover.classList.add('opened');
        }
    
        return;
    }
    
    openedPopover?.classList.remove('opened');
});

