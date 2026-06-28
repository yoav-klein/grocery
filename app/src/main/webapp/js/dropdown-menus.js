
document.addEventListener('click', e => {
    const clickedButton = e.target.closest('.js-dropdown-trigger');
    const openedMenuWrappers = Array.from(document.querySelectorAll('.js-dropdown.opened'));
    
    // close if not parent
    openedMenuWrappers.forEach(mw => {
        if(!(mw.contains(e.target))) {
            mw.classList.remove('opened');
        }
    });

    // close if should close menu
    if("closeMenu" in e.target.dataset) {
        openedMenuWrappers.forEach(mw => {
            mw.classList.remove('opened');
        });
    }

    console.log('here');
    if(clickedButton) {
        console.log('here');
        clickedButton.closest('.js-dropdown').classList.toggle('opened');
    }


});