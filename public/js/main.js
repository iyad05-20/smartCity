// PRELOADER — only on initial load
window.addEventListener('load', () => { setTimeout(() => { document.getElementById('pl')?.classList.add('out') }, 1800) });

// SCROLL PROGRESS
const spb = document.getElementById('spb');
if (spb) {
    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        spb.style.width = (isNaN(pct) ? 0 : pct) + '%';
    }, { passive: true });
}

// LANG
function setLang(el) { document.querySelectorAll('.lb').forEach(b => b.classList.remove('on')); el.classList.add('on') }

// REVEAL — exposed globally so router.js can call it
function checkRv() {
    document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('vis')
    })
}
window.addEventListener('scroll', checkRv, { passive: true });
setTimeout(checkRv, 300);

// COUNT-UP — exposed globally with a reset function for SPA re-init
let counted = false;

function resetCount() {
    counted = false;
}

function startCount() {
    if (counted) return; counted = true;
    document.querySelectorAll('.ch-n[data-t]').forEach(el => {
        const t = +el.dataset.t, s = el.dataset.s || '';
        let v = 0; const step = Math.ceil(t / 60);
        const iv = setInterval(() => {
            v += step;
            if (v >= t) { v = t; clearInterval(iv); }
            el.innerHTML = v + (s ? `<span class="ch-s">${s}</span>` : '')
        }, 1600 / 60)
    })
}

const chiffresSection = document.querySelector('.chiffres-fs');
if (chiffresSection) {
    new IntersectionObserver(e => { if (e[0].isIntersecting) startCount() }, { threshold: .3 }).observe(chiffresSection);
}
