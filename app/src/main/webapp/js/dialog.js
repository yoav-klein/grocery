
const newItemButtonEl = document.getElementById("new-item-button");
const closeDialogButtonEl = document.getElementById("close-dialog");
const dialogEl = document.querySelector("dialog");

newItemButtonEl.addEventListener("click", () => {
    dialogEl.showModal();
});

closeDialogButtonEl.addEventListener("click", () => {
    dialogEl.close();
});