// script.js
document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('itemsContainer');
    const searchInput = document.querySelector('.search-box input');
    const filterButtons = document.querySelectorAll('.filters button');
    const addBtn = document.querySelector('.add-btn');

    // Sample data
    let items = [
        {
            id: 1,
            title: 'Understanding Modern JavaScript',
            url: 'https://example.com/js',
            type: 'article',
            thumbnail: 'https://picsum.photos/300/200?1',
            favorite: false,
            archived: false
        },
        {
            id: 2,
            title: 'CSS Grid Tutorial',
            url: 'https://example.com/css',
            type: 'video',
            thumbnail: 'https://picsum.photos/300/200?2',
            favorite: false,
            archived: false
        }
    ];

    // Render items with animation
    function renderItems(items) {
        itemsContainer.innerHTML = items.map((item, index) => `
            <div class="item fade-in" data-id="${item.id}" style="animation-delay: ${index * 0.1}s">
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="item-content">
                    <h3>${item.title}</h3>
                    <p>${item.url}</p>
                    <div class="item-actions">
                        <button class="favorite-btn ${item.favorite ? 'active' : ''}">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="archive-btn ${item.archived ? 'active' : ''}">
                            <i class="fas fa-archive"></i>
                        </button>
                        <button class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to buttons
        attachItemListeners();
    }

    // Add new item
    function addNewItem() {
        const newItem = {
            id: Date.now(),
            title: 'New Item',
            url: 'https://example.com',
            type: 'article',
            thumbnail: `https://picsum.photos/300/200?${Math.random()}`,
            favorite: false,
            archived: false
        };

        items.unshift(newItem);
        saveToLocalStorage();
        renderItems(items);
    }

    // Filter items
    function filterItems(type) {
        const filtered = type === 'all' ? 
            items : 
            items.filter(item => item.type === type);
        renderItems(filtered);
    }

    // Search items
    function searchItems(query) {
        const filtered = items.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.url.toLowerCase().includes(query.toLowerCase())
        );
        renderItems(filtered);
    }

    // Attach event listeners to item buttons
    function attachItemListeners() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.closest('.item').dataset.id);
                const item = items.find(i => i.id === itemId);
                item.favorite = !item.favorite;
                saveToLocalStorage();
                renderItems(items);
            });
        });

        document.querySelectorAll('.archive-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.closest('.item').dataset.id);
                const item = items.find(i => i.id === itemId);
                item.archived = !item.archived;
                saveToLocalStorage();
                renderItems(items);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.closest('.item').dataset.id);
                items = items.filter(i => i.id !== itemId);
                saveToLocalStorage();
                renderItems(items);
            });
        });
    }

    // Local storage functions
    function saveToLocalStorage() {
        localStorage.setItem('pocketItems', JSON.stringify(items));
    }

    function loadFromLocalStorage() {
        const stored = localStorage.getItem('pocketItems');
        if (stored) {
            items = JSON.parse(stored);
            renderItems(items);
        }
    }

    // Event listeners
    addBtn.addEventListener('click', addNewItem);
    
    searchInput.addEventListener('input', (e) => {
        searchItems(e.target.value);
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterItems(btn.textContent.toLowerCase());
        });
    });

    // Initial load
    loadFromLocalStorage();
});