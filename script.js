// app.js

// 1. Import all necessary functions from the SDKs (using consistent version 12.2.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
// If you want to use Analytics or Auth, import them with the consistent version:
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


// 2. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5KLbJp-646Rp-VxGu5L8ZXyYSNZrRPQc",
  authDomain: "jtrizzle35-c4885.firebaseapp.com",
  projectId: "jtrizzle35-c4885",
  storageBucket: "jtrizzle35-c4885.firebasestorage.app",
  messagingSenderId: "245297230292",
  appId: "1:245297230292:web:a3daf36c7ad139ee656641",
  measurementId: "G-FN8V48ZRZP"
};

// 3. Initialize Firebase (only once)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get your Firestore instance here

// If you want to use Analytics or Auth, initialize them:
// const analytics = getAnalytics(app);
const auth = getAuth(app);


// 4. Main function to fetch and display song data
async function fetchAndDisplayStuckSongs() {
  try {
    const stuckSongsCollectionRef = collection(db, "stuckSongs").orderBy("Date");
    const querySnapshot = await getDocs(stuckSongsCollectionRef); // Use await for cleaner async code

    const allStuckSongsData = [];
    querySnapshot.forEach((docSnap) => {
      const songData = docSnap.data();
      allStuckSongsData.push(songData);
      console.log(`Document ID: ${docSnap.id} => `, songData);
    });

    console.log("All stuck songs as an array of JavaScript objects:", allStuckSongsData);

    // Get the HTML element where you want to display the data
    const dataDisplayElement = document.getElementById('data-display');
    if (!dataDisplayElement) {
        console.error("Element with ID 'data-display' not found in HTML!");
        return; // Exit if the element isn't found
    }

    let displayHtml = "<h2>My Stuck Songs:</h2>";
    if (allStuckSongsData.length > 0) {
        displayHtml += "<ul>";
        allStuckSongsData.forEach(song => {
            const artist = song.Artist || 'Unknown Artist';
            // Assuming 'Date' is a Firestore Timestamp, convert it
            const date = song.Date && song.Date.toDate ? song.Date.toDate().toLocaleDateString() : 'Unknown Date';
            const songTitle = song.Song || 'Unknown Song';

            displayHtml += `
                <h3>  
                    <strong>${date}</strong>
                    ${artist}:
                    ${songTitle}</h3>
                </h3>
            `;
        });
        displayHtml += "</ul>";
    } else {
        displayHtml += "<p>No stuck songs found yet!</p>";
    }
    dataDisplayElement.innerHTML = displayHtml;

  } catch (error) {
    console.error("Error getting stuck songs:", error);
    const dataDisplayElement = document.getElementById('data-display');
    if (dataDisplayElement) {
        dataDisplayElement.innerText = "Error loading songs. Please check console for details.";
    }
  }
}

// 5. Call the function to start fetching and displaying songs
fetchAndDisplayStuckSongs();
