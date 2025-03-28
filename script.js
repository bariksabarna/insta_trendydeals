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
            rows = rows.filter(row => row.length >= 3 && row[1] && row[2]); // Ensure at least 3 columns exist

            rows.forEach(row => {
                let link = row[1].replace(/"/g, '').trim(); // Remove quotes and spaces
                let imageUrl = row[2].replace(/"/g, '').trim(); // Remove quotes and spaces
                
                if (link.startsWith("http") && imageUrl.startsWith("http")) { // Validate both link and image
                    allLinks.push({ number: index, url: link, image: imageUrl });
                    index++;
                }
            });

        } catch (error) {
            console.error(`Error fetching ${sheet}:`, error);
        }
    }

    // Display Links and Images
    container.innerHTML = "";
    if (allLinks.length === 0) {
        container.innerHTML = "No links found.";
    } else {
        allLinks.forEach(link => {
            let div = document.createElement("div");
            div.className = "link-item";
            div.innerHTML = `
                <b>${link.number}.</b> 
                <a href="${link.url}" target="_blank">${link.url}</a> <br>
                <img src="${link.image}" alt="Image ${link.number}" class="link-image">
            `;
            container.appendChild(div);
        });
    }
}

// Run function when page loads
fetchLinks();