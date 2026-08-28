# Backlog
---

## To Do
* Internationalization
* Error pages
* Fixed lists - when pressing "Add", spinner
* Add hoc adding of products in Add Fixed List
* Default set of products in tenant
* Products page - after adding a product, redirect to ?success in order to display a toast:
```
const params = new URLSearchParams(location.search);
if (params.get('success') === '1') {
  showToast('Success');
  params.delete('success');
  const newUrl = location.pathname + (params.toString() ? '?' + params.toString() : '') + location.hash;
  history.replaceState({}, '', newUrl);
}
```

## Doing
* UI refactoring


## Done
* Logout (V)
* Login page with Google icon (V)
* Prettify invitation page (V - still needs touch)
* My tenants page
    * Error handling in create new tenant (validation) - V
* Confirmation dialogs (V)
* Manage tenant - confirmation for deleting user (V)
* In fixed list - if no item is added - disable jjbutton (V)

