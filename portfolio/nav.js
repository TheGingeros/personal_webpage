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
    burgerIcon.addEventListener('mouseenter', function () {
        clearTimeout(timeout);
        navMenu.style.display = (navMenu.style.display === 'none' || navMenu.style.display === '') ? 'flex' : 'none';
        burgerIcon.style.display = (navMenu.style.display === 'none') ? 'block' : 'none';
    });
    // Close the navigation bar when the user moves the mouse out of it
    navMenu.addEventListener('mouseleave', function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            navMenu.style.opacity = '0';
            setTimeout(() => {
                navMenu.style.display = 'none';
                burgerIcon.style.display = 'block';
                navMenu.style.opacity = '1'; // Reset opacity for future appearance
            }, 300); // Match the transition duration
        }, 125);
    });
});