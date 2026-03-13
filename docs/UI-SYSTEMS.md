# UI Systems
---

## Strcuture

We need a structure for our UI code, like certain patterns and rules that we follow so the code is maintaible and predictable.

So the structure is as follows:
* HTML file for each page of course.
* CSS file for:
    * each HTML page
    * the layout
    * components - dialogs, categories - things that are reusable across pages
* JS file for:
    * each HTML file
    * the layout
    * components - dialogs, categories.

### Classes



## Form Dialog System

Every form dialog is structured like this:
* Header
    * Title
    * optional helper text
    * close button on the top-left (or top-right for hebrew)
    * Takes a fixed amount of height
* Body
    * Error banner for form-level errors (duplicate, server error)
    * Input fields are stacked (label -> input -> validation)
* Footer
    * Left - secondary action
    * Right - primary action

I use the system I developed in the `frontend` repo, see it there.

## Color system

There are 3 levels of CSS variables that control colors.
1. Raw colors - variables that store raw colors like `--color-gray-100`
2. Roles - These are variables that denote a certain role, they should not be used directly in the CSS classes, like `--color-border-subtle`
3. Domain tokens - these are the variables that we actually use in the CSS classes, for example `--color-card-background` 

Each level is using the level above it. This will help us make things more consistent and to coordinate colors between different parts of the UI.

## Kebab menus system

We have a system for kebab menus. It's in the `kebab-menus.css` and `kebab-menus.js` files. It defines an interface to easily create kebab menus in a page.

