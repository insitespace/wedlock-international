document.addEventListener('DOMContentLoaded', () => {
  // Set initial state immediately
  gsap.set('.portfolio_item, .inputs_item-link', {
    opacity: 0,
    y: 30
  });

  // Set initial scale for portfolio images
  gsap.set('.portfolio_image_inner', {
    scale: 1.1
  });

  // Create animation with ScrollTrigger
  const items = document.querySelectorAll('.portfolio_item, .inputs_item-link');
  items.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 70%',
      onEnter: () => {
        item.classList.add('is-visible');
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1
        });

        // Animate the portfolio image scale
        const imageInner = item.querySelector('.portfolio_image_inner');
        if (imageInner) {
          gsap.to(imageInner, {
            scale: 1,
            duration: 3,
            ease: 'power2.out',
            delay: index * 0.1
          });
        }
      },
      once: true // Animation only runs once
    });
  });
});
