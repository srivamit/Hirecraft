// Add this JavaScript to track time
let startTime = new Date();

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
    