
const addTenantButtonEl = document.getElementById("add-tenant-button");
const addTenantDialogEl = document.getElementById("add-tenant-dialog");
const closeDialogButtonEl = document.getElementById("close-modal");

addTenantButtonEl.addEventListener('click', () => {
    addTenantDialogEl.showModal();
});

closeDialogButtonEl.addEventListener('click', () => {
    addTenantDialogEl.close();
});
