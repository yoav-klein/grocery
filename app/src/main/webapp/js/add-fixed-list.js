
const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]')
const csrfToken = document.querySelector('meta[name="_csrf"]')

const allCheckboxes = document.querySelectorAll('.product-checkbox');
const selectedProductsListEl = document.getElementById('selected-list');
const listNameInputEl = document.getElementById("listName");
const listNameHeadingEl = document.querySelector('#selected-section h1');
const saveButtonEl = document.getElementById('save-button');

/* CONFIRMATION AND ERROR MODALS ELEMENTS */
const confirmationDialogEl = document.getElementById('confirmation-dialog');
const errorDialogEl = document.getElementById('error-dialog');
const errorMessageEl = document.getElementById('error-message');
const successListNameSpanEl = document.getElementById('success-list-name');
const toListLinkEl = document.getElementById('to-list-link');


// array that will hold the selected products and will be sent to the server
const selectedProducts = new Array();

// warn the user before exiting the page
let hasUnsavedChanges = false;

saveButtonEl.addEventListener('click', saveList);

window.addEventListener("beforeunload", (e) => {
  if (!hasUnsavedChanges) return;

  e.preventDefault();
  e.returnValue = "";
});

allCheckboxes.forEach(input => {
    
    input.addEventListener('change', (e) => {
        const selectedProductsCategories = selectedProductsListEl.querySelectorAll('li');
        const productId = e.target.getAttribute('id');

        // get the name and category of clicked checkbox
        const name = e.target.nextElementSibling.innerText;
        const productCategory = e.target.getAttribute('data-category');

        // find the relevant category li
        const selectedProductsCategory = Array.from(selectedProductsCategories).find(i => i.getAttribute('data-category-name') === productCategory);

        if(e.target.checked) {
            
            let selectedProductsCategoryListEl;

            // if there's not such category yet in the selected list, create it
            if(selectedProductsCategory === undefined) {
                const selectedProductsCategory = document.createElement('li');
                const header = document.createElement('h3');
                header.innerText = productCategory;
                selectedProductsCategoryListEl = document.createElement('ul');
                
                selectedProductsCategory.appendChild(header);
                selectedProductsCategory.appendChild(selectedProductsCategoryListEl);
                selectedProductsCategory.setAttribute('data-category-name', productCategory);
                selectedProductsListEl.appendChild(selectedProductsCategory);
            } else {
                selectedProductsCategoryListEl = selectedProductsCategory.querySelector('ul');
            }

            const liEl = document.createElement('li');
            liEl.setAttribute('data-category', productCategory);
            liEl.innerText = name;

            selectedProductsCategoryListEl.appendChild(liEl);
            selectedProducts.push(productId);
        } else {
            const selectedProductsCategoryListEl = selectedProductsCategory.querySelector('ul');
            
            Array.from(selectedProductsCategoryListEl.children).forEach(child => {
                if(child.innerText === name) {
                    selectedProductsCategoryListEl.removeChild(child);
                }
            });
            // in case it's last item in category, remove category
            if(false === selectedProductsCategoryListEl.hasChildNodes()) { 
                selectedProductsListEl.removeChild(selectedProductsCategory); 
            }

            // remove item from selectedProducts array
            selectedProducts.splice(selectedProducts.indexOf(productId), 1);
        }

        respondToChange();
    });
});

/* RESPOND TO CHANGE */

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



/* MOBILE STEPPER */

const primaryButtonEl = document.getElementById('step-primary-button');
const secondaryButtonEl = document.getElementById('step-secondary-button');

const mainEl = document.querySelector('main');
const numSteps = parseInt(getComputedStyle(mainEl).getPropertyValue('--num-steps'));
let currentStep = parseInt(getComputedStyle(mainEl).getPropertyValue('--current-step'));

const render = () => mainEl.style.setProperty('--current-step', currentStep);
        
primaryButtonEl.addEventListener('click', () => {
    
    if(currentStep < numSteps - 1) {
        ++currentStep;
        render();
        setButtons();
    } else { // save was hit
        saveList();
    }
});

secondaryButtonEl.addEventListener('click', () => {
    if(currentStep > 0) {
        --currentStep;
        render();
        setButtons();
    }
});

function setButtons() {
    const primaryLabels = Array.from(document.querySelectorAll('#step-primary-button span'));
    const secondaryLabels = Array.from(document.querySelectorAll('#step-secondary-button span'));

    primaryLabels.forEach(label => label.classList.remove('current'));
    secondaryLabels.forEach(label => label.classList.remove('current'));
    primaryLabels[currentStep].classList.add('current');
    secondaryLabels[currentStep].classList.add('current');

    // if on step 3, check if list is empty/no name, and if so - disable button
    if(currentStep === numSteps - 1) {
        if(selectedProducts.length === 0 || listNameInputEl.value === '') {
            primaryButtonEl.disabled = true;
        } else {
            primaryButtonEl.disabled = false;
        }
    } else {
        primaryButtonEl.disabled = false;
    }

}

/* CHANGE NAME OF LIST */

listNameInputEl.addEventListener('input', (e) => {
    listNameHeadingEl.innerText = e.target.value;
    respondToChange();
});

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
            } else {
                errorMessageEl.innerText = 'Something went wrong on our side...';
            }
        } else {
            errorMessageEl.innerText = 'Something went wrong on our side...';
        }
        
        errorDialogEl.showModal();
    });
}

