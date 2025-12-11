// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Reveal Body
    document.body.classList.add('loaded');

    // --- CUSTOM CURSOR LOGIC ---
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    
    // Initial hide off-screen
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(cursorOutline, { xPercent: -50, yPercent: -50, opacity: 0 });

    let cursorVisible = false;

    window.addEventListener("mousemove", (e) => {
        if (!cursorVisible) {
            gsap.to([cursorDot, cursorOutline], { opacity: 1, duration: 0.3 });
            cursorVisible = true;
        }

        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        gsap.to(cursorDot, {
            x: posX,
            y: posY,
            duration: 0.1 // minimal lag
        });

        // Outline follows with lag
        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    // Hover Effects
    const hoverables = document.querySelectorAll("a, button, .timeline-content, .edu-box");
    hoverables.forEach(el => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("hovering");
            gsap.to(cursorOutline, { scale: 1.5, duration: 0.3 });
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("hovering");
            gsap.to(cursorOutline, { scale: 1, duration: 0.3 });
        });
    });

    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- HERO ANIMATIONS ---
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl.from(".hero-subtitle", { y: 20, opacity: 0, duration: 1, delay: 0.2 })
          .from(".hero-title", { y: 50, opacity: 0, duration: 1 }, "-=0.8")
          .from(".hero-summary", { y: 30, opacity: 0, duration: 1 }, "-=0.8")
          .from(".btn", { y: 20, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.6")
          .from(".hero-bg-text", { scale: 1.2, opacity: 0, duration: 2 }, "-=1.5");


    // --- PROGRESS BARS (EXPERTISE) ---
    gsap.utils.toArray(".skill-item").forEach(item => {
        const fill = item.querySelector(".progress-fill");
        const w = fill.style.getPropertyValue("--w");
        
        // Reset width
        fill.style.width = "0%";

        gsap.to(fill, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            },
            width: w,
            duration: 1.5,
            ease: "power2.inOut"
        });
    });

    // --- TIMELINE REVEALS ---
    gsap.utils.toArray(".timeline-entry").forEach(entry => {
        gsap.from(entry, {
            scrollTrigger: {
                trigger: entry,
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // --- GENERIC SECTION TITLES ---
    gsap.utils.toArray(".section-header").forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 85%"
            },
            y: 30,
            opacity: 0,
            duration: 0.8
        });
    });

    // --- EDUCATION GRID ---
    gsap.from(".edu-box", {
        scrollTrigger: {
            trigger: ".edu-grid",
            start: "top 85%"
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.2)"
    });

});
