const startBtn = document.getElementById('startBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const setupContainer = document.getElementById('setup-container');
const mainContainer = document.getElementById('main-container');
const successScreen = document.getElementById('success-screen');
const visitorInput = document.getElementById('visitorName');

let yesScale = 1;
let roamingStarted = false;

// Start screen
startBtn.onclick = () => {
    const name = visitorInput.value.trim();
    if (name !== "") {
        document.getElementById('hiddenName').value = name;
        setupContainer.style.display = 'none';
        mainContainer.style.display = 'block';

        // Start NO button roaming only AFTER entering
        if (!roamingStarted) {
            setInterval(roamButton, 700);
            roamingStarted = true;
        }
    }
};

// NO button roaming forever
function roamButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);

    noBtn.style.position = "fixed";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;

    // YES grows bigger forever
    yesScale += 0.5;
    yesBtn.style.transform = `scale(${yesScale})`;

    document.getElementById('subText').innerText = "No is not an option 😌";
}

// Extra escape moves
noBtn.addEventListener('mouseover', roamButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    roamButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    roamButton();
});

// Falling flowers + hearts
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('heart');

    // Mix of flowers & hearts
    const items = ['🌸','🌸','🌸','❤️','💖','🌺'];
    petal.innerText = items[Math.floor(Math.random() * items.length)];

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = Math.random() * 3 + 3 + "s";

    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 6000);
}
setInterval(createPetal, 250);

// YES clicked → show meme GIF
yesBtn.onclick = () => {
    mainContainer.style.display = 'none';
    successScreen.style.display = 'block';

    const gifUrl = "https://media.tenor.com/2roX3uxz_68AAAAC/the-office-dance.gif";

    successScreen.innerHTML = `
        <h1 style="color: #ff4d6d;">It's a date then! ❤️</h1>
        <p>Knew you'd say yes!</p>

        <div class="video-container">
            <img src="${gifUrl}" style="width:100%; border-radius:15px;" />
        </div>

        <h2>Whoo! Great! 🥳</h2>
    `;

    const form = document.getElementById('notify-form');
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    });
};
