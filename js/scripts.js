window.addEventListener('load', function () {
  const menu = document.querySelector('.menu');
  menu.addEventListener('click', function (e) {
    if (e.target.classList.contains('menu__link')) {
      e.preventDefault();

      const link = e.target;
      scrollToId(link.hash);

      try {
        menu
          .querySelector('.menu__link-active')
          .classList.remove('menu__link-active');
        link.classList.add('menu__link-active');
      } catch {}
    }
  });

  const scrollUpArrow = document.querySelector('.scrollUpArrow');
  scrollUpArrow.addEventListener('click', () => scrollToId('#menu'));

  let scrollTimeout;
  window.addEventListener('scroll', function (e) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => scrollHandler(e), 100);
  });

  function scrollHandler() {
    const scrolledPixels = this.scrollY;
    console.log(scrolledPixels);
    const fullHeight = document.body.scrollHeight;
    if (scrolledPixels > fullHeight * 0.6)
      scrollUpArrow.classList.add('scrollUpArrow-visible');
    else scrollUpArrow.classList.remove('scrollUpArrow-visible');

    const navigableAnchors = Array.from(document.querySelectorAll('h2'));
    const offsets = navigableAnchors.map((h2) => h2.offsetTop);
    const menuLinks = document.querySelectorAll('.menu__link');

    for (let i = offsets.length - 1; i >= 0; i--) {
      if (scrolledPixels > offsets[i] - 100) {
        const activeLink = document.querySelector('.menu__link-active');
        if (activeLink) activeLink.classList.remove('menu__link-active');
        navigableAnchors[i].classList.add('scrolled');
        menuLinks[i].classList.add('menu__link-active');
        break;
      } else {
        navigableAnchors[i].classList.remove('scrolled');
        menuLinks[i].classList.remove('menu__link-active');
      }
    }
  }

  if (window.location.hash) scrollToId(window.location.hash);
  // for direct links with anchor

  function scrollToId(id) {
    const target = document.querySelector(id) || menu; // if #anchor is not exist
    const style = getComputedStyle(menu);
    const offset =
      parseFloat(style.marginTop) +
      parseFloat(style.marginBottom) +
      parseFloat(style.borderTopWidth) +
      parseFloat(style.borderBottomWidth) +
      parseFloat(style.height);

    const top =
      target.id === 'menu'
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - offset - 10;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
});
