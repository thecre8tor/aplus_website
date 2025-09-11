// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");

if (mobileMenuToggle && navMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when clicking outside
if (navMenu && mobileMenuToggle) {
  document.addEventListener("click", (e) => {
    if (
      !navMenu.contains(e.target) &&
      !mobileMenuToggle.contains(e.target) &&
      !e.target.closest(".faq-item")
    ) {
      navMenu.classList.remove("active");
    }
  });
}

// Experience Section
const arrowUp = document.getElementById("arrow_up");
const arrowDown = document.getElementById("arrow_down");
const experienceFeature = document.querySelector(".experience-feature");
const stepNumbers = document.querySelectorAll(".step-number");

let experienceIndex = 0;
const experienceContent = [
  {
    title: "Affordable Rates",
    description:
      "Enjoy competitive pricing without compromising quality get where you need to go, affordably",
  },
  {
    title: "Reliable Service",
    description:
      "Our drivers are punctual and professional, ensuring you reach your destination on time",
  },
  {
    title: "Comfortable Rides",
    description:
      "Experience a smooth and comfortable journey with our well-maintained vehicles",
  },
];

const updateExperienceContent = () => {
  if (!experienceFeature) return;
  const currentContent = experienceContent[experienceIndex];
  experienceFeature.innerHTML = `
    <div style="width: 264px">
      <h4 style="font-size: 22px; font-weight: 500">${currentContent.title}</h4>
      <p>${currentContent.description}</p>
    </div>
  `;
  stepNumbers.forEach((step, index) => {
    step.style.background =
      index === experienceIndex ? "#FFC107" : "transparent";
  });
};

if (stepNumbers.length > 0) {
  stepNumbers.forEach((step) => {
    step.addEventListener("click", () => {
      experienceIndex = parseInt(step.dataset.index);
      updateExperienceContent();
    });
  });
}

const increaseExperienceIndex = () => {
  if (experienceIndex >= 2) {
    experienceIndex = 0;
  } else {
    experienceIndex++;
  }
  updateExperienceContent();
};

const decreaseExperienceIndex = () => {
  if (experienceIndex <= 0) {
    experienceIndex = 2;
  } else {
    experienceIndex--;
  }
  updateExperienceContent();
};

if (arrowUp) {
  arrowUp.addEventListener("click", increaseExperienceIndex);
}
if (arrowDown) {
  arrowDown.addEventListener("click", decreaseExperienceIndex);
}

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {
  console.log("FAQ items found:", faqItems.length);
  faqItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log("FAQ item clicked:", item);
      const isActive = item.classList.contains("active");
      const icon = item.querySelector(".faq-icon");
      const answer = item.querySelector(".faq-answer");

      if (!icon || !answer) {
        console.error("Missing icon or answer for item:", item);
        return;
      }

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherIcon = otherItem.querySelector(".faq-icon");
          const otherAnswer = otherItem.querySelector(".faq-answer");
          if (otherIcon && otherAnswer) {
            otherIcon.src = "./assets/images/add.svg";
            otherAnswer.style.maxHeight = "0";
          }
        }
      });

      item.classList.toggle("active");
      icon.src = isActive
        ? "./assets/images/add.svg"
        : "./assets/images/minus.svg";
      answer.style.maxHeight = isActive ? "0" : `${answer.scrollHeight}px`;
    });
  });
}

// Form Submission
let selectedDriverType = "single_trip";

function toggleSingleTripFields() {
  const forms = [
    document.getElementById("bookingForm"),
    document.getElementById("bookingFormMobile"),
  ];
  forms.forEach((form) => {
    if (form) {
      const singleTripFields = form.querySelectorAll(".single-trip-fields");
      singleTripFields.forEach((field) => {
        field.style.display =
          selectedDriverType === "single_trip" ? "flex" : "none";
      });
    }
  });
}

toggleSingleTripFields();

document.querySelectorAll('input[name="driverType"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    selectedDriverType = e.target.value;
    console.log("Updated driver type:", selectedDriverType);
    toggleSingleTripFields();
  });
});

function handleBookingSubmit(form) {
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.driverType = selectedDriverType;

    if (!data.name || !data.phone || !data.driverType) {
      alert(
        "Please fill in all required fields (Name, Phone, and Driver Type)."
      );
      return;
    }

    if (data.driverType === "single_trip") {
      if (
        !data.pickupDate ||
        !data.pickupTime ||
        !data.pickupLocation ||
        !data.dropoffLocation
      ) {
        alert(
          "Please fill in all required fields for a single trip (Pickup Date, Time, Location, and Dropoff Location)."
        );
        return;
      }
    }

    console.log("Booking data:", data);

    try {
      const response = await fetch("https://api.example.com/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert(
          "Thank you for your booking request! We will contact you shortly."
        );
        form.reset();
        selectedDriverType = "single_trip";
        toggleSingleTripFields();
      } else {
        alert("There was an error submitting your booking. Please try again.");
      }
    } catch (error) {
      console.error("API error:", error);
      alert("There was a network error. Please try again.");
    }
  });
}

const bookingForm = document.getElementById("bookingForm");
if (bookingForm) handleBookingSubmit(bookingForm);

const bookingFormMobile = document.getElementById("bookingFormMobile");
if (bookingFormMobile) handleBookingSubmit(bookingFormMobile);

// Smooth Scrolling
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
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background = "var(--bg-white)";
      header.style.backdropFilter = "none";
    }
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

document
  .querySelectorAll(".feature-card, .service-card, .faq-item")
  .forEach((el) => {
    observer.observe(el);
  });

// Set minimum date for booking forms
const today = new Date().toISOString().split("T")[0];
const pickupDates = document.querySelectorAll("#pickupDate");
pickupDates.forEach((dateInput) => {
  dateInput.setAttribute("min", today);
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
