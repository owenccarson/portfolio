document.addEventListener('DOMContentLoaded', function() {
    const stickyNav = document.getElementById('stickyNav');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 5) {
            stickyNav.classList.add('active');
        } else {
            stickyNav.classList.remove('active');
        }
    });
});