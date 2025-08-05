// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");

mobileMenuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector(".faq-icon");

    // Close other open FAQ items
    faqQuestions.forEach((otherQuestion) => {
      if (otherQuestion !== question) {
        const otherAnswer = otherQuestion.nextElementSibling;
        const otherIcon = otherQuestion.querySelector(".faq-icon");
        otherAnswer.classList.remove("active");
        otherIcon.classList.remove("rotate");
      }
    });

    // Toggle current FAQ item
    answer.classList.toggle("active");
    icon.classList.toggle("rotate");
  });
});

// Form Submission
const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(bookingForm);
  const data = Object.fromEntries(formData);

  // Simple validation
  if (
    !data.name ||
    !data.phone ||
    !data.pickupDate ||
    !data.pickupTime ||
    !data.pickupLocation ||
    !data.dropoffLocation
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  // Simulate form submission
  alert("Thank you for your booking request! We will contact you shortly.");
  bookingForm.reset();
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "var(--bg-white)";
    header.style.backdropFilter = "none";
  }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".feature-card, .service-card, .faq-item")
  .forEach((el) => {
    observer.observe(el);
  });

// Set minimum date to today for booking form
const today = new Date().toISOString().split("T")[0];
document.getElementById("pickupDate").setAttribute("min", today);

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    navMenu.classList.remove("active");
  }
});

// Newsletter form submission
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    if (email) {
      alert("Thank you for subscribing to our newsletter!");
      newsletterForm.querySelector('input[type="email"]').value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  });
}
