
import { BASE_URL } from './config.js';
import { HttpError } from './common.js';
 
const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]').content;
const csrfToken = document.querySelector('meta[name="_csrf"]').content;

const listId = document.querySelector('meta[name="listId"]').content;
const tenantId = document.querySelector('meta[name="tenantId"]').content;
const tenantBaseUrl = `${BASE_URL}/tenant/${tenantId}`;
const bulkUrl = `${tenantBaseUrl}/currentList/bulk/${listId}`;

const formEl = document.getElementById('list');
const deleteButtonEl = document.getElementById('delete-button');
const editButtonEl = document.getElementById('edit-button');
const deleteConfirmationDialog = document.getElementById('delete-confirmation-dialog');

const errorBannerEl = document.getElementById('error-banner');
const errorBannerMessageEl = errorBannerEl.querySelector('span');

deleteButtonEl.addEventListener('click', () => {
    deleteConfirmationDialog.showModal();
});

const inputs = document.querySelectorAll('.quantity');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const res = [];
    inputs.forEach(element => {
        const curr = {};
        curr.id = element.id.replace('product-', '');
        curr.quantity = element.value;
        
        if(parseInt(curr.quantity) > 0) {
            res.push(curr);
        }
    });

    const dto = {
        productQuantityList: res
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(csrfHeaderName, csrfToken);
    const body = JSON.stringify(dto);
    const responsePromise = fetch(bulkUrl, {
        method: "POST",
        headers: headers,
        body: body
    });
    responsePromise.then(resp => { 
        if(resp.ok) {
            window.location.replace(tenantBaseUrl); 
        } else {
            throw new HttpError(resp);
        }
    }).catch(e => {
        e.response.json().then(data => {
            if(data.type === "product-not-found") {
                errorBannerMessageEl.innerText = data.title;
            }
            if(data.type === "invalid-arguments") {
                errorBannerMessageEl.innerText = data.title;
            }
        });
        errorBannerEl.classList.add('active');
    });
});

document.getElementById('close-error-banner-button').addEventListener('click', () => { errorBannerEl.classList.remove('active') });

