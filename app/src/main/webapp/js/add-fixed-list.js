
const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]')
const csrfToken = document.querySelector('meta[name="_csrf"]')

const allCheckboxes = document.querySelectorAll('.product-checkbox');
const selectedProductsListEl = document.getElementById('selected-list');
const listNameInputEl = document.getElementById("listName");
const listNameHeadingEl = document.querySelector('#selected-section h1');


const selectedProducts = new Array();

allCheckboxes.forEach(input => {
    
    input.addEventListener('change', (e) => {
        const selectedProductsCategories = selectedProductsListEl.querySelectorAll('li');

        const name = e.target.nextElementSibling.innerText;
        const productCategory = e.target.getAttribute('data-category');

        const selectedProductsCategory = Array.from(selectedProductsCategories).find(i => i.getAttribute('data-category-name') === productCategory);

        if(e.target.checked) {
            let selectedProductsCategoryListEl;

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
            selectedProducts.push(e.target.getAttribute('id'));
        } else {
            const selectedProductsCategoryListEl = selectedProductsCategory.querySelector('ul');
            
            Array.from(selectedProductsCategoryListEl.children).forEach(child => {
                if(child.innerText === name) {
                    selectedProductsCategoryListEl.removeChild(child);
                }
            });
            if(selectedProductsCategoryListEl.hasChildNodes()) { console.log(selectedProductsCategoryListEl.hasChildNodes) } else { selectedProductsListEl.removeChild(selectedProductsCategory); }
        }
    });
});

/* SAVE BUTTON */

document.getElementById('save-button').addEventListener('click', saveList);

/* MOBILE STEPPER */

const nextButton = document.getElementById('step-primary-button');
const prevButton = document.getElementById('step-secondary-button');

const mainEl = document.querySelector('main');
const numSteps = parseInt(getComputedStyle(mainEl).getPropertyValue('--num-steps'));
let currentStep = parseInt(getComputedStyle(mainEl).getPropertyValue('--current-step'));

const render = () => mainEl.style.setProperty('--current-step', currentStep);
        
nextButton.addEventListener('click', () => {
    
    if(currentStep < numSteps - 1) {
        ++currentStep;
        render();
        setButtons();
    } else { // save was hit
        saveList();
    }
});

prevButton.addEventListener('click', () => {
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
}

/* CHANGE NAME OF LIST */


listNameInputEl.addEventListener('change', (e) => {
    listNameHeadingEl.innerText = e.target.value;
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
    responsePromise.then(resp => console.log(`OK: ${resp.ok}`)).catch(e => console.log(`error: ${e}`));

}

