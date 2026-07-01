# Deployment
---

Obstacles I ran into:
* Certificate - in order to register a Redirect URI in google you must serve on HTTPS, so you must have a certificate
* Properties file in different locations
* There's the `/app` part in the URL, we need to get rid of it in production
* Initialization of the database schemas
* Redirect URI in the ClientRegistration