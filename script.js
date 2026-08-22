// Function to open the link in a new tab
function openLink(url) {
    window.open(url, '_blank');
}

// --- Experience & Projects Dynamic Loader ---
let EXP_COUNT = 0;
let currentExp = 0;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch both files simultaneously
        const [teamsResponse, projectsResponse] = await Promise.all([
            fetch('data/teams.json'),
            fetch('data/projects.json')
        ]);

        if (!teamsResponse.ok || !projectsResponse.ok) {
            throw new Error("Could not load data.");
        }

        const teams = await teamsResponse.json();
        const projects = await projectsResponse.json();

        EXP_COUNT = teams.length;
        buildExperienceUI(teams, projects);
        setupSliderControls();
        updateExp(0);

    } catch (error) {
        console.error("Error loading portfolio data:", error);
        document.getElementById('exp-cards-container').innerHTML = "<p>Sorry, experience data could not be loaded.</p>";
    }
});

function buildExperienceUI(teams, projects) {
    const timelineContainer = document.getElementById('exp-timeline-container');
    const cardsContainer = document.getElementById('exp-cards-container');
    
    let timelineHTML = '';
    let cardsHTML = '';

    teams.forEach((team, index) => {
        // 1. Build Timeline Sidebar
        timelineHTML += `
            <div class="exp-step" data-index="${index}">
                <div class="exp-step-left"><div class="exp-circle"></div></div>
                <div class="exp-step-label">
                    <span class="exp-years">${team.years}</span>
                    <span class="exp-team">${team.shortName}</span>
                </div>
            </div>
        `;
        // Add line if not the last item
        if (index < teams.length - 1) {
            timelineHTML += `<div class="exp-line" data-index="${index}"></div>`;
        }

        // 2. Filter projects that belong to this specific team
        const teamProjects = projects.filter(project => project.teamId === team.id);
        
        // 3. Generate Project Grid HTML for this team
        let projectsHTML = '';
        if (teamProjects.length > 0) {
            projectsHTML += `<div id="${team.id}-projects-overview" class="projects-grid">`;
            teamProjects.forEach(project => {
                projectsHTML += `
                    <div class="project-thumbnail-card">
                      <p>${project.title}</p>
                      <!-- Dynamically generate the anchor link using the ID -->
                      <a href="#${project.id}">
                        <img src="${project.imageUrl}" alt="Showcase of ${project.title}">
                      </a>
                    </div>
                `;
            });
            projectsHTML += `</div>`;
        } else {
            projectsHTML = `<p>Projects to be added...</p>`;
        }

        // 4. Build the Content Card
        cardsHTML += `
            <div class="exp-card" data-index="${index}">
                <p class="exp-card-title">${team.name}</p>
                <p class="hero_bio">${team.role}. ${team.description}</p>
                <p class="exp-card-project">Projects:</p>
                ${projectsHTML}
            </div>
        `;
    });

    timelineContainer.innerHTML = timelineHTML;
    cardsContainer.innerHTML = cardsHTML;
}

// --- Slider Mechanics ---
function setupSliderControls() {
    document.querySelectorAll('.exp-step').forEach((step, i) => {
        step.addEventListener('click', () => updateExp(i));
    });

    document.getElementById('expPrev').addEventListener('click', () => {
        if (currentExp > 0) updateExp(currentExp - 1);
    });

    document.getElementById('expNext').addEventListener('click', () => {
        if (currentExp < EXP_COUNT - 1) updateExp(currentExp + 1);
    });
}

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

    // Handle button disable states
    const prevBtn = document.getElementById('expPrev');
    const nextBtn = document.getElementById('expNext');
    if(prevBtn) prevBtn.disabled = index === 0;
    if(nextBtn) nextBtn.disabled = index === EXP_COUNT - 1;
}