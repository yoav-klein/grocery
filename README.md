# Plan
---

I want to plan my progress, split the work into manageable tasks and define the boundaries between them.

So first off we have the frontend and the backend. We need to set the interface between them in a clear way so that it'll be easy to work on one side
without breaking the other side.

So I want to define the pages I have in the frontend, and for each page:
* What are the model objects needed to render it
* What are the API endpoints it uses (forms/links/REST API calls)

So for this I need to define the UI in a clear fashion - what pages I have, what controls are in each page.


## Pages
* Tenants page
* Tenant management page
* Tenant working page

### Tenants page 
Endpoint: `/tenants`

A card for each tenant with:
* Tenant image
* Tenant name

Model: 
* `allTenants: List<TenantView>`
* `newTenant: TenantDto`

Links: 
* A card is a link to connect to the tenant `/tenants/<tenantId>/connect`

Forms:
* A `Add tenant` form (Modal) - opens a modal in Javascript. The user fills in the name of the tenant, an image, and `Create` button sends the form to `POST /tenants`. Redirects to tenants page.

### Tenant management page
Endpoint: `/tenant/<tenantId>/management`

* A list of members (kick-out member, promote, demote)
* A list of pending invitations
* Invite member
* Leave tenant

Model:
* `allMembers: List<TenantMember>`
* `allInvitations: List<Invitation>`
* `invitation: InvitationDto`

Links/Forms:
* Leave tenant - `DELETE /<tenantId>/membership/leave`
* Delte tenant - `DELETE /<tenantId>`
* Invite user - `POST /<tenantId>/invite`

### Working page - "Current List"
Endpoint: `/tenant/<tenantId>`

* A List of all current items
* A form to add a new item ad-hoc

Model:
* `allItems` - all current items
* `newItem` - new item form


## Features
* Delete list (V)
* Edit list
    * List name is disabled, and there's a edit button next to it that enables it
    * Products currently in list are shown bold and in the "selected products" pane
    * when user clicks on a product that's in the list, it's removed
    * when user clicks on a product that's not in the list, it's added
    * user can change name of list
    * 
* Mark check - when a user marks an item as checked, it is still there for a while, so it's apparent that someone bought it.
* Current list item history - a user clicks on an item in the current list page, and a popup pops with a small chat and history

## Tasks
* Edit list
    * UI is pretty much done (not pretty though)
    * Implement the controller method and call to it in the frontend (V)
* Error handling in UI for fetch requests
* Error handling in PRoducts and Current List page.
* Error handling in backend
* User icon
* Localization - languages

## Leftovers
---
* Error handling in TenantRepository
* Error handling in Repositories
* SSE edge cases
* Localization of items in JavaScript
* How do you handle paths all over the application?

## Improvements
---
* Edit fixed list
    * When user removes products - line crosses the product instead of it deleted from the selected products pane
    * When user adds produts - they're highlighted in the selected products pane
    * In the summary pane - show numbers of added and removed