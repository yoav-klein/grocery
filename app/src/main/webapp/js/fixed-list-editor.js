
const tenantId = document.querySelector('meta[name="tenantId"]').content;
const uiElements = {
    saveButton: document.getElementById('save-button'),
    selectedProductsList: document.getElementById('selected-list'),
    main: document.querySelector('main'),
    stepperPrimaryButton: document.getElementById('step-primary-button'),
    reviewListName: document.querySelector('#selected-section .list-meta-name')
}

export const commonElements = { 
    csrfHeaderName: document.querySelector('meta[name="_csrf_header"]'),
    csrfToken: document.querySelector('meta[name="_csrf"]'),
    listNameInput: document.getElementById("listName"),
    toListLink: document.getElementById('to-list-link'),
    confirmationDialog: document.getElementById('confirmation-dialog'),
    errorDialog: document.getElementById('error-dialog'),
    successListNameSpan: document.getElementById('success-list-name')
 };


export function initFixedListEditor({
    mode,
    saveListCallback,
    addItemCallback, 
    removeItemCallback,
    hasUnsavedChangesCallback,
    isSubmittingCallback,
    getStateCallback
}) {
    initSaveButtonHandler(saveListCallback);
    initCancelButtonHandler();
    initCheckboxHandlers(isSubmittingCallback, addItemCallback, removeItemCallback, mode, getStateCallback);
    initDeleteProductHandler(removeItemCallback, isSubmittingCallback, mode, getStateCallback);
    initMobileStepper(saveListCallback, isSubmittingCallback);
    initChangeListNameHandler(isSubmittingCallback);
    initCancelChangesProtection(hasUnsavedChangesCallback);
    initSubmissionHandlers();
}

function initSubmissionHandlers() {
    commonElements.confirmationDialog.addEventListener('submitsuccess', (e) => {
        commonElements.successListNameSpan.innerText = e.detail.listName;
        // add /<list-id> using the list-id we get back from the server to the href
        commonElements.toListLink.setAttribute('href', commonElements.toListLink.getAttribute('href') + '/' + e.detail.listId);
        commonElements.confirmationDialog.showModal();
    });

    commonElements.errorDialog.addEventListener('submiterror', (e) => {
        document.getElementById('error-message-title').innerText = e.detail.title;
        document.getElementById('error-message-details').innerText = e.detail.message;
        commonElements.errorDialog.showModal();
    });
}

function initSaveButtonHandler(saveListCallback) {
    uiElements.saveButton.addEventListener('click', saveListCallback);
}

function initCancelButtonHandler() {
    const cancelButtonEl = document.getElementById('cancel-button');
    cancelButtonEl.addEventListener('click', redirectToHome);
}

function redirectToHome() {
    window.location.replace(`${window.location.origin}/app/tenant/${tenantId}`);
}

function updateControls(isSubmittingCallback) {
    uiElements.saveButton.disabled = !isSubmittingCallback();
    const currentStep = parseInt(getComputedStyle(uiElements.main).getPropertyValue('--current-step'));
    const numSteps = parseInt(getComputedStyle(uiElements.main).getPropertyValue('--num-steps'));

    if(currentStep === numSteps - 1) {
        if(isSubmittingCallback()) {
            uiElements.stepperPrimaryButton.disabled = false;
        } else {
            uiElements.stepperPrimaryButton.disabled = true;
        }
        return;
    }

    if(currentStep === 0) { // name step
        if(commonElements.listNameInput.value.length > 1) {
            uiElements.stepperPrimaryButton.disabled = false;
        } else {
            uiElements.stepperPrimaryButton.disabled = true;
        }
    }
}

function initCheckboxHandlers(isSubmittingCallback, addItemCallback, removeItemCallback, mode, getStateCallback) {
    const allCheckboxes = document.querySelectorAll('.product-checkbox');
    allCheckboxes.forEach(input => {
        
        input.addEventListener('change', (e) => {
            // get the name and category of clicked checkbox
            const name = e.target.nextElementSibling.innerText;
            const productCategory = e.target.getAttribute('data-category');
            const productId = e.target.getAttribute('id');

            if(e.target.checked) {
                addItemCallback(productId, name, productCategory);
            } else {
                removeItemCallback(productId, name, productCategory);
            }
            
            renderCheckboxChange(e.target.checked, productId, name, productCategory);
            renderSummary(mode, getStateCallback);
            updateControls(isSubmittingCallback);
        });
    });
}

function renderSummary(mode, getStateCallback) {
    if(mode === "add") {
        Array.from(document.querySelectorAll('.num-selected')).forEach(el => {
            el.innerText = getStateCallback().numSelected;
        });
    }
    if(mode === "edit") {
        Array.from(document.querySelectorAll('.edit-summary-added   span')).forEach(el => el.innerText = getStateCallback().numAdded);
        Array.from(document.querySelectorAll('.edit-summary-removed span')).forEach(el => el.innerText = getStateCallback().numRemoved);
    }
}

function initDeleteProductHandler(removeItemCallback, isSubmittingCallback, mode, getStateCallback) {
    uiElements.selectedProductsList.addEventListener('click', (e) => {
        if(!e.target.classList.contains('selected-product-remove-btn')) return;

        const productId = e.target.parentElement.dataset.productId;
        removeItemCallback(productId);

        // uncheck checkbox
        document.getElementById(productId).checked = false; 
        // this is a bit of a hack, but ** it, it works
        renderCheckboxChange(false, productId, null, e.target.parentElement.dataset.category);
        renderSummary(mode, getStateCallback)
        updateControls(isSubmittingCallback);
    })
}

function initCancelChangesProtection(hasUnsavedChangesFunc) {
    /** UNSAVED CHANGES PROTECTION */
    window.addEventListener("beforeunload", (e) => {
      if (!hasUnsavedChangesFunc()) return;
    
      e.preventDefault();
    
      e.returnValue = "";
    });
}

function initMobileStepper(saveListCallback, isSubmittingCallback) {
    const primaryButtonEl = uiElements.stepperPrimaryButton;
    const secondaryButtonEl = document.getElementById('step-secondary-button');

    const mainEl = uiElements.main;
    const numSteps = parseInt(getComputedStyle(mainEl).getPropertyValue('--num-steps'));
    let currentStep = parseInt(getComputedStyle(mainEl).getPropertyValue('--current-step'));

    const updateStep = () => mainEl.style.setProperty('--current-step', currentStep);

    primaryButtonEl.addEventListener('click', () => {
        if(currentStep < numSteps - 1) {
            ++currentStep;
            updateStep();
            renderButtons();
            renderStepIndicator();
        } else { // save was hit
            saveListCallback();
        }
    });

    secondaryButtonEl.addEventListener('click', () => {
        if(currentStep > 0) {
            --currentStep;
            updateStep();
            renderButtons();
            renderStepIndicator();
        }
    });

    function renderStepIndicator() {
        const stepIndicatorDots = document.querySelectorAll('.step-indicator .dot');
        stepIndicatorDots.forEach(dot => dot.classList.remove('active'));
        stepIndicatorDots[currentStep].classList.add('active');
    }

    function renderButtons() {
        const primaryLabels = Array.from(document.querySelectorAll('#step-primary-button span'));
        const secondaryLabels = Array.from(document.querySelectorAll('#step-secondary-button span'));

        primaryLabels.forEach(label => label.classList.remove('current'));
        secondaryLabels.forEach(label => label.classList.remove('current'));
        primaryLabels[currentStep].classList.add('current');
        secondaryLabels[currentStep].classList.add('current');

        // if on step 3, check if list is empty/no name, and if so - disable button
        if(currentStep === numSteps - 1) {
            if(isSubmittingCallback()) {
                primaryButtonEl.disabled = false;
            } else {
                primaryButtonEl.disabled = true;
            }    
        } else {
            primaryButtonEl.disabled = false;
        }

        // if on step 0, disable secondary
        if(currentStep === 0) {
            secondaryButtonEl.classList.add('invisible');
        } else {
            secondaryButtonEl.classList.remove('invisible');
        }
    }
}

/** when name of list changes, change the list name heading in mobile view */
function initChangeListNameHandler(isSubmittingCllbk) {    
    commonElements.listNameInput.addEventListener('input', (e) => {
        uiElements.reviewListName.innerText = e.target.value;
        updateControls(isSubmittingCllbk);

        // in mobile view, allow Continue only if name is not empty

    });
}


function renderCheckboxChange(isChecked, productId, name, productCategory) {
    const selectedProductsCategories = uiElements.selectedProductsList.querySelectorAll(':scope>li'); // get direct children li elements

    // find the relevant category li
    let selectedProductsCategory = Array.from(selectedProductsCategories).find(i => i.getAttribute('data-category-name') === productCategory);

    if(isChecked) { // case added
        let selectedProductsCategoryListEl;

        // if there's not such category yet in the selected list, create it
        if(selectedProductsCategory === undefined) {
            // clone the template "selected-list-category-template"
            selectedProductsCategory = document.getElementById("selected-list-category-template").content.cloneNode(true).querySelector('li');
            selectedProductsCategory.setAttribute('data-category-name', productCategory);
            selectedProductsCategory.querySelector('h3').innerText = productCategory;
            // add it to the top-level <ul>
            uiElements.selectedProductsList.appendChild(selectedProductsCategory);
        }

        selectedProductsCategoryListEl = selectedProductsCategory.querySelector('ul');
        // clone the template, and append the child to the category list
        const selectedProductItem = document.getElementById("selected-product-item-template").content.cloneNode(true).querySelector('li');
        
        selectedProductItem.setAttribute('data-category', productCategory);
        selectedProductItem.setAttribute('data-product-id', productId);
        selectedProductItem.querySelector('.selected-product-name').innerText = name;

        selectedProductsCategoryListEl.appendChild(selectedProductItem);

    } else { // case removed
        const selectedProductsCategoryListEl = selectedProductsCategory.querySelector('ul');
        
        Array.from(selectedProductsCategoryListEl.children).forEach(child => {
            if(child.getAttribute('data-product-id') === productId) {
                selectedProductsCategoryListEl.removeChild(child);
            }
        });

        // in case it's last item in category, remove category
        if(Array.from(selectedProductsCategoryListEl.children).length === 0) {
            uiElements.selectedProductsList.removeChild(selectedProductsCategory); 
        }
    }
}