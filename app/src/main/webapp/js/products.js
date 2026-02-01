
import { HttpError, UnhandledProblemTypeError } from './common.js';



const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]')
const csrfToken = document.querySelector('meta[name="_csrf"]')

const addProductButtonEl = document.getElementById("add-product-button");
const addProductDialogEl = document.getElementById("add-product-dialog");
const submitButton = document.getElementById('new-item-button');
const addProductForm = document.getElementById('new-product-form');
const formErrorBanner = document.getElementById('form-error-banner');

addProductButtonEl.addEventListener('click', () => {
    addProductDialogEl.showModal();
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    resetErrorBanner();

    const formData = new FormData(addProductForm);
    const data = Object.fromEntries(formData.entries());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(csrfHeaderName.content, csrfToken.content);
    const body = JSON.stringify(data);

    console.log("SENDING: " + body);
    const responsePromise = fetch(document.baseURI, {
        method: "POST",
        headers: headers,
        body: body
    });

    responsePromise
    .then(resp => {
        if(!resp.ok) throw new HttpError(resp);

        addProductForm.reset();
        addProductDialogEl.close(); 
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
                console.log("JSON: " + data);
                if(!data.type) throw new UnhandledProblemTypeError("unknown schema"); // if not a RFC 9457

                problemDetailHandler(data)
            })
            .catch(e => { 
                statusCodeHandler(response);
            });
    })
});


function problemDetailHandler(problemDetail) {
    console.log("problemDetail " + problemDetail.type);
    if(problemDetail.type === "invalid-arguments") handleInvalidArguments(problemDetail);
    else if(problemDetail.type === "generic-error") handleGenericError(problemDetail);
    else throw new UnhandledProblemTypeError("don't know how to handle this error");
}

function statusCodeHandler(response) {
    console.log("statusCodeHandler " + response);
    if(response.status == 409) handleConflict(response);
    if(response.status == 400) handleGenericError("Something in your request is wrong");
}


function handleInvalidArguments(data) {
    data.errors.forEach(error => {
        const field = error.field;
        const reason = error.reason;

        console.log(`${field}: ${reason}`);
        const errorMessageEl = document.querySelector(`input[name="${field}"] ~ .field-validation-error`);
        errorMessageEl.innerText = reason;
    });
}

function handleGenericError(message=null) {
    console.log("generic error");

    message = message ? message : 'Something went wrong, try again';
    formErrorBanner.innerText = message;
    formErrorBanner.style.display = 'block';
}

function handleConflict(response) {
    formErrorBanner.style.display = 'block';
    formErrorBanner.innerText = 'Product with such name and category already exists!';
}

function resetErrorBanner() {
    formErrorBanner.style.display = 'none';
    formErrorBanner.innerText = '';
}