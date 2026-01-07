
const csrfHeaderName = document.querySelector('meta[name="_csrf_header"]')
const csrfToken = document.querySelector('meta[name="_csrf"]')

const addProductButtonEl = document.getElementById("add-product-button");
const addProductDialogEl = document.getElementById("add-product-dialog");

addProductButtonEl.addEventListener('click', () => {
    addProductDialogEl.showModal();
})
