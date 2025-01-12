const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadNextPage();
  }
});

observer.observe(document.querySelector('#load-more-trigger'));
