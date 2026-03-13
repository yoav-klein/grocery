
import { HttpError } from './common.js';

const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]')
const csrfToken = document.querySelector('meta[name="_csrf"]')

const evtSource = new EventSource(document.baseURI + '/itemStream');

const newItemFormEl = document.getElementById("new-item-form");
const addItemDialogEl = document.getElementById('add-item-dialog');


newItemFormEl.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent page reload
    addItemDialogEl.dispatchEvent(new CustomEvent('submitting'));

    const formData = new FormData(newItemFormEl);
    const data = Object.fromEntries(formData.entries()); // convert to plain object
    
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(csrfHeaderName.content, csrfToken.content);
    const body = JSON.stringify(data);
    const responsePromise = fetch(document.baseURI + "/addItem", {
        method: "POST",
        headers: headers,
        body: body
    });
    responsePromise
    .then(resp => {
        if(!resp.ok) throw new HttpError(resp);

        addItemDialogEl.dispatchEvent(new CustomEvent('submitsuccess'));

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
    if(problemDetail.type === "invalid-arguments") handleInvalidArguments(problemDetail.errors);
    else if(problemDetail.type === "generic-error") handleGenericError("Something is wrong, try again");
    else throw new UnhandledProblemTypeError("don't know how to handle this error");
}

function statusCodeHandler(response) {
    console.log("statusCodeHandler " + response);

    if(response.status === 400) handleGenericError("Something in your request is wrong");
    if(response.status === 500) handleGenericError("Something is wrong on our side, try again");
}

function handleInvalidArguments(fieldErrors) {
    console.log(fieldErrors);
    addItemDialogEl.dispatchEvent(new CustomEvent('submiterror', { detail: { type: "field", fieldErrors: fieldErrors } }));
}

function handleGenericError(message="Something is wrong, try again") {
    addItemDialogEl.dispatchEvent(new CustomEvent('submiterror', { detail: { type: "form", message: message } }));
}

/* DELETE ITEMS */

const deleteCheckboxes = document.querySelectorAll('.delete-checkbox');

deleteCheckboxes.forEach((el) => {
    attachHandlerToDeleteCheckbox(el);
});

evtSource.addEventListener("DELETE-ITEM", (event) => { 
    const itemId = event.data;
    const itemEl = document.getElementById(`item-${itemId}`);
    const parentList = itemEl.parentElement;
    itemEl.remove();
    if(parentList.childElementCount === 0) {
        // get parent <article> and remove
        parentList.parentElement.remove();
    }
});



evtSource.addEventListener("NEW-ITEM", (event) => {

    console.log("GOT NEW ITEM");
    
    const eventData = JSON.parse(event.data);
    const allCategorySections = Array.from(document.querySelectorAll('article.category'));
    let categoryEl = allCategorySections.find(i => i.getAttribute('id') === `category-${eventData.category}`);
    console.log(categoryEl);
    if(categoryEl === undefined) {
        categoryEl = createNewCategory(eventData.category);
        console.log(categoryEl);
    }
    
    const newItem = createNewItem(eventData);
    
    categoryEl.querySelector('ul').appendChild(newItem);
});


evtSource.addEventListener("REFRESH-LIST", (event) => {
    location.reload();
})

function createNewCategory(categoryName) {
    const listEl = document.getElementById('all-categories');
    const newElement = document.getElementById("category-template").content.cloneNode(true);
    // TODO: localization
    newElement.querySelector('h2').innerText = categoryName;
    newElement.querySelector('article').setAttribute('id', `category-${categoryName}`);
    
    // returns the appended <article>
    return listEl.appendChild(newElement.querySelector('article'));
}

function createNewItem(data) {
    const newElement = document.getElementById("item-template").content.cloneNode(true); // deep clone
    newElement.querySelector('li').setAttribute('id', `item-${data.id}`);
    newElement.querySelector('.item-quantity').innerText = data.quantity;
    newElement.querySelector('.item-quantity-type').innerText = data.quantityType;
    newElement.querySelector('.item-name span').innerText = data.name;
    const deleteCheckbox = newElement.querySelector('.delete-checkbox');
    deleteCheckbox.setAttribute('id', `delete-checkbox-${data.id}`);
    newElement.querySelector('label').setAttribute('for', `delete-checkbox-${data.id}`);

    attachHandlerToDeleteCheckbox(deleteCheckbox);

    return newElement;
}

function attachHandlerToDeleteCheckbox(el) {
    el.addEventListener('change', (e) => {
        if(e.target.checked) {

            const id = e.target.id.replace("delete-checkbox-", "");
            const headers = new Headers();
            headers.append(csrfHeaderName.content, csrfToken.content);
            const responsePromise = fetch(document.baseURI + `/item?itemId=${id}`, {
                method: "DELETE",
                headers: headers
            });
            responsePromise.then(resp => console.log(`OK: ${resp.ok}`)).catch(e => console.log(`error: ${e}`));
        }
    });
}