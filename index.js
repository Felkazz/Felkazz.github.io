const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

function convertDateToString(date) {
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

async function getLastUpdateDate(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const date = new Date(json[0].commit.author.date);
        return convertDateToString(date);
    } catch (error) {
        console.log(error.message);
    }
}

function updateDate(elementID, dateString) {
    document.getElementById(elementID).textContent = `Last updated ${dateString}`;
}

document.addEventListener("DOMContentLoaded", () => {
    getLastUpdateDate("http://thundermugen.com/last-updated.php").then(dateString => {
        updateDate("thunder-mugen", dateString);
    });
    getLastUpdateDate("https://api.github.com/repos/Felkazz/Boosted-Survivors-Upgrades/commits").then(dateString => {
        updateDate("boosted-survivors-upgrades", dateString);
    });
    getLastUpdateDate("https://api.github.com/repos/Felkazz/pokemon-sleep-tier-list/commits").then(dateString => {
        updateDate("pokemon-sleep-tier-list", dateString);
    });
});