
import { initFixedListEditor, commonElements } from "./fixed-list-editor.js";
import { HttpError } from './common.js';

const listId = document.querySelector('meta[name="listId"]').content;
const tenantId = document.querySelector('meta[name="tenantId"]').content;

const initialListName = commonElements.listNameInputEl.getAttribute("data-init-value");
const editNameButtonEl = document.getElementById("edit-name-button");

// array that will hold the selected products and will be sent to the server
const addProductsList = [];
const removeProductsList = [];

editNameButtonEl.addEventListener('click', () => { commonElements.listNameInputEl.disabled = false; });


let hasUnsavedChanges = false;
function hasUnsavedChangesFunc() { return hasUnsavedChanges; }

function itemsCheckboxHandler(isChecked, productId, name, productCategory) {
    if(isChecked) {
        if(removeProductsList.includes(productId)) {
            removeProductsList.splice(removeProductsList.indexOf(productId), 1);
        } else {
            addProductsList.push(productId);
        }
    } else {
        if(addProductsList.includes(productId)) {
            addProductsList.splice(addProductsList.indexOf(productId), 1);
        } else {
            removeProductsList.push(productId);
        }
    }
}

function respondToChange() {
    const isProductsAddedOrRemoved = addProductsList.length !== 0 || removeProductsList.length !== 0;
    const isNameChanged = commonElements.listNameInputEl.value !== initialListName;
    
    if(!isProductsAddedOrRemoved && !isNameChanged) {
        hasUnsavedChanges = false;
        commonElements.saveButtonEl.disabled = true;
    }
    else {
        hasUnsavedChanges = true;
        commonElements.saveButtonEl.disabled = false;
    }
}

function saveList() {
    const listName = commonElements.listNameInputEl.value;
    const data = {
        listName: listName,
        addProducts: addProductsList,
        removeProducts: removeProductsList
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(commonElements.csrfHeaderName.content, commonElements.csrfToken.content);
    const body = JSON.stringify(data);
    const responsePromise = fetch(`${window.location.origin}/app/tenant/${tenantId}/lists/${listId}`, {
        method: "PUT",
        headers: headers,
        body: body
    });

    responsePromise.then(resp => {
        if(!resp.ok) {
            throw new HttpError(resp);
        }
        return resp.text();
    }).then(() => {
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
    if(data.type === "fixed-list-not-found") handleFixedListNotFound();
    if(data.type === "invalid-arguments") handleInvalidArguments();
    
    else throw new UnhandledProblemTypeError("don't know how to handle this error");
}

function handleInvalidArguments(data) {
    console.log("Invalid arguments"); // TODO parse errors field
}

function handleProductNotFound() {
    console.log("Product not found!");
}

function handleFixedListNotFound() {
    console.log("Fixed list not found!");
}

    
function statusCodeHandler(response) {
    console.log("Handling statud code");
}

initFixedListEditor(saveList, respondToChange, itemsCheckboxHandler, hasUnsavedChangesFunc);