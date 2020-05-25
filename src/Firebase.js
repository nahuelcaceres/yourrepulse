import firebase from 'firebase';

const settings = {};

const config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID
}

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;