// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation for navigation menu items
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = 'scale(1.1)';
        link.style.transition = 'transform 0.3s ease';
    });
    link.addEventListener('mouseout', () => {
        link.style.transform = 'scale(1)';
    });
});

// Animation for profile section
const profileSection = document.querySelector('#Profile');
const profileImg = document.querySelector('.profile-img');
const introduction = document.querySelector('.introduction');

window.addEventListener('scroll', () => {
    const profilePosition = profileSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (profilePosition < screenPosition) {
        profileImg.style.animation = 'fadeIn 1s ease forwards';
        introduction.style.animation = 'slideIn 1s ease forwards';
    }
});

// Animation for skills section
const skillSection = document.querySelector('#Skills');
const skillImages = document.querySelectorAll('.skill-image');

window.addEventListener('scroll', () => {
    const skillPosition = skillSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (skillPosition < screenPosition) {
        skillImages.forEach((img, index) => {
            img.style.animation = `bounceIn 0.5s ease forwards ${index * 0.2}s`;
        });
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formGroups = document.querySelectorAll('.form-group');

// Add animation to form elements when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

formGroups.forEach(group => {
    group.style.opacity = '0';
    observer.observe(group);
});

// Form submission handling (sending to backend)
const submitBtn = contactForm.querySelector(".submit-btn");
const statusDiv = document.createElement("div"); // to show status messages
contactForm.appendChild(statusDiv);

contactForm.addEventListener("submit", async function(e) {
    e.preventDefault(); // prevent page reload

    // Collect form data
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    // Disable button while sending
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
        const response = await fetch("https://localhost:5001/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Show success message below the form
        statusDiv.textContent = result.status;
        statusDiv.style.color = "green";

        // Reset form
        contactForm.reset();
    } catch (error) {
        console.error(error);
        statusDiv.textContent = "Error sending message!";
        statusDiv.style.color = "red";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
    }
});


// Add hover effect to form inputs
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateX(5px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateX(0)';
    });
}); 