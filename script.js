// Function to open the link in a new tab
function openLink(url) {
    window.open(url, '_blank');
}

// --- Experience timeline ---
const EXP_COUNT = 3;
let currentExp = 0;

function updateExp(index) {
    currentExp = index;

    document.querySelectorAll('.exp-step').forEach((step, i) => {
        step.classList.remove('active', 'filled');
        if (i < index) step.classList.add('filled');
        if (i === index) step.classList.add('active');
    });

    document.querySelectorAll('.exp-line').forEach((line, i) => {
        line.classList.toggle('filled', i < index);
    });

    document.querySelectorAll('.exp-card').forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });

    document.getElementById('expPrev').disabled = index === 0;
    document.getElementById('expNext').disabled = index === EXP_COUNT - 1;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.exp-step').forEach((step, i) => {
        step.addEventListener('click', () => updateExp(i));
    });

    document.getElementById('expPrev').addEventListener('click', () => {
        if (currentExp > 0) updateExp(currentExp - 1);
    });

    document.getElementById('expNext').addEventListener('click', () => {
        if (currentExp < EXP_COUNT - 1) updateExp(currentExp + 1);
    });

    updateExp(0);
});

// 1. Find the empty container in your HTML
const galleryContainer = document.getElementById('freelance-projects-overview');

if (galleryContainer) {
    // 2. Fetch the JSON file
    fetch('data/projects.json')
      .then(response => {
        // Check if the file loaded successfully
        if (!response.ok) {
          throw new Error("Could not load the projects data.");
        }
        return response.json(); // Convert the file into a JavaScript array
      })
      .then(portfolioProjects => {
        // 3. Create a variable to hold all the generated HTML
        let galleryHTML = '';

        // 4. Loop through the JSON data
        portfolioProjects.forEach((project) => {
          galleryHTML += `
            <div class="project-thumbnail-card">
              <p>${project.title}</p>
              
              <a href="${project.detailAnchor}">
                <img src="${project.imageUrl}" alt="Showcase of ${project.title}">
              </a>
            </div>
          `;
        });

        // 5. Inject the final HTML into the container
        galleryContainer.innerHTML = galleryHTML;
      })
      .catch(error => {
        console.error("Error loading projects:", error);
        galleryContainer.innerHTML = "<p>Sorry, projects could not be loaded at this time.</p>";
      });
}
