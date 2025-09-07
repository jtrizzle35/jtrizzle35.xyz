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
 
  db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              console.log("New message: ", change.doc.data());
          }
          // ... handle modified or removed messages
      });
  });


import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';
// ... (assuming you have 'app' initialized and 'db' obtained from getFirestore(app) )

// --- YOU ONLY NEED TO EDIT THIS LINE ---
const stuckSongsCollectionRef = collection(db, "stuckSongs"); // Change "users" to "stuckSongs"!
// ------------------------------------

// Get all documents in the 'stuckSongs' collection once
getDocs(stuckSongsCollectionRef) // Use your new reference here
  .then((querySnapshot) => {
    const allStuckSongsData = []; // Array to store all song data as JS objects

    // Loop through each song document found
    querySnapshot.forEach((docSnap) => {
      // Get the data for the current song document as a JavaScript object
      const songData = docSnap.data();
      allStuckSongsData.push(songData);

      console.log(`${docSnap.id} => `, songData); // docSnap.id will be the document ID
    });

    console.log("All stuck songs as an array of JavaScript objects:", allStuckSongsData);

    let displayHtml = "<h2>My Stuck Songs:</h2>";
    if (allStuckSongsData.length > 0) {
        displayHtml += "<ul>";
        allStuckSongsData.forEach(song => {
            // Accessing the specific fields: Artist, Date, Song
            // Using || 'N/A' as a fallback in case a field is missing
            const artist = song.Artist || 'Unknown Artist';
            const date = song.Date ? song.Date.toDate().toLocaleDateString() : 'Unknown Date'; // Assuming 'Date' is a Firestore Timestamp
            const songTitle = song.Song || 'Unknown Song';

            displayHtml += `
                <li>
                    <strong>Song:</strong> ${songTitle}<br>
                    <strong>Artist:</strong> ${artist}<br>
                    <strong>Date Added:</strong> ${date}
                </li>
            `;
        });
        displayHtml += "</ul>";
    } else {
        displayHtml += "<p>No stuck songs found yet!</p>";
    }
    document.getElementById('data-display').innerHTML = displayHtml;
  })
  .catch((error) => {
    console.error("Error getting stuck songs:", error);
    document.getElementById('data-display').innerText = "Error loading stuck songs.";
  });
