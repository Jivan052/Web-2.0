// Data store for trending topics and featured writers
const trendingTopics = [
    {
        id: 1,
        title: "The Future of AI",
        author: "Sarah Chen",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500"
    },
    {
        id: 2,
        title: "Sustainable Living",
        author: "Mark Johnson",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?w=500"
    },
    {
        id: 3,
        title: "Modern Architecture",
        author: "Alex Rivera",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=500"
    }
];

const featuredWriters = [
    {
        id: 1,
        name: "Emma Wilson",
        bio: "Tech enthusiast and AI researcher",
        followers: "12.5K",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    {
        id: 2,
        name: "David Kim",
        bio: "Environmental journalist",
        followers: "8.2K",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
        id: 3,
        name: "Maria Garcia",
        bio: "Design and architecture writer",
        followers: "15.1K",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    }
];

// DOM Elements
const trendingTopicsContainer = document.getElementById('trending-topics');
const featuredWritersContainer = document.getElementById('featured-writers');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    renderTrendingTopics();
    renderFeaturedWriters();
});

// Navigation functionality
function initializeNavigation() {
    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only handle actual anchor links, not just "#"
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
}

// Render trending topics
function renderTrendingTopics() {
    if (!trendingTopicsContainer) return;
    
    trendingTopicsContainer.innerHTML = trendingTopics.map((topic, index) => `
        <article class="trending-card">
            <span class="trending-number">${String(index + 1).padStart(2, '0')}</span>
            <div class="trending-content">
                <div class="trending-author">
                    <img src="${topic.image}" alt="" class="author-avatar">
                    <span>${topic.author}</span>
                </div>
                <h3 class="trending-title">${topic.title}</h3>
                <span class="trending-meta">${topic.readTime}</span>
            </div>
        </article>
    `).join('');
}

// Render featured writers
function renderFeaturedWriters() {
    if (!featuredWritersContainer) return;
    
    featuredWritersContainer.innerHTML = featuredWriters.map(writer => `
        <article class="writer-card">
            <img src="${writer.image}" alt="${writer.name}" class="writer-avatar">
            <div class="writer-content">
                <h3 class="writer-name">${writer.name}</h3>
                <p class="writer-bio">${writer.bio}</p>
                <span class="writer-followers">${writer.followers} followers</span>
                <button class="btn btn-secondary">Follow</button>
            </div>
        </article>
    `).join('');
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