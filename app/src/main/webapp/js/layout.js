
const overlayEl = document.getElementById('overlay');

const toggleSidebarButtonEl = document.getElementById("menu-button");
toggleSidebarButtonEl.addEventListener('click', toggleSidebar);
const sidebarEl = document.getElementById("sidebar");

const subMenuButtons = document.querySelectorAll(".js-submenu-button");
subMenuButtons.forEach(btn => btn.addEventListener('click', toggleSubMenuHandler));

function toggleSidebar() {

    // when closing the sidebar with any of the sub-menus open, close them
    // but only if a submenu element is not the current page    
    Array.from(sidebarEl.querySelectorAll('.sub-menu.show')).forEach(subMenu => {
        const activeElement = subMenu.querySelector('.menu-item.active');
        if(activeElement == null) {
            toggleSubMenu(subMenu);
        } 
    });
    
    sidebarEl.classList.toggle('show');
    overlayEl.classList.toggle('active');
}

function toggleSubMenu(subMenuEl) {
    subMenuEl.classList.toggle('show');
    subMenuEl.previousElementSibling.classList.toggle('rotate');
}

function toggleSubMenuHandler(e) {
    // the next element after the button element is the <ul> element, which is the menu
    const subMenuEl = e.currentTarget.nextElementSibling;
    toggleSubMenu(subMenuEl);
}

/* if a submenu item is the active page, show the submenu */

const activePageEl = document.querySelector('aside nav ul li.active');
if(activePageEl) {
    // if active page is within a submenu
    const submenuEl = activePageEl.closest('.sub-menu');
    if(submenuEl !== null) {
        // the previous element is the button
        toggleSubMenu(submenuEl); 
    }
}

// LANGUAGES
const changeLangButtonEl = document.querySelector('.change-language-button');
const languagesMenuEl = document.querySelector('.languages-menu');
changeLangButtonEl.addEventListener('click', () => {
    languagesMenuEl.classList.toggle('show');
})