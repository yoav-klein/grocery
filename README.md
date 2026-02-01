# Plan
---

## Where Im at now

* Validation in controllers. Validate all forms and input that comes from UI.


## Milestones

### 1 - MVP

*Current list page*: displays all the items to currently buy. The user can check items he bought, and the items are removed from the list. He can also add items ad-hoc.
This page is updated on the fly using SSE events.

*Fixed list page*: displays a fixed list, where the user can specify how much to add to the list from each item, and hit "Submit".

*Catalog page*: displays all the products the user can think about. From this the user can assemble fixed lists

*Add fixed list page*: allows the user to create new fixed lists.

*Manage Tenant*: A tenant management page

*Layout*: A menu on the side, and a header on top. User icon with "Logout", language selection

Multi-language: The application is multi-language, the user can select Hebrew or English

### 2 - Item history
Each item can be clicked, and a dialog is opened that shows the history of the item: 
* Added by
* Added at
* Marked bought by+at
* Comments

### 3 - Mark check
When a user marks an item as checked, the item is not just deleted from the list, but rather it's displayed with a line crossing it, and is kept for a retention period. This allows users to see that an item was checked by another user.


## Tasks
* User icon
* Localization - languages

## Leftovers
---
* SSE edge cases
* Error handling - in Edit Fixed List - add a validator in the backend that validates the EditFixedListRequest:
    * Check that either add/remove lists are not empty
    * Check that list name has changed
* Events
    * ItemUpdatedEvent - when an item's quantity is updated.



## Improvements
---
* Edit fixed list
    * When user removes products - line crosses the product instead of it deleted from the selected products pane
    * When user adds produts - they're highlighted in the selected products pane
    * In the summary pane - show numbers of added and removed
* Current List
    * Autocomplete in Add new item


# Error Handling Branch
---
## What I want
* Error handling for API calls - result in RFC 9457, handled by JS in the frontend
* Error handling for UI calls - result in @ResponseCode exceptions that are translated to status codes
* Default error pages for 500, 404, 401, 403. Already started, but consider changing them to be templates and not static HTMLs.

## What to do
* Go over all the services/repositores and make sure that all possible exceptions are handled
* Go over all controllers and make sure there's validations for all POST/PUT requests

## NOTES
* Repository exceptions are translated to 500


## Debates
* Forms - full page reload or AJAX? full page reload is simpler - no JS.  On the other hand - handling modal forms with simple full page reload is messier. HTMX is an option.

# Products API branch
---
## What I want
* Move products POST and DELETE methods to a REST API
