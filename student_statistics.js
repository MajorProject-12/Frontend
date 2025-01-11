document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.querySelector(".calendar-container");

    // Initialize Flatpickr
    const calendar = flatpickr(calendarContainer, {
        inline: false, // Do not display the calendar inline
        static: false, // Do not keep the calendar open by default
        appendTo: calendarContainer, // Append the calendar to the container
        closeOnSelect: false, // Keep the calendar open after selecting a date
        onChange: function (selectedDates, dateStr, instance) {
            console.log("Selected Date:", dateStr);
        },
        onReady: function (selectedDates, dateStr, instance) {
            // Create the close button
            const closeButton = document.createElement("button");
            closeButton.textContent = "Close";
            closeButton.style.margin = "10px";
            closeButton.style.padding = "5px 10px";
            closeButton.style.backgroundColor = "#295fcb";
            closeButton.style.color = "#fff";
            closeButton.style.border = "none";
            closeButton.style.borderRadius = "5px";
            closeButton.style.cursor = "pointer";

            // Add the close button to the calendar
            instance.calendarContainer.appendChild(closeButton);

            // Add an event listener to the close button
            closeButton.addEventListener("click", function (event) {
                event.stopPropagation(); // Prevent the event from bubbling up
                calendar.close();
            });
        },
    });

    // Open the calendar when the container is clicked
    calendarContainer.addEventListener("click", function () {
        calendar.open();
    });

    // Close the calendar only when clicking outside the calendar
    document.addEventListener("click", function (event) {
        if (!calendarContainer.contains(event.target) && !event.target.closest(".flatpickr-calendar")) {
            calendar.close();
        }
    });
});