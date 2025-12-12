// script.js - Enhanced Version

// DOM Elements
const backToTopButton = document.getElementById("backToTop");
const themeToggle = document.getElementById("themeToggle");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");
const progressBar = document.querySelector(".progress-bar");
const shareBtn = document.querySelector(".share-btn");
const videoThumbnail = document.querySelector(".video-thumbnail");
const newsletterForms = document.querySelectorAll("form");

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i");
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";

  // Update mobile toggle if exists
  if (mobileThemeToggle) {
    mobileThemeToggle.checked = theme === "dark";
  }
}

// Back to Top Button
function handleScroll() {
  // Show/hide back to top button
  if (window.scrollY > 300) {
    backToTopButton.style.display = "flex";
  } else {
    backToTopButton.style.display = "none";
  }

  // Update progress bar
  const winHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const trackLength = docHeight - winHeight;
  const progress = (scrollTop / trackLength) * 100;
  progressBar.style.width = `${progress}%`;
}

// Mobile Menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
}

// Share Functionality
function shareArticle() {
  if (navigator.share) {
    navigator
      .share({
        title: document.title,
        text: "Baca artikel menarik tentang Artificial Intelligence di TechToday",
        url: window.location.href,
      })
      .then(() => console.log("Berhasil membagikan"))
      .catch((error) => console.log("Error sharing", error));
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Link artikel berhasil disalin ke clipboard!");
      })
      .catch((err) => {
        console.error("Gagal menyalin: ", err);
      });
  }
}

// Video Play
function playVideo() {
  const videoContainer = document.querySelector(".video-player");
  const thumbnail = document.querySelector(".video-thumbnail");
  const iframe = document.createElement("iframe");

  iframe.width = "100%";
  iframe.height = "400";
  iframe.src = "https://www.youtube.com/embed/2ePf9rue1Ao?autoplay=1";
  iframe.title = "YouTube video tentang AI";
  iframe.frameBorder = "0";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  thumbnail.remove();
  videoContainer.prepend(iframe);
}

// Newsletter Form Submission
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput.value;

  // Simulate submission
  if (email) {
    const button = form.querySelector("button");
    const originalText = button.innerHTML;

    button.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
    button.style.background = "var(--success)";

    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = "";
      emailInput.value = "";

      // Show success message
      const successMsg = document.createElement("p");
      successMsg.className = "success-message";
      successMsg.textContent =
        "Terima kasih! Anda akan menerima newsletter kami.";
      successMsg.style.color = "var(--success)";
      successMsg.style.fontSize = "0.9rem";
      successMsg.style.marginTop = "10px";

      form.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    }, 2000);
  }
}

// Card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll(".card, .topic-card, .resource-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Initialize animations on scroll
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(
      ".topic-card, .resource-card, .article-section, .stat-bar"
    )
    .forEach((el) => {
      observer.observe(el);
    });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme
  initTheme();

  // Initialize animations
  initCardHoverEffects();
  initScrollAnimations();

  // Back to top button
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme);

  // Mobile theme toggle
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("change", toggleTheme);
  }

  // Mobile menu
  menuToggle.addEventListener("click", toggleMobileMenu);
  mobileClose.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking a link
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", toggleMobileMenu);
  });

  // Scroll events
  window.addEventListener("scroll", handleScroll);

  // Share button
  if (shareBtn) {
    shareBtn.addEventListener("click", shareArticle);
  }

  // Video play
  if (videoThumbnail) {
    videoThumbnail.addEventListener("click", playVideo);
  }

  // Newsletter forms
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", handleNewsletterSubmit);
  });

  // Initialize scroll position
  handleScroll();

  // Add animation class to stat bars
  setTimeout(() => {
    document.querySelectorAll(".stat-bar").forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    });
  }, 500);
});

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
  .animate-in {
    animation: fadeInUp 0.6s ease forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .success-message {
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

document.head.appendChild(style);
