

const buttons = document.querySelectorAll(".item-number__button");

for(const button of buttons) {
    button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-item");
        const sign = e.target.textContent;
        const input = document.getElementById(id);
        const currVal = Number(input.value);
        let newVal;
        newVal = sign == '+' ? currVal + 1 : sign == '-' ? currVal - 1 : input.value;
        input.value = newVal < 0 ? 0 : newVal;
        
    });
}

