// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");

mobileMenuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// State for selected driver type (initialized to first option)
let selectedDriverType = "single_trip";

// Function to toggle visibility of single-trip fields
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

// Initialize field visibility
toggleSingleTripFields();

// Update state and toggle fields when any radio is clicked
document.querySelectorAll('input[name="driverType"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    selectedDriverType = e.target.value;
    console.log("Updated driver type:", selectedDriverType); // For debugging
    toggleSingleTripFields();
  });
});

// Reusable form submission handler
function handleBookingSubmit(form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Include the state
    data.driverType = selectedDriverType;

    // Validation
    if (!data.name || !data.phone || !data.driverType) {
      alert(
        "Please fill in all required fields (Name, Phone, and Driver Type)."
      );
      return;
    }

    // Validate single-trip fields only if driverType is single_trip
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

    // Log data for debugging
    console.log("Booking data:", data);

    // Send to API (replace with your actual endpoint)
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
        selectedDriverType = "single_trip"; // Reset state
        toggleSingleTripFields(); // Reset field visibility
      } else {
        alert("There was an error submitting your booking. Please try again.");
      }
    } catch (error) {
      console.error("API error:", error);
      alert("There was a network error. Please try again.");
    }
  });
}

// Attach handler to both forms
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) handleBookingSubmit(bookingForm);

const bookingFormMobile = document.getElementById("bookingFormMobile");
if (bookingFormMobile) handleBookingSubmit(bookingFormMobile);

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      const icon = item.querySelector(".faq-icon");

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherIcon = otherItem.querySelector(".faq-icon");
          if (otherIcon) {
            otherIcon.src = "./assets/images/add.svg";
          }
        }
      });

      // Toggle current FAQ item
      item.classList.toggle("active");
      icon.src = isActive
        ? "./assets/images/add.svg"
        : "./assets/images/minus.svg";
    });
  });
}

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

// Set minimum date to today for both booking forms
const today = new Date().toISOString().split("T")[0];
const pickupDates = document.querySelectorAll("#pickupDate");
pickupDates.forEach((dateInput) => {
  dateInput.setAttribute("min", today);
});

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
