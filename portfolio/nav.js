document.addEventListener("DOMContentLoaded", function () {
    // Get all section elements
    const sections = document.querySelectorAll(".page");
  
    // Create navigation menu items dynamically
    const navMenu = document.createElement("div");
    navMenu.id = "navMenu";
  
    sections.forEach((section, index) => {
        const h1Element = section.querySelector('h1');
        if (!h1Element) {
            return;
        }
        const h1Text = h1Element.textContent;
        const menuItem = document.createElement("a");
        menuItem.textContent = h1Text;
        menuItem.addEventListener("click", () => scrollToSection(section));
        navMenu.appendChild(menuItem);
    });
  
    // Append the navigation menu to the body
    document.body.appendChild(navMenu);
  
    // Function to scroll to a specific section
    function scrollToSection(section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
    let timeout;
    // Toggle the navigation bar on burger icon click
    const burgerIcon = document.getElementById('burger-icon');
    // Toggle the navigation bar on burger icon click
    burgerIcon.addEventListener('mouseenter', function () {
        clearTimeout(timeout);
        navMenu.style.transition = 'opacity 0.5s ease-out';
        navMenu.style.display = (navMenu.style.display === 'none' || navMenu.style.display === '') ? 'flex' : 'none';
        burgerIcon.style.display = (navMenu.style.display === 'none') ? 'block' : 'none';
    });

    // Close the navigation bar when the user moves the mouse out of it
    navMenu.addEventListener('mouseleave', function () {
        clearTimeout(timeout);
        navMenu.style.transition = 'opacity 0.5s ease-out';
        timeout = setTimeout(() => {
            navMenu.style.opacity = '0';
            setTimeout(() => {
                navMenu.style.display = 'none';
                burgerIcon.style.display = 'block'; // Show the burger icon after the menu fades out
                navMenu.style.transition = ''; // Reset the transition property
                navMenu.style.opacity = '1'; // Reset opacity for future appearance
            }, 500); // Match the transition duration
        }, 600);
    });

    // Cancel the fade-out when the user moves the mouse back over the navigation bar
    navMenu.addEventListener('mouseenter', function () {
        clearTimeout(timeout);
        // Reset the display and opacity when the user reenters during the fade-out
        burgerIcon.style.display = 'none';
        navMenu.style.display = 'flex';
        navMenu.style.opacity = '1';
        navMenu.style.transition = 'none'; // Remove the transition when reentering
    });
});