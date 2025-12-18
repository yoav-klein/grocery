

const deleteCheckboxes = document.querySelectorAll('.delete-checkbox');
deleteCheckboxes.forEach((el) => {
    console.log('DELETE');
    el.addEventListener('change', (e) => {
        if(e.target.checked) { console.log(`${e.target.id} CHECKED`); } else { console.log(`UNCHECKED`); }        
    });
});

