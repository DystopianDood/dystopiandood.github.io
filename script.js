const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const heading = document.getElementById("heading");
const dramaticSound = document.getElementById("dramaticSound");
const laughSound = document.getElementById("laughSound");

let isFloating = false;
let clickCount = 0;

const messages = [
    "really?",
    "are you sure?",
    "cmon be for real 😭",
    "be serious right now",
    "why you playing like that",
    "stopppp",
    "don’t do this to me 💔",
    "pwease 🥺👉👈",
    "you know you want to 😏",
    "just click yes already ❤️"
];

// Keep text spaced above growing button
function updateSpacing() {
    const yesScale = 1 + clickCount * 0.25;
    const extraSpace = yesScale * 20;
    heading.style.marginBottom = 30 + extraSpace + "px";
}

// Smooth avoidance
document.addEventListener("mousemove", (e) => {
    if (!noBtn || !noBtn.isConnected) return;

    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = btnCenterX - e.clientX;
    const dy = btnCenterY - e.clientY;
    const distance = Math.hypot(dx, dy);

    const safeDistance = 140;

    if (distance < safeDistance) {
        if (!isFloating) {
            noBtn.style.position = "fixed";
            noBtn.style.left = rect.left + "px";
            noBtn.style.top = rect.top + "px";
            isFloating = true;
        }

        const angle = Math.atan2(dy, dx);
        const moveDistance = 120;

        let newX = rect.left + Math.cos(angle) * moveDistance;
        let newY = rect.top + Math.sin(angle) * moveDistance;

        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        newX = Math.max(0, Math.min(maxX, newX));
        newY = Math.max(0, Math.min(maxY, newY));

        noBtn.style.left = newX + "px";
        noBtn.style.top = newY + "px";
    }
});

// Teleport on hover
noBtn.addEventListener("mouseenter", () => {
    const rect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    noBtn.style.position = "fixed";
    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";

    isFloating = true;
});

// No button click escalation
noBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (clickCount < messages.length) {
        heading.textContent = messages[clickCount];
    }

    clickCount++;

    // Grow Yes
    let yesScale = 1 + clickCount * 0.25;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Shrink No
    let noScale = 1 - clickCount * 0.1;
    if (noScale < 0.15) noScale = 0.15;
    noBtn.style.transform = `scale(${noScale})`;

    updateSpacing();

    // FINAL REMOVAL
    if (clickCount >= messages.length) {
        dramaticSound.play();
        setTimeout(() => {
            laughSound.play();
        }, 1500);

        noBtn.style.transition = "all 0.5s ease";
        noBtn.style.transform = "scale(0)";
        setTimeout(() => {
            noBtn.remove();
        }, 500);
    }
});

// YES button wins
yesBtn.addEventListener("click", () => {
    // Remove buttons and old heading
    const mainBox = document.getElementById("mainBox");
    mainBox.innerHTML = `
        <div class="final-screen">
            <h1 id="finalMessage">You have great taste in men 😉❤️</h1>
        </div>
    `;

    // Make the final-screen take full viewport
    mainBox.style.width = "100%";
    mainBox.style.height = "100vh";
    mainBox.style.display = "flex";
    mainBox.style.justifyContent = "center";
    mainBox.style.alignItems = "center";
    mainBox.style.background = "transparent"; // don't override body gradient
    mainBox.style.boxShadow = "none";
    mainBox.style.borderRadius = "0";
    mainBox.style.padding = "0";

    startHeartRain();
});


// HEART RAIN FUNCTION
function startHeartRain() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent = "❤️";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
        heart.style.fontSize = (Math.random() * 20 + 20) + "px";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);

    }, 200);
}
