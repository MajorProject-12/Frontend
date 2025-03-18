document.addEventListener("DOMContentLoaded", function () {
    // Get references to the elements
    const editButton = document.querySelector('.edit-button');
    const backIcon = document.querySelector('.back-icon');
    const infoContent1 = document.querySelector('.info-content-1');
    const infoContent2 = document.querySelector('.info-content-2');
    const infoContent3 = document.querySelector('.info-content-3'); 
    const saveButton = document.getElementById('save-button');
    const editProfileForm = document.getElementById('editProfileForm');
    const closeButton = document.querySelector('.close-button'); 

    // Add event listener to the Edit button
    editButton.addEventListener('click', () => {
        fadeOut(infoContent1, function () {
            infoContent1.style.display = 'none'; // Hide info-content-1
            infoContent2.style.display = 'block'; // Show info-content-2
            fadeIn(infoContent2); // Fade in info-content-2
        });
    });

    // Add event listener to the Back icon
    backIcon.addEventListener('click', () => {
        fadeOut(infoContent2, function () {
            infoContent2.style.display = 'none'; // Hide info-content-2
            infoContent1.style.display = 'block'; // Show info-content-1
            fadeIn(infoContent1); // Fade in info-content-1
            editProfileForm.reset(); // Reset the form fields
        });
    });

    // Add event listener to the Save button
    saveButton.addEventListener('click', function() {            
        editProfileForm.submit(); // Save changes
    });

    // Function to fade out an element
    function fadeOut(element, callback) {
        let opacity = 1;
        const interval = setInterval(function () {
            if (opacity > 0) {
                opacity -= 0.3;
                element.style.opacity = opacity;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 50);
    }

    // Function to fade in an element
    function fadeIn(element) {
        let opacity = 0;
        element.style.opacity = opacity;
        element.style.display = 'block'; // Ensure the element is visible
        const interval = setInterval(function () {
            if (opacity < 1) {
                opacity += 0.3;
                element.style.opacity = opacity;
            } else {
                clearInterval(interval);
            }
        }, 50);
    }
});