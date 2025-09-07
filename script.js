  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
  import { getAuth } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js';
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB5KLbJp-646Rp-VxGu5L8ZXyYSNZrRPQc",
    authDomain: "jtrizzle35-c4885.firebaseapp.com",
    projectId: "jtrizzle35-c4885",
    storageBucket: "jtrizzle35-c4885.firebasestorage.app",
    messagingSenderId: "245297230292",
    appId: "1:245297230292:web:a3daf36c7ad139ee656641",
    measurementId: "G-FN8V48ZRZP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';
  // ... other imports

  const db = getFirestore(app); // This 'db' object is your Firestore instance!

  const myCollectionRef = db.collection("stuckSongs"); // Reference to a collection

  myDocumentRef.get()
    .then((docSnap) => {
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    })
    .catch((error) => console.log("Error getting document:", error));

