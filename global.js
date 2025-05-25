window.Webflow ||= [];
window.isMenuOpen = false;

window.Webflow.push(() => {
  // 1. SplitText Animation (Global)
  setTimeout(() => {
    const elements = document.querySelectorAll("[js-line-animation]");

    elements.forEach((textEl) => {
      const textContent = textEl.textContent;
      let tl;

      gsap.set(textEl, { autoAlpha: 1 });

      function createSplitTextAnimation() {
        const splitText = new SplitText(textEl, {
          type: "lines",
          linesClass: "line"
        });

        splitText.lines.forEach(line => {
          const lineContent = line.innerHTML;
          line.innerHTML = `<span class="line-inner" style="display: block;">${lineContent}</span>`;
        });

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: textEl,
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "none play none reset"
          }
        });

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

      createSplitTextAnimation();

      let windowWidth = window.innerWidth;
      window.addEventListener("resize", () => {
        if (windowWidth !== window.innerWidth) {
          windowWidth = window.innerWidth;
          if (tl) tl.kill();
          textEl.textContent = textContent;
          createSplitTextAnimation();
        }
      });
    });
  }, 700);

  // 2. Nav Menu Animation (Global)
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

