document.addEventListener("DOMContentLoaded", function () {
    // Get all section elements
    const sections = document.querySelectorAll(".section");
  
    // Create navigation menu items dynamically
    const navMenu = document.createElement("div");
    navMenu.id = "navMenu";
  
    sections.forEach((section, index) => {
      const menuItem = document.createElement("a");
      menuItem.textContent = `Section ${index + 1}`;
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
  });
  