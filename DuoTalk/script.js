// script.js
document.addEventListener('DOMContentLoaded', () => {
    // User state
    const userState = {
        name: 'John Doe',
        xp: 0,
        streak: 5,
        level: 1,
        completedLessons: [],
        achievements: [],
        lastLogin: new Date()
    };

    // DOM Elements
    const progressBar = document.querySelector('.progress');
    const streakElement = document.querySelector('.streak');
    const navLinks = document.querySelectorAll('.nav-links li');
    const lessonsGrid = document.querySelector('.lessons-grid');

    // Lesson data
    const lessons = [
        { id: 1, title: 'Basics', icon: '🇪🇸', xp: 20, unlocked: true },
        { id: 2, title: 'Greetings', icon: '👋', xp: 25, unlocked: false },
        { id: 3, title: 'Food', icon: '🍕', xp: 30, unlocked: false },
        { id: 4, title: 'Family', icon: '👨‍👩‍👧‍👦', xp: 35, unlocked: false }
    ];

    // Initialize app
    function initApp() {
        loadUserData();
        renderLessons();
        updateUI();
        checkDailyStreak();
        attachEventListeners();
    }

    // Load user data from localStorage
    function loadUserData() {
        const saved = localStorage.getItem('languageAppUser');
        if (saved) {
            Object.assign(userState, JSON.parse(saved));
        }
    }

    // Save user data
    function saveUserData() {
        localStorage.setItem('languageAppUser', JSON.stringify(userState));
    }

    // Render lessons
    function renderLessons() {
        lessonsGrid.innerHTML = lessons.map(lesson => `
            <div class="lesson-card ${lesson.unlocked ? '' : 'locked'}" data-id="${lesson.id}">
                <div class="lesson-icon">${lesson.icon}</div>
                <h3>${lesson.title}</h3>
                <p>${lesson.xp} XP</p>
                <button class="start-btn" ${lesson.unlocked ? '' : 'disabled'}>
                    ${lesson.unlocked ? 'Start' : '<i class="fas fa-lock"></i>'}
                </button>
            </div>
        `).join('');
    }

    // Update UI elements
    function updateUI() {
        progressBar.style.width = `${(userState.xp % 100) / 100 * 100}%`;
        streakElement.textContent = `🔥 ${userState.streak}`;
    }

    // Check daily streak
    function checkDailyStreak() {
        const today = new Date().toDateString();
        const lastLogin = new Date(userState.lastLogin).toDateString();

        if (lastLogin !== today) {
            if (new Date(lastLogin).getTime() + 86400000 >= new Date().getTime()) {
                userState.streak++;
                showNotification('Streak maintained! 🔥');
            } else {
                userState.streak = 1;
                showNotification('Streak reset! Start again! 💪');
            }
            userState.lastLogin = new Date();
            saveUserData();
            updateUI();
        }
    }

    // Handle lesson completion
    function completeLesson(lessonId) {
        const lesson = lessons.find(l => l.id === lessonId);
        if (lesson) {
            userState.xp += lesson.xp;
            userState.completedLessons.push(lessonId);
            
            // Unlock next lesson
            const nextLesson = lessons.find(l => l.id === lessonId + 1);
            if (nextLesson) {
                nextLesson.unlocked = true;
            }

            checkLevelUp();
            saveUserData();
            updateUI();
            showNotification(`+${lesson.xp} XP earned! 🎉`);
        }
    }

    // Check for level up
    function checkLevelUp() {
        const newLevel = Math.floor(userState.xp / 100) + 1;
        if (newLevel > userState.level) {
            userState.level = newLevel;
            showNotification(`Level ${newLevel} achieved! 🎯`);
        }
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Event listeners
    function attachEventListeners() {
        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Lesson cards
        lessonsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.lesson-card');
            if (!card) return;

            const lessonId = parseInt(card.dataset.id);
            if (!card.classList.contains('locked')) {
                completeLesson(lessonId);
            } else {
                card.classList.add('shake');
                setTimeout(() => card.classList.remove('shake'), 500);
            }
        });
    }

    // Initialize app
    initApp();
});