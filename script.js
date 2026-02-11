const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const heading = document.querySelector("h1");

let isFloating = false;
let clickCount = 0;

// Messages that appear when No is clicked
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

// Smooth avoidance
document.addEventListener("mousemove", (e) => {

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

// TELEPORT if mouse touches it
noBtn.addEventListener("mouseenter", () => {
    const rect = noBtn.getBoundingClientRect();

    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    isFloating = true;
});

// If No gets clicked somehow
noBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (clickCount < messages.length) {
        heading.textContent = messages[clickCount];
    } else {
        heading.textContent = "you’re just being difficult now 😭";
    }

    clickCount++;

    // Grow Yes button
    let yesScale = 1 + clickCount * 0.2;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Shrink No button
    let noScale = 1 - clickCount * 0.1;
    if (noScale < 0.2) noScale = 0.2;
    noBtn.style.transform = `scale(${noScale})`;
});

// YES button action
yesBtn.addEventListener("click", () => {
    document.body.innerHTML = `
        <div style="
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #ff4e88, #ff9ecb);
            font-family: Arial, Helvetica, sans-serif;
            text-align: center;
        ">
            <h1 style="
                color: white;
                font-size: 60px;
                animation: pop 0.4s ease;
            ">
                You have great taste in men 😉❤️
            </h1>
        </div>
    `;
});
