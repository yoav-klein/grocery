
const overlayEl = document.getElementById('overlay');

const toggleSidebarButtonEl = document.getElementById("menu-button");
toggleSidebarButtonEl.addEventListener('click', toggleSidebar);
const sidebarEl = document.getElementById("sidebar");

const subMenuButtons = document.querySelectorAll(".dropdown-button");
subMenuButtons.forEach(btn => btn.addEventListener('click', toggleSubMenu));

function toggleSidebar() {
    // when closing the sidebar with any of the sub-menus open, close them
    Array.from(sidebarEl.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show');
        ul.previousElementSibling.classList.toggle('rotate');
    });
    
    const isMobile = window.innerWidth <= 768;
    sidebarEl.classList.toggle('close');
    
    if (isMobile) {
        overlayEl.classList.toggle('active');
    }
}

function toggleSubMenu(e) {
    
    const subMenuEl = e.currentTarget.nextElementSibling;
    subMenuEl.classList.toggle('show');
    e.currentTarget.classList.toggle('rotate');
    
    // if submenu button clicked and sidebar is closed, open it
    if(sidebarEl.classList.contains('close')) {
        sidebarEl.classList.toggle('close');
        toggleSidebarButtonEl.classList.toggle('rotate');
    }
}

