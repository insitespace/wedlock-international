document.addEventListener('DOMContentLoaded', () => {
  window.Webflow ||= [];
  window.Webflow.push(() => {
    setTimeout(() => {
      // Select all elements with js-line-animation attribute
      const elements = document.querySelectorAll("[js-line-animation]");

      elements.forEach((textEl) => {
        // Store the original text content
        const textContent = textEl.textContent;
        let tl;

        // Set initial visibility
        gsap.set(textEl, { autoAlpha: 1 });

        function createSplitTextAnimation() {
          // Create a new SplitText instance
          const splitText = new SplitText(textEl, {
            type: "lines",
            linesClass: "line"
          });

          // Wrap each line's content in a line-inner span
          splitText.lines.forEach(line => {
            const lineContent = line.innerHTML;
            line.innerHTML = `<span class="line-inner" style="display: block;">${lineContent}</span>`;
          });

          // Create the timeline with ScrollTrigger
          tl = gsap.timeline({
            scrollTrigger: {
              trigger: textEl,
              start: "top bottom",
              end: "bottom bottom",
              toggleActions: "none play none reset"
            }
          });

          // Animate the lines
          tl.fromTo(
            textEl.querySelectorAll(".line-inner"),
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 0.6,
              stagger: { amount: 0.4, ease: "power1.out" }
            }
          );
        }

        // Initialize the split text animation
        createSplitTextAnimation();

        // Handle window resize to reapply the splitting
        let windowWidth = window.innerWidth;
        window.addEventListener("resize", function () {
          if (windowWidth !== window.innerWidth) {
            windowWidth = window.innerWidth;

            // Kill the previous timeline
            if (tl) tl.kill();

            // Revert the text to its original content
            textEl.textContent = textContent;

            // Create a new split text animation
            createSplitTextAnimation();
          }
        });
      });
    }, 700);
  });

  // Nav link animation code
  window.isMenuOpen = false; // Global flag to be used across scripts

  window.Webflow ||= [];
  window.Webflow.push(() => {
    const navLinks = document.querySelectorAll('.fs-menu-link, .fs-navbar_wrap');
    const fsNavbarMenuButton = document.querySelector('.fs-navbar_menu-button');

    if (navLinks.length && fsNavbarMenuButton) {
      gsap.set(navLinks, { opacity: 0.5, y: 100 });

      function animateNavLinks() {
        if (!window.isMenuOpen) {
          gsap.to(navLinks, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power2.out',
            delay: 0.4
          });
          window.isMenuOpen = true;
        } else {
          gsap.to(navLinks, {
            opacity: 0.5,
            y: 100,
            duration: 0.4,
            stagger: 0.02,
            ease: 'power2.out',
            onComplete: () => {
              window.isMenuOpen = false;
            }
          });
        }
      }

      fsNavbarMenuButton.addEventListener('click', animateNavLinks);
    }
  });
});
