// SLIDER — exposed globally with initSlider() for SPA re-init
let cur = 0, tot = 0, timer;

function goSlide(i) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const track = document.getElementById('slides');
    if (!track || !slides.length) return;
    slides.forEach(s => s.classList.remove('act-slide'));
    dots.forEach(d => d.classList.remove('on'));
    track.style.transform = `translateX(-${i * 100}%)`;
    if (slides[i]) slides[i].classList.add('act-slide');
    if (dots[i]) dots[i].classList.add('on');
    cur = i;
}

function nextSlide() { goSlide((cur + 1) % tot) }
function prevSlide() { goSlide((cur - 1 + tot) % tot) }
function startAuto() { stopAuto(); timer = setInterval(nextSlide, 5000) }
function stopAuto() { clearInterval(timer) }

/** Initialize or re-initialize the slider (called by router.js after AJAX load) */
function initSlider() {
    stopAuto();
    cur = 0;
    const slides = document.querySelectorAll('.slide');
    tot = slides.length;
    if (!tot) return;

    const slider = document.querySelector('.hero-slider');
    if (slider) {
        // Remove old listeners by cloning (avoids duplicates)
        slider.onmouseenter = stopAuto;
        slider.onmouseleave = startAuto;
        startAuto();
    }
}

// Initial init on first page load
initSlider();
