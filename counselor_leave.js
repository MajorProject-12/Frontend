// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
// Get references to the buttons and containers
const newButton = document.querySelector(".new");
const recordsButton = document.querySelector(".records");
const container1 = document.querySelector(".container-1");
const container2 = document.querySelector(".container-2");
const monthYearSelector = document.querySelector(".month-year-selector");
const searchInput = document.querySelector('.search-container input');
const searchIcon = document.querySelector('.search-container .search-icon');

// Set the "New" button to the active state by default
newButton.classList.add("active");

// Add event listeners to the buttons
newButton.addEventListener("click", function () {
// Only proceed if container-1 is not already displayed
if (container1.style.display !== "block") {
    // Fade in container-1 and hide container-2
    container1.style.display = "block";
    container1.style.opacity = 0;
    fadeIn(container1);

    container2.style.display = "none";
    monthYearSelector.style.display = "none"; // Hide month-year-selector

    // Reset the search input
    searchInput.value = "";
    resetSearch();

    // Add active class to new button
    newButton.classList.add("active");
    recordsButton.classList.remove("active");
}
});

recordsButton.addEventListener("click", function () {
// Only proceed if container-2 is not already displayed
if (container2.style.display !== "block") {
    // Fade in container-2 and hide container-1
    container2.style.display = "block";
    container2.style.opacity = 0;
    fadeIn(container2);

    container1.style.display = "none";
    monthYearSelector.style.display = "flex"; // Show month-year-selector

    // Reset the search input
    searchInput.value = "";
    resetSearch();

    // Add active class to records button
    recordsButton.classList.add("active");
    newButton.classList.remove("active");
}
});

// Add event listeners to the search input and search icon
searchInput.addEventListener('keypress', function(event) {
if (event.key === 'Enter') {
    searchTable();
}
});

searchInput.addEventListener('input', function() {
if (searchInput.value.trim() === "") {
    resetSearch();
} else {
    searchTable();
}
});

searchIcon.addEventListener('click', function() {
searchTable();
});

// Function to fade in an element
function fadeIn(element) {
let opacity = 0;
const interval = setInterval(function () {
    if (opacity < 1) {
        opacity += 0.2;
        element.style.opacity = opacity;
    } else {
        clearInterval(interval);
    }
}, 50);
}

// Function to search the table
function searchTable() {
// Get the search keyword
const keyword = searchInput.value.trim().toLowerCase();

// Get all table rows
const tableRows = document.querySelectorAll('table tbody tr');

// Loop through each table row
tableRows.forEach(function(row) {
    // Get all table cells in the row
    const tableCells = row.querySelectorAll('td');

    // Initialize a flag to indicate if the row should be displayed
    let displayRow = false;

    // Loop through each table cell
    tableCells.forEach(function(cell) {
        // Get the text content of the cell
        const text = cell.textContent.trim().toLowerCase();

        // Check if the keyword is found in the cell text
        if (text.includes(keyword)) {
            displayRow = true;
        }
    });

    // Display or hide the row based on the flag
    if (displayRow) {
        row.style.display = 'table-row';
    } else {
        row.style.display = 'none';
    }
});
}

// Function to reset the search
function resetSearch() {
// Get all table rows
const tableRows = document.querySelectorAll('table tbody tr');

// Loop through each table row
tableRows.forEach(function(row) {
    // Display the row
    row.style.display = 'table-row';
});
}

// Populate the year dropdown with a range of years
const yearSelect = document.getElementById('yearSelect');
const currentYear = new Date().getFullYear();
const startYear = currentYear - 10; // 10 years ago

for (let year = currentYear; year >= startYear; year--) {
const option = document.createElement('option');
option.value = year;
option.textContent = year;
yearSelect.appendChild(option);
}

// Get references to the month and year dropdowns
const monthSelect = document.getElementById('monthSelect');

// Add event listeners to the month and year dropdowns
monthSelect.addEventListener('change', function() {
filterTable();
});

yearSelect.addEventListener('change', function() {
filterTable();
});

// Function to filter the table data
function filterTable() {
// Get the selected month and year
const selectedMonth = monthSelect.value;
const selectedYear = yearSelect.value;

// Get all table rows
const tableRows = document.querySelectorAll('table tbody tr');

// Loop through each table row
tableRows.forEach(function(row) {
    // Get the date cell in the row
    const dateCell = row.querySelector('td:nth-child(2)');

    // Get the date text from the date cell
    const dateText = dateCell.textContent;

    // Split the date text into day, month and year
    const dateParts = dateText.split('/');
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];

    // Initialize a flag to indicate if the row should be displayed
    let displayRow = true;

    // Check if the selected month is not "Select" and the month does not match
    if (selectedMonth !== "Select" && month !== selectedMonth) {
        displayRow = false;
    }

    // Check if the selected year is not "Select" and the year does not match
    if (selectedYear !== "Select" && year !== selectedYear) {
        displayRow = false;
    }

    // Display or hide the row based on the flag
    if (displayRow) {
        row.style.display = 'table-row';
    } else {
        row.style.display = 'none';
    }
});
}
// Function to set status background colors based on text content
function setStatusColors() {
// Get all elements with the class "status"
const statusElements = document.querySelectorAll(".status");

// Loop through each status element
statusElements.forEach(function (element) {
    const statusText = element.textContent.trim(); // Get the text content of the element

    // Set the background color based on the status text
    switch (statusText) {
        case "Pending":
            element.style.backgroundColor = "#007bff";
            break;
        case "Approved":
            element.style.backgroundColor = "#28a745";
            break;
        case "Rejected":
            element.style.backgroundColor = "#dc3545";
            break;
        default:
            // Default background color if the status text doesn't match
            element.style.backgroundColor = "#d1d5db";
            break;
    }
});
}

// Call the function to set status colors when the page loads
setStatusColors();

// Function to update status colors
function updateStatusColors() {
// Get all elements with the class "status"
const statusElements = document.querySelectorAll(".status");

// Loop through each status element
statusElements.forEach(function (element) {
const statusText = element.textContent.trim(); // Get the text content of the element

// Set the background color based on the status text
switch (statusText) {
    case "Pending":
        element.style.backgroundColor = "#007bff";
        break;
    case "Approved":
        element.style.backgroundColor = "#28a745";
        break;
    case "Rejected":
        element.style.backgroundColor = "#dc3545";
        break;
    default:
        // Default background color if the status text doesn't match
        element.style.backgroundColor = "#d1d5db";
        break;
}
});
}

// Function to set operations based on status
function setOperations() {
// Get all table rows
const tableRows = document.querySelectorAll('table tbody tr');

// Loop through each table row
tableRows.forEach(function(row) {
// Get the status cell in the row
const statusCell = row.querySelector('td:nth-child(7)');

// Get the status text from the status cell
const statusText = statusCell.textContent.trim();

// Get the operations container in the row
const operationsContainer = row.querySelector('td:nth-child(8)');

// Check the status text and display the corresponding operations container
if (statusText === "Pending") {
    // Display operations-1 container
    operationsContainer.innerHTML = `
        <div class="operations-1">
            <button class="approve" title="Approve"><img src="images/icons/Approve.svg"></button> 
            <button class="reject" title="Reject"><img src="images/icons/Reject.svg"></button>
        </div>
    `;
} else if (statusText === "Approved" || statusText === "Rejected") {
    // Display operations-2 container
    operationsContainer.innerHTML = `
        <div class="operations-2">
            <button class="reset" ><img src="images/icons/Reset-status.svg" alt="reset"></button>Reset
        </div>
    `;
}

// Add event listeners to the operations buttons
const approveButton = operationsContainer.querySelector('.approve');
const rejectButton = operationsContainer.querySelector('.reject');
const resetButton = operationsContainer.querySelector('.reset');

if (approveButton) {
    approveButton.addEventListener('click', function() {
        // Check if statusCell is not null before trying to set its innerHTML
        if (statusCell) {
            // Change the status text to "Approved"
            statusCell.innerHTML = `<span class="status approved">Approved</span>`;
            updateStatusColors();
            setOperations();
        }
    });
}

if (rejectButton) {
    rejectButton.addEventListener('click', function() {
        // Check if statusCell is not null before trying to set its innerHTML
        if (statusCell) {
            // Change the status text to "Rejected"
            statusCell.innerHTML = `<span class="status rejected">Rejected</span>`;
            updateStatusColors();
            setOperations();
        }
    });
}

if (resetButton) {
    resetButton.addEventListener('click', function() {
        // Check if statusCell is not null before trying to set its innerHTML
        if (statusCell) {
            // Change the status text to "Pending"
            statusCell.innerHTML = `<span class="status pending">Pending</span>`;
            updateStatusColors();
            setOperations();
        }
    });
}
});
}

// Call the function to set operations when the page loads
setOperations();
});
