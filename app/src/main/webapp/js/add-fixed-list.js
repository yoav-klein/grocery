
import { initFixedListEditor, commonElements } from "./fixed-list-editor.js";
import { HttpError } from './common.js';


// array that will hold the selected products and will be sent to the server
const selectedProducts = new Array();
let submitted = false;

function getState() {
    return { 
        numSelected: selectedProducts.length
     };
}

function addItem(productId) {
    selectedProducts.push(productId);
}

function removeItem(productId) {
    selectedProducts.splice(selectedProducts.indexOf(productId), 1);
}

function isSubmitting() {
    if(selectedProducts.length !== 0 && commonElements.listNameInput.value.length > 1) {
        return true;
    }
    return false;
}

function hasUnsavedChanges() {
    if(submitted) return false;

    if(selectedProducts.length === 0 && commonElements.listNameInput.value.length <= 1) {
        return false;
    }
    return true;
}

function saveList() {
    const listName = commonElements.listNameInput.value;
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
        console.log(resp.status);
        if(!resp.ok) {
            throw new HttpError(resp);
        }
        return resp.text();
    }).then(listId => {
        commonElements.confirmationDialog.dispatchEvent(new CustomEvent('submitsuccess', { detail: { listName, listId } }));
        submitted = true;
    }).catch(e => {
        if(!(e instanceof HttpError)) {
            handleUnknownError()
            return;
        }

        const response = e.response;
        e.response.json()
            .then(data => {
                if(!data.type) throw new UnhandledProblemTypeError("unknown schema"); // if not a RFC 9457
                handleProblemDetail(data);
            })
            .catch(err => { statusCodeHandler(response); });
    });
}

function handleUnknownError() {
    console.log("UNKNOWN ERROR");
}

function handleProblemDetail(data) {
    if(data.type === "product-not-found") handleProductNotFound();
    
    else throw new UnhandledProblemTypeError("don't know how to handle this error");
}


function handleProductNotFound() {
    commonElements.errorDialog.dispatchEvent(new CustomEvent('submiterror', { 
        detail: {
            title: 'Request Error',
            message: 'One of the products in your request are missing, refresh the page and try again'
        }
    }));
    console.log("Product not found!");
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
    mode: 'add', 
    saveListCallback: saveList, 
    addItemCallback: addItem, 
    removeItemCallback: removeItem,
    hasUnsavedChangesCallback: hasUnsavedChanges, 
    isSubmittingCallback: isSubmitting, 
    getStateCallback: getState 
});