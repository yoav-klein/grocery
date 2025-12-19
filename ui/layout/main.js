
const overlayEl = document.getElementById('overlay');

const toggleSidebarButtonEl = document.getElementById("menu-button");
toggleSidebarButtonEl.addEventListener('click', toggleSidebar);
const sidebarEl = document.getElementById("sidebar");


function toggleSidebar() {
    
    /* const isMobile = window.innerWidth <= 768; */
    sidebarEl.classList.toggle('close');
    
    /* if (isMobile) { */
        overlayEl.classList.toggle('active');
    /* } */
}

