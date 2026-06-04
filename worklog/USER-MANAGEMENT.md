
## Backlog
* User icon and menu
* Logout
* Invitation prompt page - prettify
* Error handling
    * JavaScript
    * Backend
* Invitation expiry 
* Shorten the invitation link (base64 the uuid)

## Error handling
There are several places where things can go wrong:
* Invitation creation - unexpected error can occur, 500
    * Have a popping toast that says "Something is wrong, try again"
* Invitation accept - user already in tenant, invitation expired, invitation already accepted.
    * Taken care of