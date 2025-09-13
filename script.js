// app.js

// (unchanged imports and Firebase initialization)

async function fetchAndDisplayStuckSongs() {
  try {
    const stuckSongsCollectionRef = collection(db, "stuckSongs");
    const q = query(stuckSongsCollectionRef, orderBy("Date", "desc"));

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
        // Start building the table HTML
        displayHtml += `
            <style>
                /* Basic table styling for better readability - BORDERS REMOVED! */
                table {
                    width: 100%;
                    /* border-collapse: collapse; - Can be kept or removed, doesn't affect borders if they're 'none' */
                    margin-top: 20px;
                    border: none; /* Explicitly remove table border */
                }
                th, td {
                    border: none; /* Explicitly remove cell borders */
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
            </style>
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

// (unchanged call to fetchAndDisplayStuckSongs)
