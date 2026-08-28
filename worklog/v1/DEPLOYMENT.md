# Deployment
---

Obstacles I ran into:
* Certificate - in order to register a Redirect URI in google you must serve on HTTPS, so you must have a certificate (V)
* Properties file in different locations (V)
* There's the `/app` part in the URL, we need to get rid of it in production (V)
* Initialization of the database schemas
* Change terraform code - allows access to 443, attach certificate to alb (V)