// app.js

// 1. Import all necessary functions from the SDKs (using consistent version 12.2.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
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

const auth = getAuth(app);


// 4. Main function to fetch and display song data
async function fetchAndDisplayStuckSongs() {
  try {
    const stuckSongsCollectionRef = collection(db, "stuckSongs");
    const q = query(stuckSongsCollectionRef, orderBy("Date", "desc")); // Order by 'Date' field, descending (newest first)

    const querySnapshot = await getDocs(q);

    const allStuckSongsData = [];
    querySnapshot.forEach((docSnap) => {
      const songData = docSnap.data();
      allStuckSongsData.push(songData);
      console.log(`Document ID: ${docSnap.id} => `, songData);
    });

    console.log("All stuck songs as an array of JavaScript objects:", allStuckSongsData);

    const dataDisplayElement = document.getElementById('data-display');
    if (!dataDisplayElement) {
        console.error("Element with ID 'data-display' not found in HTML!");
        return;
    }

    let displayHtml = "<h2>My Stuck Songs:</h2>";
    if (allStuckSongsData.length > 0) {
        // Start building the table HTML (NO INLINE STYLE TAG HERE)
        displayHtml += `
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Artist</th>
                        <th>Song</th>
                    </tr>
                </thead>
                <tbody>
        `;

        allStuckSongsData.forEach(song => {
            const artist = song.Artist || 'Unknown Artist';
            const date = song.Date && song.Date.toDate ? song.Date.toDate().toLocaleDateString() : 'Unknown Date';
            const songTitle = song.Song || 'Unknown Song';

            displayHtml += `
                    <tr>
                        <td>${date}</td>
                        <td>${artist}</td>
                        <td>${songTitle}</td>
                    </tr>
            `;
        });

        displayHtml += `
                </tbody>
            </table>
        `;
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

  }
}

// (unchanged call to fetchAndDisplayStuckSongs)
