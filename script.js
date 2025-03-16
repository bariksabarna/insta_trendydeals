const sheetID = "1ugyGvPqTMreLamaYQkqVh6WFcNx3ir6jK4wyqFs1ehs"; // Your Google Sheet ID
const sheetNames = ["Sheet1", "Sheet2", "Sheet3"]; // Add sheet names here

async function fetchLinks() {
    let container = document.getElementById("links-container");
    container.innerHTML = "Loading...";

    let allLinks = [];
    let index = 1;

    for (let sheet of sheetNames) {
        let url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheet}`;

        try {
            const response = await fetch(url);
            const data = await response.text();
            let rows = data.split("\n").map(row => row.split(","));

            // Ensure CSV is formatted correctly and has data
            rows = rows.filter(row => row.length >= 2 && row[1]); // Ensure at least 2 columns exist
            
            rows.forEach(row => {
                let link = row[1].replace(/"/g, '').trim(); // Remove quotes and spaces
                if (link.startsWith("http")) { // Validate it's a proper link
                    allLinks.push({ number: index, url: link });
                    index++;
                }
            });

        } catch (error) {
            console.error(`Error fetching ${sheet}:`, error);
        }
    }

    // Display Links
    container.innerHTML = "";
    if (allLinks.length === 0) {
        container.innerHTML = "No links found.";
    } else {
        allLinks.forEach(link => {
            let div = document.createElement("div");
            div.className = "link-item";
            div.innerHTML = `<b>${link.number}.</b> <a href="${link.url}" target="_blank">${link.url}</a>`;
            container.appendChild(div);
        });
    }
}

// Run function when page loads
fetchLinks();
