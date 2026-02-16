
import { initFixedListEditor, commonElements } from "./fixed-list-editor.js";
import { HttpError } from './common.js';


// array that will hold the selected products and will be sent to the server
const selectedProducts = new Array();

function itemsCheckboxHandler(isChecked, productId, name, productCategory) {
    if(isChecked) {
        selectedProducts.push(productId);
    } else {
        selectedProducts.splice(selectedProducts.indexOf(productId), 1);
    }
}

let hasUnsavedChanges = false;
function hasUnsavedChangesFunc() { return hasUnsavedChanges; }

function respondToChange() {
    if(selectedProducts.length === 0 && commonElements.listNameInputEl.value.length <= 1) {
        hasUnsavedChanges = false;
        // commonElements.saveButtonEl.disabled = true;
    }
    else {
        hasUnsavedChanges = true;
        if(selectedProducts.length !== 0 && commonElements.listNameInputEl.value.length > 1) {
            commonElements.saveButtonEl.disabled = false;
            return;
        }

        // commonElements.saveButtonEl.disabled = true;
    }
}

function saveList() {
    const listName = commonElements.listNameInputEl.value;
    const data = {
        listName: listName,
        productIds: selectedProducts
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(commonElements.csrfHeaderName.content, commonElements.csrfToken.content);
    const body = JSON.stringify(data);
    const responsePromise = fetch(document.baseURI, {
        method: "POST",
        headers: headers,
        body: body
    });

    responsePromise.then(resp => {
        if(!resp.ok) {
            throw new HttpError(resp);
        }
        return resp.text();
    }).then(listId => {
        commonElements.successListNameSpanEl.innerText = listName;
        // add /<list-id> using the list-id we get back from the server to the href
        commonElements.toListLinkEl.setAttribute('href', commonElements.toListLinkEl.getAttribute('href') + '/' + listId);
        hasUnsavedChanges = false;
        commonElements.confirmationDialogEl.showModal();
    }).catch(e => {
        console.log("error");
        if(!e instanceof HttpError) {
            handleGenericError()
            return;
        }

        console.log("HTTP error");
        const response = e.response;

        e.response.json()
            .then(data => {
                if(!data.type) throw new UnhandledProblemTypeError("unknown schema"); // if not a RFC 9457
                handleProblemDetail(data);
            })
            .catch(err => { statusCodeHandler(response); });
    });
}

function handleProblemDetail(data) {
    if(data.type === "product-not-found") handleProductNotFound();
    if(data.type === "invalid-arguments") handleInvalidArguments(data);
    
    else throw new UnhandledProblemTypeError("don't know how to handle this error");
}

function handleInvalidArguments(data) {
    console.log("Invalid arguments"); // TODO parse errors field
}

function handleProductNotFound() {
    console.log("Product not found!");
}

function statusCodeHandler(response) {
    console.log("Handling status code");
}


initFixedListEditor(saveList, respondToChange, itemsCheckboxHandler, hasUnsavedChangesFunc);