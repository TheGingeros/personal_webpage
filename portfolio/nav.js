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
    let isAnimating = false;

    function showMenu() {
        navMenu.style.display = 'flex';
        burgerIcon.style.display = 'none';
        isAnimating = false;
    }
    
    function hideMenu() {
        navMenu.style.transition = 'opacity 0.6s ease-out';
        navMenu.style.opacity = '0';
        isAnimating = true;
    }
    
    function resetMenu() {
        navMenu.style.transition = 'none';
        navMenu.style.opacity = '1';
        isAnimating = false;
    }
    
    burgerIcon.addEventListener('mouseenter', function () {
        if (!isAnimating) {
            navMenu.style.transition = 'opacity 0.6s ease-out';
            showMenu();
        }
    });
    
    navMenu.addEventListener('mouseleave', function () {
        hideMenu();
        setTimeout(resetMenu, 1000);
    });
    
    navMenu.addEventListener('transitionend', function (event) {
        if (event.propertyName === 'opacity' && isAnimating) {
            navMenu.style.display = 'none';
            burgerIcon.style.display = 'block';
            resetMenu();
        }
    });
    
    navMenu.addEventListener('mouseenter', function () {
        if (isAnimating) {
            navMenu.style.transition = 'none';
            showMenu();
        }
    });
});