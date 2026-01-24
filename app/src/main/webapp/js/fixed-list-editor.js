

const allCheckboxes = document.querySelectorAll('.product-checkbox');
const selectedProductsListEl = document.getElementById('selected-list');

const listNameHeadingEl = document.querySelector('#selected-section h1');

/* CONFIRMATION AND ERROR MODALS ELEMENTS */
const confirmationDialogEl = document.getElementById('confirmation-dialog');
const errorDialogEl = document.getElementById('error-dialog');
const errorMessageEl = document.getElementById('error-message');
const successListNameSpanEl = document.getElementById('success-list-name');
const cancelDialogEl = document.getElementById('cancel-dialog');

const saveButtonEl = document.getElementById('save-button');
saveButtonEl.addEventListener('click', saveList);

const cancelButtonEl = document.getElementById('cancel-button');
cancelButtonEl.addEventListener('click', () => {
    // if(!hasUnsavedChanges) {
        window.location.replace(`${window.location.origin}/app/tenant/${tenantId}`);
    //} else {
    //    cancelDialogEl.showModal();
    //}
});


window.addEventListener("beforeunload", (e) => {
  if (!hasUnsavedChanges) return;

  e.preventDefault();
  e.returnValue = "";
});

allCheckboxes.forEach(input => {
    
    input.addEventListener('change', (e) => {
        // get the name and category of clicked checkbox
        const name = e.target.nextElementSibling.innerText;
        const productCategory = e.target.getAttribute('data-category');
        const productId = e.target.getAttribute('id');
        
        if(e.target.checked) {
            handleChangeInUI('checked', productId, name, productCategory)
        } else {
            handleChangeInUI('unchecked', productId, name, productCategory)
        }

        itemsCheckboxHandler(e.target.checked, productId, name, productCategory);
        respondToChange();
    });
});


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


/** HANDLE CHANGES IN THE SELECTED PRODUCTS PANE */
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