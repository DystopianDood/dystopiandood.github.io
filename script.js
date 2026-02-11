const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const mainBox = document.getElementById("mainBox");

// Make the "No" button run away from the mouse
document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();
    const distance = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
    );

    if (distance < 100) {
        moveButton();
    }
});

function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// When Yes is clicked
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
                font-size: 50px;
                animation: pop 0.6s ease;
            ">
                You have great taste in men 😉❤️
            </h1>
        </div>
    `;
});
