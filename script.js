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
