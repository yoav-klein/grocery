
const listNameInputEl = document.getElementById("listName");
const tenantId = document.querySelector('meta[name="tenantId"]').content;

export const commonElements = { 
    csrfHeaderName: document.querySelector('meta[name="_csrf_header"]'),
    csrfToken: document.querySelector('meta[name="_csrf"]'),
    saveButtonEl: document.getElementById('save-button'),
    listNameInputEl: document.getElementById("listName"),
    toListLinkEl: document.getElementById('to-list-link'),
    confirmationDialogEl: document.getElementById('confirmation-dialog'),
    errorDialogEl: document.getElementById('error-dialog'),
    errorMessageTitleEl: document.getElementById('error-message-title'),
    errorMessageDetailsEl: document.getElementById('error-message-details'),
    successListNameSpanEl: document.getElementById('success-list-name')
 };


export function initFixedListEditor(saveListCallback, respondToChangeCallback, itemsCheckboxHandlerCallback, hasUnsavedChangesFunc) {
    saveButtonHandler(saveListCallback);
    cancelButtonHandler();
    checkboxesHandler(respondToChangeCallback, itemsCheckboxHandlerCallback);
    mobileStepper(saveListCallback);
    changeListNameHandler(respondToChangeCallback);
    cancelChangesProtection(hasUnsavedChangesFunc);
}

function saveButtonHandler(saveListCallback) {
    const saveButtonEl = document.getElementById('save-button');
    saveButtonEl.addEventListener('click', saveListCallback);
}

function cancelButtonHandler() {
    const cancelButtonEl = document.getElementById('cancel-button');
    cancelButtonEl.addEventListener('click', () => {
        window.location.replace(`${window.location.origin}/app/tenant/${tenantId}`);
    });
}

function checkboxesHandler(respondToChangeCallback, itemsCheckboxHandlerCallback) {
    const allCheckboxes = document.querySelectorAll('.product-checkbox');
    allCheckboxes.forEach(input => {
        
        input.addEventListener('change', (e) => {
            // get the name and category of clicked checkbox
            const name = e.target.nextElementSibling.innerText;
            const productCategory = e.target.getAttribute('data-category');
            const productId = e.target.getAttribute('id');
            
            if(e.target.checked) {
                handleChangeInUI('checked', productId, name, productCategory);
            } else {
                handleChangeInUI('unchecked', productId, name, productCategory);
            }
    
            itemsCheckboxHandlerCallback(e.target.checked, productId, name, productCategory);
            respondToChangeCallback();
        });
    });
}


function cancelChangesProtection(hasUnsavedChangesFunc) {
    /** UNSAVED CHANGES PROTECTION */
    window.addEventListener("beforeunload", (e) => {
      if (!hasUnsavedChangesFunc()) return;
    
      e.preventDefault();
    
    
      e.returnValue = "";
    });
}

function mobileStepper(saveListCallback) {
    const primaryButtonEl = document.getElementById('step-primary-button');
    const secondaryButtonEl = document.getElementById('step-secondary-button');

    const mainEl = document.querySelector('main');
    const numSteps = parseInt(getComputedStyle(mainEl).getPropertyValue('--num-steps'));
    let currentStep = parseInt(getComputedStyle(mainEl).getPropertyValue('--current-step'));

    const render = () => mainEl.style.setProperty('--current-step', currentStep);
            
    primaryButtonEl.addEventListener('click', () => {
        console.log("CURRENT STEP: " + currentStep);
        
        if(currentStep < numSteps - 1) {
            ++currentStep;
            render();
            setButtons();
        } else { // save was hit
            saveListCallback();
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
}

/** when name of list changes, change the list name heading in mobile view */
function changeListNameHandler(respondToChangeCallback) {
    const listNameHeadingEl = document.querySelector('#selected-section h1');
    
    listNameInputEl.addEventListener('input', (e) => {
        listNameHeadingEl.innerText = e.target.value;
        respondToChangeCallback();
    });
}



/** HANDLE CHANGES IN THE SELECTED PRODUCTS PANE */
const selectedProductsListEl = document.getElementById('selected-list');

function handleChangeInUI(checkedOrUnchecked, productId, name, productCategory) {
    const selectedProductsCategories = selectedProductsListEl.querySelectorAll(':scope>li'); // get direct children li elements

    // find the relevant category li
    let selectedProductsCategory = Array.from(selectedProductsCategories).find(i => i.getAttribute('data-category-name') === productCategory);

    if(checkedOrUnchecked === 'checked') { // case added
        let selectedProductsCategoryListEl;

        // if there's not such category yet in the selected list, create it
        if(selectedProductsCategory === undefined) {
            // clone the template "selected-list-category-template"
            selectedProductsCategory = document.getElementById("selected-list-category-template").content.cloneNode(true).querySelector('li');
            selectedProductsCategory.setAttribute('data-category-name', productCategory);
            selectedProductsCategory.querySelector('h3').innerText = productCategory;
            // add it to the top-level <ul>
            selectedProductsListEl.appendChild(selectedProductsCategory);
        }

        selectedProductsCategoryListEl = selectedProductsCategory.querySelector('ul');
        // append the child to the category list
        const liEl = document.createElement('li');
        liEl.setAttribute('data-category', productCategory);
        liEl.innerText = name;

        selectedProductsCategoryListEl.appendChild(liEl);

    } else { // case removed
        const selectedProductsCategoryListEl = selectedProductsCategory.querySelector('ul');
        
        Array.from(selectedProductsCategoryListEl.children).forEach(child => {
            if(child.innerText === name) {
                selectedProductsCategoryListEl.removeChild(child);
            }
        });

        // in case it's last item in category, remove category
        if(Array.from(selectedProductsCategoryListEl.children).length === 0) {
            selectedProductsListEl.removeChild(selectedProductsCategory); 
        }
    }
}