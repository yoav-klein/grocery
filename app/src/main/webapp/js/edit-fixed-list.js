
import { initFixedListEditor, commonElements } from "./fixed-list-editor.js";
import { HttpError } from './common.js';

const listId = document.querySelector('meta[name="listId"]').content;
const tenantId = document.querySelector('meta[name="tenantId"]').content;

const initialListName = commonElements.listNameInput.dataset.initValue;

const editNameButtonEl = document.getElementById("edit-name-button");
editNameButtonEl.addEventListener('click', () => { commonElements.listNameInput.disabled = false; });

// array that will hold the selected products and will be sent to the server
const addProductsList = [];
const removeProductsList = [];
let submitted = false;

function getState() {
    return { 
        numAdded: addProductsList.length,
        numRemoved: removeProductsList.length
     };
}

function isSubmitting() {
    const productsAdded = addProductsList.length > 0;
    const productsRemoved = removeProductsList.length > 0;
    const listNameChanged = initialListName !== commonElements.listNameInput.value;
    const listNameEmpty = commonElements.listNameInput.value === 0;

    if(listNameEmpty) return false;
    return productsAdded || productsRemoved || listNameChanged;
}

function hasUnsavedChanges() {
    if(submitted) return false;

    const productsAdded = addProductsList.length > 0;
    const productsRemoved = removeProductsList.length > 0;
    const listNameChanged = initialListName !== commonElements.listNameInput.value;

    return productsAdded || productsRemoved || listNameChanged;
}


function addItem(productId) {
    if(removeProductsList.includes(productId)) {
        removeProductsList.splice(removeProductsList.indexOf(productId), 1);
    } else {
        addProductsList.push(productId);
    }
}

function removeItem(productId) {
    if(addProductsList.includes(productId)) {
        addProductsList.splice(addProductsList.indexOf(productId), 1);
    } else {
        removeProductsList.push(productId);
    }
}

function saveList() {
    const listName = commonElements.listNameInput.value;
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
        console.log(resp.status);
        console.log(resp.ok);
        if(!resp.ok) {
            throw new HttpError(resp);
        }
        return resp.text();
    }).then(() => {
        commonElements.confirmationDialog.dispatchEvent(new CustomEvent('submitsuccess', { detail: { listName, listId } }));
        submitted = true;
    }).catch(e => {
        if(!(e instanceof HttpError)) {
            handleGenericError()
            return;
        }

        console.log("HTTP error");
        e.response.json()
            .then(data => {
                console.log("RFC 9457 error");
                console.log(data);
                if(!data.type) throw new UnhandledProblemTypeError("unknown schema"); // if not a RFC 9457
                handleProblemDetail(data);
            })
            .catch(err => { statusCodeHandler(e.response); });
    });
}

function handleProblemDetail(data) {
    switch(data.type) {
        case "product-not-found":
            handleProductNotFound();
            break;
        case "fixed-list-not-found":
            handleFixedListNotFound();
            break;
        case "invalid-argumets":
            handleInvalidArguments();
            break;
        default:
            throw new UnhandledProblemTypeError("don't know how to handle this error");
    }
}

function handleInvalidArguments(data) {
    console.log("Invalid arguments"); // TODO parse errors field
}

function handleProductNotFound() {
    console.log("Handle product not found");
    commonElements.errorDialog.dispatchEvent(new CustomEvent('submiterror', { 
        detail: {
            title: 'Request Error',
            message: 'One of the products in your request are missing, refresh the page and try again'
        }
    }));
}

function handleFixedListNotFound() {
    commonElements.errorDialog.dispatchEvent(new CustomEvent('submiterror', { 
        detail: {
            title: 'Request Error',
            message: 'This fixed list does not exist'
        }
    }));
}

    
function statusCodeHandler(response) {
    let title;
    let message;
    if(response.status === 409) {
        title = "Duplicate";
        message = "A list with such name already exists"
    }

    commonElements.errorDialog.dispatchEvent(new CustomEvent('submiterror', { 
        detail: {
            title, message
        }
    }));
    console.log("Handling status code");
}


initFixedListEditor({
    mode: 'edit', 
    saveListCallback: saveList, 
    addItemCallback: addItem, 
    removeItemCallback: removeItem,
    hasUnsavedChangesCallback: hasUnsavedChanges, 
    isSubmittingCallback: isSubmitting, 
    getStateCallback: getState 
});