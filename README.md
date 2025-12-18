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
* Mark check - when a user marks an item as checked, it is still there for a while, so it's apparent that someone bought it.

## Tasks
* Error handling in backend
* UI polishing
* Localization - languages


## Leftovers
---
* Error handling in TenantRepository
* Error handling in Repositories
* SSE edge cases
* Localization of items in JavaScript 