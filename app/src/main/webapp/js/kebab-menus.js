
document.addEventListener('click', e => {
    const pressedKebabMenu = e.target.closest('.js-kebab-menu');
    
    // pressed outside of kebab menu
    if(null === pressedKebabMenu) {
        closeAllMenus();
        return;
    }

    const kebabButton = e.target.closest('.js-kebab-menu-button');
    if(kebabButton !== null) { // pressed button
        // get opened kebab and check if pressed the opened one
        console.log("PRESSED BUTTON");
        const opened = document.querySelector('.js-kebab-menu.kebab-show');
        if(opened !== pressedKebabMenu) closeAllMenus();

        pressedKebabMenu.classList.toggle('kebab-show');
    }
});

function closeAllMenus() {
    Array.from(document.querySelectorAll('.js-kebab-menu.kebab-show')).forEach(item => item.classList.remove('kebab-show'));
}