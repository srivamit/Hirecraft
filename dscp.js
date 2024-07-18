document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');
  
    modeSwitch.addEventListener('click', function () {                     document.documentElement.classList.toggle('dark');
      modeSwitch.classList.toggle('active');
    });
    
    var listView = document.querySelector('.list-view');
    var gridView = document.querySelector('.grid-view');
    var projectsList = document.querySelector('.project-boxes');
    
    listView.addEventListener('click', function () {
      gridView.classList.remove('active');
      listView.classList.add('active');
      projectsList.classList.remove('jsGridView');
      projectsList.classList.add('jsListView');
    });
    
    gridView.addEventListener('click', function () {
      gridView.classList.add('active');
      listView.classList.remove('active');
      projectsList.classList.remove('jsListView');
      projectsList.classList.add('jsGridView');
    });
    
    document.querySelector('.messages-btn').addEventListener('click', function () {
      document.querySelector('.messages-section').classList.add('show');
    });
    
    document.querySelector('.messages-close').addEventListener('click', function() {
      document.querySelector('.messages-section').classList.remove('show');
    });
  });
   // Function to handle adding a new project
   function addProject() {
    // Prompting user for project details
    var projectName = prompt("Enter the project name:");
    var projectProgress = prompt("Enter the project progress:");

    // Creating a new project object
    var newProject = {
      name: projectName,
      progress: projectProgress
    };

    // Adding the new project to the list
    var projectsDiv = document.getElementById("projects");
    var projectItem = document.createElement("div");
    projectItem.textContent = "Name: " + newProject.name + ", Progress: " + newProject.progress;
    projectsDiv.appendChild(projectItem);
  }

  // Adding event listener to the add project button
  document.getElementById("addProjectBtn").addEventListener("click", addProject);

 