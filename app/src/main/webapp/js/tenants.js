import { Avatar } from './dicebear.js';
import identicon from './identicon.json' with { type: 'json' };
import { HttpError } from './common.js';

const tenants = Array.from(document.querySelectorAll('.tenant-card'));
tenants.forEach(tenantEl => {
    const tenantId = tenantEl.dataset.tenantId;
    const avatar = new Avatar(identicon, {
        seed: tenantId,
        size: 50
    });

    const svg = avatar.toString();
    tenantEl.querySelector('.tenant-image-container').innerHTML = svg;
});

const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]');
const csrfToken = document.querySelector('meta[name="_csrf"]');

const addTenantFormEl = document.getElementById("add-tenant-form");
const addTenantDialogEl = document.getElementById('add-tenant-dialog');
/* const addTenantSuccessToast = document.getElementById("add-item-success-toast"); */

addTenantFormEl.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent page reload
    addTenantDialogEl.dispatchEvent(new CustomEvent('submitting'));

    const formData = new FormData(addTenantFormEl);
    const data = Object.fromEntries(formData.entries()); // convert to plain object
    
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(csrfHeaderName.content, csrfToken.content);
    const body = JSON.stringify(data);
    const responsePromise = fetch(window.location.pathname, {
        method: "POST",
        headers: headers,
        body: body
    });
    responsePromise
    .then(resp => {
        if(!resp.ok) throw new HttpError(resp);

        addTenantDialogEl.dispatchEvent(new CustomEvent('submitsuccess'));
        window.location.reload();
        /* addItemSuccessToast.dispatchEvent(new CustomEvent('show')); */

    })
    .catch(e => {
        console.log("error");
        if(!e instanceof HttpError) {
            handleGenericError()
            return;
        }

        console.log("HTTP error");
        const response = e.response;

        response.json()
            .then(data => {
                if(!data.type) throw new UnhandledProblemTypeError("unknown schema"); // if not a RFC 9457

                problemDetailHandler(data)
            })
            .catch(e => { 
                statusCodeHandler(response);
            });
    });
});

function problemDetailHandler(problemDetail) {
    if(problemDetail.type === "invalid-arguments") handleInvalidArguments(problemDetail.errors);
    else if(problemDetail.type === "generic-error") handleGenericError("Something is wrong, try again");
    else throw new UnhandledProblemTypeError("don't know how to handle this error");
}

function statusCodeHandler(response) {
    console.log("statusCodeHandler " + response);

    if(response.status === 400) handleGenericError("Something in your request is wrong");
    if(response.status === 500) handleGenericError("Something is wrong on our side, try again");
}

function handleInvalidArguments(fieldErrors) {
    console.log(fieldErrors);
    addTenantDialogEl.dispatchEvent(new CustomEvent('submiterror', { detail: { type: "field", fieldErrors: fieldErrors } }));
}

function handleGenericError(message="Something is wrong, try again") {
    addTenantDialogEl.dispatchEvent(new CustomEvent('submiterror', { detail: { type: "form", message: message } }));
}
