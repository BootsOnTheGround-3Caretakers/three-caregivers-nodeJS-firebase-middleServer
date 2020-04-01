# Backend for Three Caregivers Project
 With Daniel Amaya and @JerTay and others  on the #BootsOnTheGround team of Coronavirusarmy

## Documentation

The purpose is that this is the authentication server for the BatchMatch - 3 Caregivers project.

Browser/Flutter/JS-bootstrap  <---- firebase, JWT ---->   NodeJS  (auth and forward requests) <-----servery_key or limit to one ip ----->  BackendAPI with datastore.

This uses firebase for authentication. The user is authenticated on client pages (maybe served from here, maybe from firebase hosting). The firebase token (JWT) is then passed to the server along with the firebase-uid. The NodeJS server then authenticates it with firebase and, upon success, allows rights to write to the various databases.


