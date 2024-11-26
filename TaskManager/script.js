document.addEventListener('DOMContentLoaded', () => {
    const projects = [];
    const tasks = [];
    const modal = document.getElementById('modal');
    const modalForm = document.getElementById('modal-form');
    const modalTitle = document.getElementById('modal-title');
    const addProjectBtn = document.getElementById('add-project-btn');
    const addTaskBtn = document.getElementById('add-task-btn');
  
    let currentMode = '';
  
    // Open Modal
    const openModal = (mode) => {
      currentMode = mode;
      modal.classList.remove('hidden');
      modalTitle.textContent = mode === 'project' ? 'Add Project' : 'Add Task';
    };
  
    // Close Modal
    const closeModal = () => {
      modal.classList.add('hidden');
      modalForm.reset();
    };
  
    // Handle Form Submission
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('item-title').value;
      const description = document.getElementById('item-description').value;
      const deadline = document.getElementById('item-deadline').value;
      const priority = document.getElementById('item-priority').value;
  
      if (currentMode === 'project') {
        projects.push({ title, description });
        renderProjects();
      } else {
        tasks.push({ title, description, deadline, priority });
        renderTasks();
      }
      closeModal();
    });
  
    // Render Projects
    const renderProjects = () => {
      const projectsDiv = document.getElementById('projects');
      projectsDiv.innerHTML = '';
      projects.forEach((project) => {
        const div = document.createElement('div');
        div.className = 'project';
        div.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
        projectsDiv.appendChild(div);
      });
    };
  
    // Render Tasks
    const renderTasks = () => {
      const tasksDiv = document.getElementById('tasks');
      tasksDiv.innerHTML = '';
      tasks.forEach((task) => {
        const div = document.createElement('div');
        div.className = 'task';
        div.innerHTML = `<h3>${task.title}</h3><p>Deadline: ${task.deadline}</p><p>Priority: ${task.priority}</p>`;
        tasksDiv.appendChild(div);
      });
    };
  
    addProjectBtn.addEventListener('click', () => openModal('project'));
    addTaskBtn.addEventListener('click', () => openModal('task'));
    document.getElementById('close-modal').addEventListener('click', closeModal);
  });
  