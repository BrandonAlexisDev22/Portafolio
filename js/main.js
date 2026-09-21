document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle
  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = themeToggle?.querySelector("i")
  const root = document.documentElement

  const applyTheme = (theme) => {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark")
      themeIcon?.classList.replace("fa-moon", "fa-sun")
    } else {
      root.removeAttribute("data-theme")
      themeIcon?.classList.replace("fa-sun", "fa-moon")
    }
  }

  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"))

  themeToggle?.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark"
    const nextTheme = isDark ? "light" : "dark"
    applyTheme(nextTheme)
    localStorage.setItem("theme", nextTheme)
  })

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Navbar scroll effect
  const navbar = document.getElementById("navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.padding = "15px 0"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)"
    }
  })

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section")
  const navLinks2 = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks2.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })
  })

  // // Form submission
  // const contactForm = document.getElementById("contactForm")
  // if (contactForm) {
  //   contactForm.addEventListener("submit", (e) => {
  //     // e.preventDefault()

  //     // Get form values
  //     const name = document.getElementById("name").value
  //     const email = document.getElementById("email").value
  //     // const subject = document.getElementById("subject").value
  //     const message = document.getElementById("message").value

  //     // Here you would typically send the form data to a server
  //     // For now, we'll just log it to the console and show an alert
  //     console.log("Form submitted:", { name, email, message })

  //     // Show success message
  //     alert("¡Gracias por tu mensaje! Te contactaré pronto.")

  //     // Reset form
  //     contactForm.reset()
  //   })
  // }

  // Project card hover effect
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
    })
  })

  // Reveal sections on scroll
  const revealElements = document.querySelectorAll(".reveal")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view")
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  revealElements.forEach((el) => revealObserver.observe(el))

  // Back to top button
  const backToTop = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    backToTop?.classList.toggle("visible", window.scrollY > 400)
  })

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
})
