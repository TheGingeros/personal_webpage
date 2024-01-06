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
});