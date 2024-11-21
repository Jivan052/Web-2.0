// Handle Workout Log
const workoutForm = document.getElementById('workoutForm');
const workoutList = document.querySelector('#workoutList ul');

workoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('workoutType').value;
    const duration = document.getElementById('duration').value;
    const calories = document.getElementById('calories').value;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        ${type} - ${duration} minutes, ${calories} calories burned
        <span class="delete">X</span>
    `;
    workoutList.appendChild(listItem);

    workoutForm.reset();

    // Add delete functionality
    listItem.querySelector('.delete').addEventListener('click', () => {
        workoutList.removeChild(listItem);
    });
});

// Handle Goal Tracking
const goalForm = document.getElementById('goalForm');
const goalText = document.getElementById('goalText');
const progressFill = document.getElementById('progressFill');

goalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const goal = document.getElementById('goal').value;
    const progress = document.getElementById('progress').value;

    goalText.textContent = goal;
    progressFill.style.width = `${progress}%`;

    goalForm.reset();
});