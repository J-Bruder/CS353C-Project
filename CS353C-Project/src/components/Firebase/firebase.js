  /** Import firebase from the library installed earlier 
  (npm install firebase), and then use it within a new Firebase 
  class to initialize firebase with the configuration:import app 
  from 'firebase/app'. Note:Firebase should only be initialized 
  once in the application (;*/

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import dotenv from 'dotenv';//API Key Validation
dotenv.config();
/**configuration from your Firebase project’s dashboard 
    on firebase website*/
  const config = {


  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    //apiKey: "AIzaSyA4G_6jDii2WLvN0IC2OszyKYhLHdK-sTs",
    //authDomain: "cs353-group-project-3b696.firebaseapp.com",
    //databaseURL: "https://cs353-group-project-3b696.firebaseio.com",
    //projectId: "cs353-group-project-3b696",
    //storageBucket: "cs353-group-project-3b696.appspot.com",
    //messagingSenderId: "494091671530"
  };

  class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }
  /**define all the authentication functions as class methods
  These will serve our communication from the Firebase 
  class to the Firebase API*/

   // *** Auth API ***

   /**sign up function (registration) takes email and password 
   parameters for its function signature and uses an official Firebase 
   API endpoint to create a user:*/

   doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    //login/sign-in function, which takes email and password parameters, as well
   doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

   doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

   doSignOut = () => this.auth.signOut();

   //authentication methods to reset and change a password for an authenticated user
   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

   doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

      // *** User API ***
  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

    
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

    // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');
  }

  export default Firebase;