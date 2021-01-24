var admin = require("firebase-admin");

// export GOOGLE_APPLICATION_CREDENTIALS="/Users/rmyagchenkov/Desktop/Insta project/fb-instaapp-firebase-adminsdk-r9x6t-437faf32c2.json"

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export default admin;
