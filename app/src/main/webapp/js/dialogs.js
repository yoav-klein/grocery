/** OPEN MODALS */

const openModalButtons = document.querySelectorAll('[data-open-dialog]');
Array.from(openModalButtons).forEach(button => {
    const modalId = button.getAttribute('data-dialog-id');
    button.addEventListener('click', () => {
        document.getElementById(modalId).showModal();
    });
});

/* CLOSE FORM DIALOG */
const closeFormButtons = document.querySelectorAll('.js-close-dialog-button');
Array.from(closeFormButtons).forEach(button => {
    const formDialog = button.closest('.form-dialog');
    const confirmDialog = button.closest('.confirmation-dialog');

    if(formDialog) {
        button.addEventListener('click', () => {
            resetAndCloseDialog(formDialog);
        });
    }
    if(confirmDialog) {
        button.addEventListener('click', () => {
            confirmDialog.close();
        });
    }
});

function resetAndCloseDialog(dialog) {
    dialog.dataset.state = '';
    clearErrors(dialog);

    const form = dialog.querySelector('form');
    form.reset();
    dialog.close();
}

function clearErrors(dialog) {
    // clear field validation errors
    const fieldValidationErrorEls = dialog.querySelectorAll('.field-validation-error');
    Array.from(fieldValidationErrorEls).forEach(p => p.innerText = '');

    // clear error class from divs with 'error' class
    const errorFields = dialog.querySelectorAll('.field.error');
    errorFields.forEach(el => el.classList.remove('error'));

    // clear error banner
    const formLevelErrorBanner = dialog.querySelector('.dialog-error-banner');
    if(formLevelErrorBanner) {
        formLevelErrorBanner.innerText = '';
        formLevelErrorBanner.classList.remove('show');
    }
}

/** EVENTS */

const dialogElements = document.querySelectorAll('.js-form-dialog');


Array.from(dialogElements).forEach(dialog => {
    /* success submit */
    dialog.addEventListener('submitsuccess', () => {
        dialog.dataset.state = '';
        resetAndCloseDialog(dialog);
    });
    
    /* submitting */
    dialog.addEventListener('submitting', () => {
        console.log("SUBMITTING");
        dialog.dataset.state = "submitting";
        clearErrors(dialog);
    });

    /* submit error */
    dialog.addEventListener('submiterror', (e) => {
        dialog.dataset.state = 'error';
        
        const errorDetail = e.detail;
        
        if(errorDetail.type === 'form') {
            const errorMessage = errorDetail.message;
            const errorBannerEl = dialog.querySelector('.dialog-error-banner');
            errorBannerEl.innerText = errorMessage;
            errorBannerEl.classList.add('show');
        } else if(errorDetail.type === 'field') {
            errorDetail.fieldErrors.forEach(error => {
                const field = error.field;
                const reason = error.reason;

                const inputEl = dialog.querySelector(`input[name="${field}"]`);
                // apply 'error' class to closest '.field'
                inputEl.closest('.field')?.classList?.add('error');

                const directErrorEl = dialog.querySelector(
                    `input[name="${field}"] ~ .field-validation-error`
                );

                if (directErrorEl) {
                    directErrorEl.innerText = reason;
                    return;
                }
                
                const validationFieldId = inputEl?.dataset?.validationFieldId;
                if (!validationFieldId) return;

                const fallbackErrorEl = document.getElementById(validationFieldId);
                if (!fallbackErrorEl) return;

                fallbackErrorEl.innerText = reason;

            });
        }

    });

});