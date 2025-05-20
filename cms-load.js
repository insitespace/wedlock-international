document.addEventListener('DOMContentLoaded', function () {
  
  // Animate portfolio items on scroll
  const items = document.querySelectorAll('.portfolio_item, .inputs_item-link');
  items.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 80%',
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
      once: true
    });
  });
});
