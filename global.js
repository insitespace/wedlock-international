// Select the nav link items
const navLinks = document.querySelectorAll('.fs-menu-link, .fs-navbar_wrap');
let isMenuOpen = false;

// Set initial properties for the nav link items
gsap.set(navLinks, { opacity: .5, y: 100 });

// Function to animate nav link items with a delay
function animateNavLinks() {
  if (!isMenuOpen) {
    gsap.to(navLinks, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power2.out',
      delay: 0.4, // Delay the animation by 1.5 seconds
    });
    isMenuOpen = true;
  } else {
    gsap.to(navLinks, {
      opacity: .5,
      y: 100,
      duration: 0.4,
      stagger: 0.02,
      ease: 'power2.out',
      onComplete: () => {
        isMenuOpen = false;
      },
    });
  }
}

// Call the animateNavLinks function when .fs-navbar_menu-button is clicked
const fsNavbarMenuButton = document.querySelector('.fs-navbar_menu-button');
fsNavbarMenuButton.addEventListener('click', animateNavLinks);

// Initialize dropdown animations
function initNavDropdowns() {
  // Hide all dropdown lists initially
  gsap.set('.nav-dropdown_list', {
    autoAlpha: 0,
    display: 'none'
  });

  // Set initial state of dropdown items
  gsap.set('.nav-dropdown_link-item', {
    y: 20,
    opacity: 0
  });

  // Set initial state of dropdown cards - starting from top
  gsap.set('.nav-dropdown_card', {
    y: -20,
    opacity: 0
  });

  // Add event listeners to each dropdown
  document.querySelectorAll('.nav-ink_dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', showNavDropdown);
    dropdown.addEventListener('mouseleave', hideNavDropdown);
  });
}

// Show dropdown animation
function showNavDropdown() {
  const dropdownList = this.querySelector('.nav-dropdown_list');
  const dropdownLinks = this.querySelectorAll('.nav-dropdown_link-item');
  const dropdownCards = this.querySelectorAll('.nav-dropdown_card');

  // First display the dropdown menu
  gsap.set(dropdownList, { display: 'block' });

  // Create a timeline for smooth animation
  const tl = gsap.timeline();

  // Animate the dropdown container
  tl.to(dropdownList, {
    duration: 0.3,
    autoAlpha: 1,
    ease: 'power2.out'
  });

  // Animate cards sliding in from top
  tl.to(dropdownCards, {
    duration: 0.4,
    y: 0,
    opacity: 1,
    stagger: 0.08,
    ease: 'back.out(1.7)'
  }, '-=0.2'); // Slight overlap with container animation

  // Animate each dropdown link sliding in from bottom
  tl.to(dropdownLinks, {
    duration: 0.4,
    y: 0,
    opacity: 1,
    stagger: 0.08,
    ease: 'back.out(1.7)'
  }, '-=0.3'); // More overlap for parallel animation effect
}

// Hide dropdown animation
function hideNavDropdown() {
  const dropdownList = this.querySelector('.nav-dropdown_list');
  const dropdownLinks = this.querySelectorAll('.nav-dropdown_link-item');
  const dropdownCards = this.querySelectorAll('.nav-dropdown_card');

  const tl = gsap.timeline({
    onComplete: () => gsap.set(dropdownList, { display: 'none' })
  });

  // Animate links out first (back to bottom)
  tl.to(dropdownLinks, {
    duration: 0.2,
    y: 10,
    opacity: 0,
    stagger: 0.05,
    ease: 'power2.in'
  });

  // Animate cards out (back to top)
  tl.to(dropdownCards, {
    duration: 0.2,
    y: -10,
    opacity: 0,
    stagger: 0.05,
    ease: 'power2.in'
  }, '-=0.15');

  // Then hide the dropdown container
  tl.to(dropdownList, {
    duration: 0.2,
    autoAlpha: 0,
    ease: 'power2.in'
  }, '-=0.1');
}

// Initialize the animations
initNavDropdowns();

// Text animation code
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

