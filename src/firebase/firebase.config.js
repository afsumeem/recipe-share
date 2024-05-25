import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyB4Ihrwi88UW7sRjHhaUV4-WJNeVw7Q1QY",
  authDomain: "event-endeavors.firebaseapp.com",
  projectId: "event-endeavors",
  storageBucket: "event-endeavors.appspot.com",
  messagingSenderId: "267665243824",
  appId: "1:267665243824:web:d3aa20b12333508e028575",
};

const app = initializeApp(firebaseConfig);

export default app;
