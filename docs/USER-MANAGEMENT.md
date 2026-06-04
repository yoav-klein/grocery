# User Management
---

This epic will focus on user and tenant management.
The user management schema is based on this example: https://github.com/yoav-klein/java/tree/main/Spring/11-spring-security/12-user-management-advanced


The result we want to achieve eventually is this:
* Multi tenant application, each tenant includes users.
* Each user can be a member of several tenants.
* Users are authenticated using their Google account (possibly expanding to other IDPs down the road)
* Logout - a user can logout of course


Technically:
Database structure:
* `users` table - id (pk), email (unique), display name, picture
* `user_identity` - user_id (foreign key), idp (google), idp_sub. user_id+idp - key.
* `tenant_user` - tenant_id, user_id (foreign key)
* `invitations` - id, tenant_id, inviting_user_id (foreign key)

Invitations: When a user wants to invite someone, we create an invitation entity in the DB, and an invitation link. The user can share this invitation link with whoever he wants. The link includes the invitation id, so when someone clicks on the link, we know that this is the user to join to the tenant.

