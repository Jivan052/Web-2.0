// Data store for blog posts
const blogPosts = [
    {
        id: 1,
        title: "The Evolution of Artificial Intelligence",
        excerpt: "Exploring how AI has transformed from simple rule-based systems to sophisticated neural networks.",
        content: "The journey of artificial intelligence has been nothing short of remarkable...",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500",
        date: "2024-02-20",
        author: "Sarah Chen",
        readTime: "8 min read",
        topics: ["Technology", "AI"]
    },
    {
        id: 2,
        title: "Sustainable Living in Urban Spaces",
        excerpt: "Practical tips for maintaining an eco-friendly lifestyle in the heart of the city.",
        content: "Living sustainably in an urban environment presents unique challenges...",
        image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?w=500",
        date: "2024-02-19",
        author: "Mark Johnson",
        readTime: "6 min read",
        topics: ["Lifestyle", "Sustainability"]
    },
    {
        id: 3,
        title: "The Future of Modern Architecture",
        excerpt: "How sustainable materials and smart technology are reshaping our buildings.",
        content: "The intersection of technology and architecture is creating exciting possibilities...",
        image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=500",
        date: "2024-02-18",
        author: "Alex Rivera",
        readTime: "5 min read",
        topics: ["Design", "Architecture"]
    }
];

const popularTopics = [
    "Technology",
    "Lifestyle",
    "Design",
    "Writing",
    "Politics",
    "Health",
    "Science",
    "Programming"
];

const popularWriters = [
    {
        name: "Emma Wilson",
        followers: "12.5K",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    {
        name: "David Kim",
        followers: "8.2K",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
        name: "Maria Garcia",
        followers: "15.1K",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    }
];

// DOM Elements
const featuredPostsContainer = document.getElementById('featured-posts-container');
const postsContainer = document.getElementById('posts-container');
const topicList = document.getElementById('topic-list');
const writerList = document.getElementById('writer-list');
const searchInput = document.getElementById('search');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    renderPosts();
    renderTopics();
    renderWriters();
    initializeSearch();
});

// Navigation functionality
function initializeNavigation() {
    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Render blog posts
function renderPosts() {
    // Render featured posts (first 2 posts)
    const featuredPosts = blogPosts.slice(0, 2);
    if (featuredPostsContainer) {
        featuredPostsContainer.innerHTML = featuredPosts.map(post => createPostCard(post, true)).join('');
    }

    // Render all posts
    if (postsContainer) {
        postsContainer.innerHTML = blogPosts.map(post => createPostCard(post)).join('');
    }
}

// Create HTML for a post card
function createPostCard(post, isFeatured = false) {
    return `
        <article class="post-card ${isFeatured ? 'featured' : ''} fade-in">
            <img src="${post.image}" alt="${post.title}" class="post-image">
            <div class="post-content">
                <div class="post-meta">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32" alt="" class="author-avatar">
                    <span>${post.author}</span>
                    <span>·</span>
                    <span>${post.readTime}</span>
                </div>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-topics">
                    ${post.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                </div>
            </div>
        </article>
    `;
}

// Render topics
function renderTopics() {
    if (topicList) {
        topicList.innerHTML = popularTopics.map(topic => `
            <li>
                <a href="#" class="topic-link">
                    ${topic}
                    <span class="topic-count">${Math.floor(Math.random() * 100) + 1}</span>
                </a>
            </li>
        `).join('');
    }
}

// Render writers
function renderWriters() {
    if (writerList) {
        writerList.innerHTML = popularWriters.map(writer => `
            <li class="writer-item">
                <img src="${writer.image}" alt="${writer.name}" class="writer-avatar">
                <div class="writer-info">
                    <h4>${writer.name}</h4>
                    <span>${writer.followers} followers</span>
                </div>
            </li>
        `).join('');
    }
}

// Search functionality
function initializeSearch() {
    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.topics.some(topic => topic.toLowerCase().includes(searchTerm))
        );
        
        if (postsContainer) {
            postsContainer.innerHTML = filteredPosts.map(post => createPostCard(post)).join('');
        }
    });
}

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const images = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
});