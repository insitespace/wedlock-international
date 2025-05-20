document.addEventListener('DOMContentLoaded', () => {

  // Select all image elements with the class .home-services_image
  const images = document.querySelectorAll('.home-booking_slider-image');

  // Loop through each image element
  images.forEach((image) => {
    gsap.to(image, {
      y: '10%', // Adjust the parallax effect as needed
      ease: 'power2.out',
      scrollTrigger: {
        trigger: image,
        start: 'top bottom', // Adjust the start position as needed
        end: 'bottom top', // Adjust the end position as needed
        scrub: true // Smoothly animates the element as you scroll
      }
    });
  });

  // Wait for Finsweet CMS to be ready
window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsfilter',
  (filterInstances) => {
    // Animate filtered items when filter changes
    filterInstances.forEach(filter => {
      filter.listInstance.on('renderitems', (renderedItems) => {
        // Animate newly rendered items
        renderedItems.forEach((item, index) => {
          // Reset any previous animations
          gsap.set(item.element, { 
            opacity: 0,
            y: 30
          });
          
          // Animate in with stagger
          gsap.to(item.element, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: 'power2.out'
          });
          
          // Animate image inner
          const imageInner = item.element.querySelector('.portfolio_image_inner, .tour-card_image_inner');
          if (imageInner) {
            gsap.set(imageInner, { scale: 1.1 });
            gsap.to(imageInner, {
              scale: 1,
              duration: 2,
              ease: 'power2.out',
              delay: index * 0.05
            });
          }
        });
      });
    });
    
    // Initial animation for all items on page load
    const items = document.querySelectorAll('.portfolio_item, .inputs_item-link');
    items.forEach((item, index) => {
      item.classList.add('is-visible');
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1
      });
      
      const imageInner = item.querySelector('.portfolio_image_inner, .tour-card_image_inner');
      if (imageInner) {
        gsap.to(imageInner, {
          scale: 1,
          duration: 3,
          ease: 'power2.out',
          delay: index * 0.1
        });
      }
    });
  }
]);
  
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
});
