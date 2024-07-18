// Add this JavaScript to track time

let startTime = new Date();
// Retrieve email from sessionStorage
const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');

// Update navbar if email is available
if(loggedInUserEmail) {
    document.getElementById('loggedInUser').innerText = loggedInUserEmail;
}


function updateTime() {
    const currentTime = new Date();
    const timeDifference = new Date(currentTime - startTime);
    const hours = timeDifference.getUTCHours();
    const minutes = timeDifference.getUTCMinutes();
    const seconds = timeDifference.getUTCSeconds();
    
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    document.getElementById("time").textContent = timeString;
}

setInterval(updateTime, 1000);
document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('taskInput');
    const addTask = document.getElementById('addTask');
  
    function createTask(text) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="task-text">${text}</span>
        <span class="delete">Delete</span>
      `;
  
      taskList.appendChild(li);
  
      li.addEventListener('click', function () {
        li.classList.toggle('completed');
      });
  
      const deleteButton = li.querySelector('.delete');
      deleteButton.addEventListener('click', function () {
        li.remove();
      });
  
      taskInput.value = '';
    }
  
    addTask.addEventListener('click', function () {
      const text = taskInput.value.trim();
      if (text) {
        createTask(text);
      }
    });
  
    taskInput.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        addTask.click();
      }
    });
  });
  const audio = document.getElementById('audio');
  const audioSource = document.getElementById('audio-source');
  const fileInput = document.getElementById('file-input');
  const addFileBtn = document.getElementById('add-file-btn');
  
  addFileBtn.addEventListener('click', () => {
      fileInput.click();
  });
  
  fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
          audioSource.src = URL.createObjectURL(file);
          audio.load();
      }
  });
  document.getElementById('cameraButton').addEventListener('click', function() {
    fetch('/run_script', { method: 'POST' })
        .then(response => response.text())
        .then(message => console.log(message))
        .catch(error => console.error(error));
});
let isCameraOn = false;
let lastSeenTime = new Date().getTime();
let videoElement;
let canvas;
let ctx;
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models'), // Adjust the path accordingly
  faceapi.nets.faceLandmark68Net.loadFromUri('models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('models')
]).then(startCamera);
function toggleCamera() {
    if (!isCameraOn) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoElement = document.createElement('video');
                videoElement.width = 320; // Adjust width and height for better visualization
                videoElement.height = 240;
                videoElement.style.position = 'fixed';
                videoElement.style.bottom = '0';
                videoElement.style.right = '0';
                videoElement.autoplay = true;
                videoElement.srcObject = stream;
                document.body.appendChild(videoElement);
                isCameraOn = true;
                videoElement.onloadedmetadata = function () {
                    alert('You are under camera view');
                };
            })
            .catch(err => console.error('Error accessing camera: ', err));
    } else {
        document.body.removeChild(videoElement);
        isCameraOn = false;
    }
}

document.addEventListener('mousemove', () => {
    lastSeenTime = new Date().getTime();
});

setInterval(() => {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - lastSeenTime;
    if (isCameraOn && elapsedTime > 5000) {
        checkVisibility();
    }
}, 1000);

async function checkVisibility() {
    if (!videoElement) return;

    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.width = videoElement.width;
        canvas.height = videoElement.height;
        canvas.style.position = 'fixed';
        canvas.style.bottom = '0';
        canvas.style.right = '0';
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

    if (detections.length === 0) {
        playAlarm();
        alert('Please Be Visible You are In Focus Mode');
    }

    // Draw squares around detected faces
    detections.forEach(detection => {
        const box = detection.detection.box;
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'red';
        ctx.rect(box.x, box.y, box.width, box.height);
        ctx.stroke();
    });
}

function playAlarm() {
    const audio = new Audio('ALM.mp3');
    audio.play();
}
