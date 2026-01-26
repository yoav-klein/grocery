
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
        commonElements.saveButtonEl.disabled = true;
    }
    else {
        hasUnsavedChanges = true;
        if(selectedProducts.length !== 0 && commonElements.listNameInputEl.value.length > 1) {
            commonElements.saveButtonEl.disabled = false;
            return;
        }

        commonElements.saveButtonEl.disabled = true;
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
        if(e instanceof HttpError) {
            if(e.response.status == 409) {
                commonElements.errorMessageTitleEl.innerText = `List with name already exists!`;
            } else if(e.response.status == 400) {
                e.response.json().then(data => {
                    commonElements.errorMessageTitleEl.innerText = data.title;
                    commonElements.errorMessageDetailsEl.replaceChildren();
                    data.errors.forEach(err =>  {
                        const listItem = document.createElement('li');
                        listItem.innerText = `${err.reason}`;
                        commonElements.errorMessageDetailsEl.appendChild(listItem);
                    })
                });
            } else {
                commonElements.errorMessageTitleEl.innerText = 'Something went wrong on our side...';
            }
        } else {
            commonElements.errorMessageTitleEl.innerText = 'Something went wrong on our side...';
        }
        commonElements.errorDialogEl.showModal();
    });
}


initFixedListEditor(saveList, respondToChange, itemsCheckboxHandler, hasUnsavedChangesFunc);