const sheetID = "1ugyGvPqTMreLamaYQkqVh6WFcNx3ir6jK4wyqFs1ehs"; // Your Google Sheet ID
const sheetNames = ["Sheet1", "Sheet2", "Sheet3"]; // Add new sheet names here anytime!

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
            rows.shift(); // Remove headers if they exist

            rows.forEach(row => {
                if (row[1]) {
                    allLinks.push({ number: index, url: row[1].replace(/"/g, '') });
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

fetchLinks();
