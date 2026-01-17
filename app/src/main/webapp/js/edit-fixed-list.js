
const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]');
const csrfToken = document.querySelector('meta[name="_csrf"]');

const listId = document.querySelector('meta[name="listId"]').content;
const tenantId = document.querySelector('meta[name="tenantId"]').content;

const listNameInputEl = document.getElementById("listName");
const initialListName = listNameInputEl.getAttribute("data-init-value");
const editNameButtonEl = document.getElementById("edit-name-button");


// array that will hold the selected products and will be sent to the server
const toListLinkEl = document.getElementById('to-list-link');

const addProductsList = [];
const removeProductsList = [];

editNameButtonEl.addEventListener('click', () => { listNameInputEl.disabled = false; });


/* RESPOND TO CHANGE */

// warn the user before exiting the page
let hasUnsavedChanges = false;

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
    const isNameChanged = listNameInputEl.value !== initialListName;

    if(!isProductsAddedOrRemoved && !isNameChanged) {
        hasUnsavedChanges = false;
        saveButtonEl.disabled = true;
    }
    else {
        hasUnsavedChanges = true;
        saveButtonEl.disabled = false;
    }
}


/* SAVE LIST */
function saveList() {
    const listName = listNameInputEl.value;
    const data = {
        listName: listName,
        addProducts: addProductsList,
        addProducts: addProductsList,
        removeProducts: removeProductsList
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(csrfHeaderName.content, csrfToken.content);
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
        successListNameSpanEl.innerText = listName;
        // add /<list-id> using the list-id we get back from the server to the href
        toListLinkEl.setAttribute('href', toListLinkEl.getAttribute('href') + '/' + listId);
        hasUnsavedChanges = false;
        confirmationDialogEl.showModal();
    }).catch(e => {
        if(e instanceof HttpError) {
            if(e.response.status == 409) {
                errorMessageEl.innerText = `List with name already exists!`;
            } else {
                errorMessageEl.innerText = 'Something went wrong on our side...';
            }
        } else {
            errorMessageEl.innerText = 'Something went wrong on our side...';
        }
        errorDialogEl.showModal();
    });
}