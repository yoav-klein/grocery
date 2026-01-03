
const allCheckboxes = document.querySelectorAll('.product-checkbox');

const selectedProductsListEl = document.getElementById('selected-list');

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
                console.log("CREATING SELECTED PRODUCTS CATEGORY");
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


/* MOBILE STEPPER */

const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');

const mainEl = document.querySelector('main');
const numSteps = parseInt(getComputedStyle(mainEl).getPropertyValue('--num-steps'));
let currentStep = parseInt(getComputedStyle(mainEl).getPropertyValue('--current-step'));

const render = () => mainEl.style.setProperty('--current-step', currentStep);
        
nextButton.addEventListener('click', () => {
    if(currentStep < numSteps - 1) {
        ++currentStep;
        render();
    }
});

prevButton.addEventListener('click', () => {
    if(currentStep > 0) {
        --currentStep;
        render();
    }
});

