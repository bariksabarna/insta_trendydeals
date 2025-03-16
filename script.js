const CSV_URL = "https://docs.google.com/spreadsheets/d/1ugyGvPqTMreLamaYQkqVh6WFcNx3ir6jK4wyqFs1ehs/gviz/tq?tqx=out:csv";

async function fetchLinks() {
    try {
        let response = await fetch(CSV_URL);
        let data = await response.text();
        let rows = data.split("\n").map(row => row.split(","));

        let list = document.getElementById("link-list");
        list.innerHTML = ""; // Clear existing content

        rows.slice(1).forEach(([num, url]) => { // Skip header
            let li = document.createElement("li");
            li.innerHTML = `<a href="${url}" target="_blank">${num}. ${url}</a>`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching CSV:", error);
        document.getElementById("link-list").innerHTML = "<li>Error loading links.</li>";
    }
}

fetchLinks();
