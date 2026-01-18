

const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]');
const csrfToken = document.querySelector('meta[name="_csrf"]');

const listNameInputEl = document.getElementById("listName");
const tenantId = document.querySelector('meta[name="tenantId"]').content;

// array that will hold the selected products and will be sent to the server
const selectedProducts = new Array();
const toListLinkEl = document.getElementById('to-list-link');

/* RESPOND TO CHANGE */

// warn the user before exiting the page
let hasUnsavedChanges = false;

function itemsCheckboxHandler(isChecked, productId, name, productCategory) {
    if(isChecked) {
        selectedProducts.push(productId);
    } else {
        selectedProducts.splice(selectedProducts.indexOf(productId), 1);
    }
}

function respondToChange() {
    if(selectedProducts.length === 0 && listNameInputEl.value === '') {
        hasUnsavedChanges = false;
        saveButtonEl.disabled = true;
    }
    else {
        hasUnsavedChanges = true;
        if(selectedProducts.length !== 0 && listNameInputEl.value !== '') {
            saveButtonEl.disabled = false;
            return;
        }

        saveButtonEl.disabled = true;
    }
}


/* SAVE LIST */
function saveList() {
    const listName = listNameInputEl.value;
    const data = {
        listName: listName,
        productIds: selectedProducts
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(csrfHeaderName.content, csrfToken.content);
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
        successListNameSpanEl.innerText = listName;
        // add /<list-id> using the list-id we get back from the server to the href
        toListLinkEl.setAttribute('href', toListLinkEl.getAttribute('href') + '/' + listId);
        hasUnsavedChanges = false;
        confirmationDialogEl.showModal();
    }).catch(e => {
        if(e instanceof HttpError) {
            if(e.response.status == 409) {
                errorMessageEl.innerText = `List with name already exists!`;
            } if(e.response.status == 400) {
                errorMessageEl.innerText = `Bad request!`;
                e.response.text().then(t => console.log(t));
            }
            else {
                errorMessageEl.innerText = 'Something went wrong on our side...';
            }
        } else {
            errorMessageEl.innerText = 'Something went wrong on our side...';
        }
        errorDialogEl.showModal();
    });
}
