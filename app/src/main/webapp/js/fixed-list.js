
import { TENANT_URL } from './config.js';
import { HttpError } from './common.js';

const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]')?.content;
const csrfToken = document.querySelector('meta[name="_csrf"]')?.content;

const listId = document.querySelector('meta[name="listId"]')?.content;
const tenantId = document.querySelector('meta[name="tenantId"]')?.content;
const tenantBaseUrl = `${TENANT_URL}/${tenantId}`
const bulkUrl = `${tenantBaseUrl}/currentList/bulk/${listId}`;

const formEl = document.getElementById('list');

let totalToAdd = 0;

const errorBannerEl = document.getElementById('error-banner');
const errorBannerMessageEl = errorBannerEl.querySelector('span');

const steppers = document.querySelectorAll('.js-stepper');
Array.from(steppers).forEach(stepper => stepper.addEventListener('click', e => {
    const decrementButton = stepper.querySelector('.js-decrement-button');
    
    const input = stepper.querySelector('.js-quantity-input');
    if(e.target.classList.contains('js-increment-button')) {
        input.stepUp();
        totalToAdd += 1;
        decrementButton.disabled = false;
    } else if(e.target.classList.contains('js-decrement-button')) {
        input.stepDown();
        totalToAdd -= 1;
        if(Number(input.value) === 0) {
            decrementButton.disabled = true;
        }
    }

    uiRender();
}));

function uiRender() {
    const insertButton = document.getElementById('insert-button');
    if(totalToAdd === 0) {
        insertButton.disabled = true;
    } else {
        insertButton.disabled = false;
    }
}

const inputs = document.querySelectorAll('.js-quantity-input');

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
        errorBannerEl.classList.add('show');
    });
});

document.getElementById('close-error-banner-button').addEventListener('click', () => { errorBannerEl.classList.remove('show') });

