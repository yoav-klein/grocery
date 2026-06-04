
import { HttpError, UnhandledProblemTypeError } from './common.js';


const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]')
const csrfToken = document.querySelector('meta[name="_csrf"]')

const addProductDialogEl = document.getElementById("add-product-dialog");
const submitButton = document.getElementById('dialog-submit-button');
const addProductForm = document.getElementById('new-product-form');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    addProductDialogEl.dispatchEvent(new CustomEvent('submitting'));

    const formData = new FormData(addProductForm);
    const data = Object.fromEntries(formData.entries());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(csrfHeaderName.content, csrfToken.content);
    const body = JSON.stringify(data);

    const responsePromise = fetch(document.baseURI, {
        method: "POST",
        headers: headers,
        body: body
    });

    responsePromise
    .then(resp => {
        if(!resp.ok) throw new HttpError(resp);

        addProductDialogEl.dispatchEvent(new CustomEvent('submitsuccess'));
        window.location.reload();
    })
    .catch(e => {
        console.log("error");
        if(!e instanceof HttpError) {
            handleGenericError()
            return;
        }

        const response = e.response;
        response.json()
            .then(data => {
                console.log("JSON: ");
                console.log(data);
                if(!data.type) throw new UnhandledProblemTypeError("unknown schema"); // if not a RFC 9457

                problemDetailHandler(data)
            })
            .catch(e => { 
                statusCodeHandler(response);
            });
    });
});


function problemDetailHandler(problemDetail) {
    console.log("problemDetail ");
    console.log(problemDetail);
    if(problemDetail.type === "invalid-arguments") handleInvalidArguments(problemDetail.errors);
    else if(problemDetail.type === "generic-error") handleFormError(problemDetail.title);
    else throw new UnhandledProblemTypeError("don't know how to handle this error");
}

function statusCodeHandler(response) {
    console.log("statusCodeHandler " + response);
    
    if(response.status == 409) handleFormError('Product with such name and category already exists!');
    if(response.status == 400) handleFormError("Something in your request is wrong");
}

function handleFormError(message = "Something is wrong") {
    addProductDialogEl.dispatchEvent(new CustomEvent('submiterror', { detail: { type: "form", message: message } }));
}

function handleInvalidArguments(fieldErrors) {
    addProductDialogEl.dispatchEvent(new CustomEvent('submiterror', { detail: { type: "field", fieldErrors: fieldErrors } }));
}
