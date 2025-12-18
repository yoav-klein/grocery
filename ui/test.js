

const quantites = document.querySelectorAll('.quantity');

const formEl = document.getElementById("list");

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const l = [];
    quantites.forEach(element => {
        const curr = {};
        curr.id = element.id.replace('product-', '');
        curr.quantity = element.value;
        l.push(curr);
    });

    console.log(JSON.stringify(l));

});
