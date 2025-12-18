
const addInvitationButtonEl = document.getElementById("add-invitation-button");
const addInvitationDialogEl = document.getElementById("add-invitation-dialog");
const closeDialogButtonEl = document.getElementById("close-modal");

// non-admins don't have this button
if(addInvitationButtonEl) {
    addInvitationButtonEl.addEventListener('click', () => {
        addInvitationDialogEl.showModal();
    });
}

closeDialogButtonEl.addEventListener('click', () => {
    addInvitationDialogEl.close();
});

const btns = document.querySelectorAll('.member-action-menu-container button');
btns.forEach(btn => btn.addEventListener('click', menuButtonClick));
kebabs = document.querySelectorAll('.member-action-menu-container');

document.addEventListener('click', (e) => {
    const pressed = document.querySelector('.member-action-menu-container.pressed');
    let target = e.target;
    while(target) {
        if(target.classList.contains('member-action-menu')) {  return; }
        target = target.parentElement;
    }
    if(pressed) pressed.classList.remove('pressed');
});

function menuButtonClick(e) {
    e.stopPropagation();
    const pressed = document.querySelector('.member-action-menu-container.pressed');
    if(pressed) {
        pressed.classList.remove('pressed');
        const pressedButton = pressed.querySelector('button');
        if(pressedButton === e.currentTarget) return;
        
    }
    e.currentTarget.parentElement.classList.add('pressed');
    
}

const deleteTenantButtonEl = document.getElementById("delete-tenant-button");
const deleteTenantConfirmationDialogEl = document.getElementById("delete-tenant-confirmation-dialog");
const confirmationDialogAbortButtonEl = document.querySelectorAll(".abort-button");

confirmationDialogAbortButtonEl.forEach(button => button.addEventListener('click', abortConfirmationDialog))

if(deleteTenantButtonEl) {
    deleteTenantButtonEl.addEventListener('click', () => {
        deleteTenantConfirmationDialogEl.showModal();
    });
}

function abortConfirmationDialog(e) {
    let element = e.target;
    while(element.tagName !== "DIALOG") { console.log(element.tagName);  element = element.parentElement; }
    element.close();
}

const leaveTenantButtonEl = document.getElementById("leave-tenant-button");
const leaveTenantConfirmationDialogEl = document.getElementById("leave-tenant-confirmation-dialog");
leaveTenantButtonEl.addEventListener('click', () => { leaveTenantConfirmationDialogEl.showModal(); });
