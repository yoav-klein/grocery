import { HttpError, UnhandledProblemTypeError } from './common.js';
import { TENANT_URL } from './config.js';

const addInvitationButtonEl = document.getElementById("add-invitation-button");
const invitationDialogEl = document.getElementById("invitation-dialog");

const tenantId = document.querySelector('meta[name="tenantId"]').content;
const invitationLinkEl = document.getElementById('invitation-link');
const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]');
const csrfToken = document.querySelector('meta[name="_csrf"]');
const copyLinkButtonEl = document.getElementById('copy-invite-link-button');

// non-admins don't have this button
if(addInvitationButtonEl) {
    addInvitationButtonEl.addEventListener('click', () => {
        const headers = new Headers();
        headers.append(csrfHeaderName.content, csrfToken.content);
        
        const responsePromise = fetch(TENANT_URL + '/' + tenantId + '/invitations', { method: 'POST', headers: headers });
        responsePromise.then(response => {
                if(!response.ok) {
                    throw new HttpError(response);
                }
                return response.text();
            })
            .then(text => { 
                invitationLinkEl.textContent = text;
                invitationDialogEl.showModal();
            })
            .catch(e => {
                // TODO: show error toast
            });
    });
}

copyLinkButtonEl.addEventListener('click', () => {
    window.navigator.clipboard.writeText(invitationLinkEl.textContent).then(() => {
        copyLinkButtonEl.innerText = 'COPIED!';
        copyLinkButtonEl.disabled = true;
    });
});