
## User Management 

## Later
---
* Invitation expiry 
* Shorten the invitation link (base64 the uuid)


## For Launch
---

### Error handling
There are several places where things can go wrong:
* Invitation creation - unexpected error can occur, 500 (V)
    * Have a popping toast that says "Something is wrong, try again" (V)
* Invitation accept - user already in tenant, invitation expired, invitation already accepted. (V)
