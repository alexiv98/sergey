let currentVideo = 1;
let firstClick = true; 

const celebrateButton = document.querySelector('#celebrateButton');


function playHearts() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 30 + 10,
    }));

    function drawHeart(x, y, size) {
        ctx.font = `${size}px serif`;
        ctx.fillText("❤️", x, y);
    }

    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach((heart) => {
            drawHeart(heart.x, heart.y, heart.size);
            heart.y += 1; 
            if (heart.y > canvas.height) heart.y = -heart.size;
        });
        requestAnimationFrame(animateHearts);
    }
    animateHearts();
}

function animateImage() {
    const image = document.getElementById("celebrationImage");
    const sound = document.getElementById("celebrationSound");

    sound.play(); 
    playHearts();
    
    image.classList.add("image-visible");

   
    setTimeout(() => {
        image.classList.remove("image-visible");
        celebrateButton.textContent = '🎉 Нажми еще раз 🎉';
    }, 15000); 
}

// Функция для воспроизведения следующего видео
function playNextVideo() {
    const video1 = document.getElementById("birthdayVideo1");
    const video2 = document.getElementById("birthdayVideo2");

    if (currentVideo === 1) {
        video1.classList.add("video-visible");
        video1.play();
        video2.classList.remove("video-visible");
        currentVideo = 2;
        celebrateButton.textContent = '🎉 И еще раз 🎉';
    } else {
        video2.classList.add("video-visible");
        video2.play();
        video1.classList.remove("video-visible");
        currentVideo = 1;
        
    }
}


celebrateButton.addEventListener("click", function () {
    if (firstClick) {
        animateImage(); 
        firstClick = false; 
    } else {
        playNextVideo(); 
    }
});

document.getElementById("birthdayVideo1").addEventListener("ended", function () {
    this.classList.remove("video-visible");
});

document.getElementById("birthdayVideo2").addEventListener("ended", function () {
    this.classList.remove("video-visible");
});
