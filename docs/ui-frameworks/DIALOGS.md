# Dialogs framework
---


## Overview

We have a framework for form dialogs. What I mean by that is a system of CSS and JS code that allows you to write HTML that will automatically receive certain common core styles and functionality such as basic form layout, error handling, form state, etc.

There are 2 types of dialogs:
1. Form dialogs - where there are input fields that the user fills and sends to the backend.
2. Confirmation dialogs - to make sure a user wants to do a certain action.

All dialogs share a common minimum structure:
* Body - some text
* Footer - with primary and secondary action buttons

However, form dialogs are more detailed than confirmation dialogs, of course. A typical form dialog will have the following structure:
* Header
    * Title
    * optional helper text
    * close button on the top-left (or top-right for hebrew)
    * Takes a fixed amount of height
* Body
    * A list of input fields
        * Error banner for form-level errors (duplicate, server error)
        * Input fields are stacked (label -> input -> validation)
* Footer
    * Left - secondary action
    * Right - primary action

A confirmation dialog is simpler. Usually it has only a short text, and action buttons.

## Styles

There are basic styles that we want for all modal dialogs:
* A modal dialog should be centered in the middle of the page
* There is only a handful of different sizes for modal dialogs - small for confirmation, bigger for forms, but not much more.
* Flexbox, split to 2-3 sections.
* Buttons should be the same size all over the application.
* Paddings

But some styles we may want to leave to the user to do himself.

## Usage

In order to use the framework, you need 2 things:
1. Your HTML should obey the following set of rules and structure:
* A `<button>` with the attributes `data-open-dialog` and `data-dialog-id` pointing to the ID of the dialog to open. 
* The `<dialog>` element must be with the classes `form-dialog` and `js-form-dialog`.
* Optional - a `<header>` element. If so, must have 3 elements, see example.
* Optional - error banner. This is for form-level errors. Must be with the class `dialog-error-banner`.
* The form body - a div with class `form-dialog-body`. Inside, a div for each field. See example.
* Footer - class `form-dialog-footer`. See example.

2. When submitting the form, there is a certain response that you should expect from the backend. Additionally, 
the 

## Examples

An example of HTML snippet that uses the framework:
```
<button data-open-dialog data-dialog-id="add-item-dialog">+</button>
...
<dialog id="add-item-dialog" class="form-dialog js-form-dialog">
    <header>
        <div class="just-for-alignment"></div>
        <h2>New Item</h2>
        <button class="js-close-dialog-button close-dialog-button">&times;</button>
    </header>
    <form>
        <div class="dialog-error-banner">
            <p>Oops, seems that something's wrong on our end</p>
        </div>
        <div class="form-dialog-body">
            <div class="field">
                <label for="name">Name</label>
                <input name="name" class="long-input" type="text" id="name">
                <p class="field-validation-error"></p>
            </div>
            
            <div class="field">
                <label for="category" th:text="#{additem.label.category}">Category</label>
                <select id="category" name="category" class="long-input">
                    <option th:each="category : ${allCategories}" th:value="${category}" th:text="${category}">Vegetables</option>
                    <option th:remove="all">Fruits</option>
                    <option th:remove="all">Dairy</option>
                </select>
                <p class="field-validation-error"></p>
            </div>

            <div class="field">
                <label for="quantity">Quantity</label>
                <div class="quantity-control">
                    <input data-validation-field-id="quantity-validation-field" name="quantity" type="number" id="quantity" value="1">
                    <select name="quantityType">
                        <option th:each="type : ${allQuantityTypes}" th:value="${type}" th:text="${type}">Kg</option>
                        <option th:remove="all">Unit</option>
                    </select>
                </div>
                <p id="quantity-validation-field" class="field-validation-error"></p>
            </div>
        </div>

        <div class="form-dialog-footer">
            <div class="dialog-footer-controls">
                <button type="reset" class="js-close-dialog-button dialog-action-button dialog-secondary-action-button" name="cancel">Cancel</button>
                <button id="dialog-submit-button" type="submit" name="save" class="dialog-action-button dialog-primary-action-button">Submit</button>
            </div>
        </div>
    </form>
</dialog>
```