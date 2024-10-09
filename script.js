
let balloonData = [];
fetch('./balloon.json')
  .then(response => response.json())
  .then(data => {
    balloonData = data;
  });

let currentBalloonIndex = 0;
let balloonElement, alphaElement;
let balloonSize = 50; 
let balloonsReleased = []; 

document.querySelector('.handle').addEventListener('click', pumpBalloon);

function pumpBalloon() {
    const handle = document.querySelector('.handle');

    handle.classList.add('handle-active');

    setTimeout(() => {
        handle.classList.remove('handle-active');
    }, 200); // 

    if (!balloonElement) {
        createBalloon();
    }

    if (balloonSize < 100) { 
        balloonSize += 15; 
        balloonElement.style.width = `${balloonSize+29}px`;
        balloonElement.style.height = `${balloonSize * 1.4}px`; 
        alphaElement.style.fontSize = `${balloonSize / 2}px`; 
    }

    if (balloonSize >= 100) {
        releaseBalloon();
    }
}


function createBalloon() {
    const { alpha, balloon } = balloonData[currentBalloonIndex];

    balloonElement = document.createElement('div');
    balloonElement.classList.add('balloon');
    balloonElement.style.backgroundImage = `url(${balloon})`;

    alphaElement = document.createElement('div');
    alphaElement.classList.add('alpha');    
    alphaElement.textContent = String.fromCharCode(65 + currentBalloonIndex); 

    let randomStart = Math.random() * 100 - 50; 
    balloonElement.style.width = `${balloonSize}px`;
    balloonElement.style.height = `${balloonSize * 1.4}px`;
    balloonElement.style.bottom = '159px';
    balloonElement.style.right = '193px'; 

    balloonElement.appendChild(alphaElement);
    document.querySelector('.gamearea').appendChild(balloonElement);
}


function releaseBalloon() {
    let windowWidth = window.innerWidth - balloonElement.offsetWidth;
    let windowHeight = window.innerHeight - balloonElement.offsetHeight;
    
    let xMove = (Math.random() - 0.5) * windowWidth; 
    
    let yMove = Math.random() * windowHeight; 

    balloonElement.style.transition = 'all 5s linear';
    balloonElement.style.transform = `translate(${xMove}px, -${yMove}px)`; 

    balloonElement.addEventListener('click', burstBalloon);

    balloonsReleased.push(balloonElement);

    balloonSize = 50;
    balloonElement = null;

    currentBalloonIndex = (currentBalloonIndex + 1) % balloonData.length;
}

function burstBalloon(event) {
    const balloonToBurst = event.target;
    
    balloonToBurst.style.transition = 'none'; 
    balloonToBurst.style.transform = 'none';  

    balloonToBurst.classList.add('burst'); 
    balloonToBurst.remove();

    balloonsReleased = balloonsReleased.filter(balloon => balloon !== balloonToBurst);
}

