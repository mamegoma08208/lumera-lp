//スマホメニュー
const menuBtn = document.querySelector(".menubtn");
const spNav = document.querySelector(".spnav");
const spLinks = document.querySelectorAll(".spnav a");

if (menuBtn && spNav) {  
  const toggleMenu = () => {
    menuBtn.classList.toggle("active");
    spNav.classList.toggle("is-open");
  };
  
  menuBtn.addEventListener("click", toggleMenu);

  spLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      spNav.classList.remove("is-open");
    });
  });
}

//フェード
const observerOptions = {
  root: null,
  rootMargin: "0px 0px -20% 0px",
  threshold: 0
};
const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const mqMobileFade = window.matchMedia("(max-width: 767px)");
const mqDesktopFade = window.matchMedia("(min-width: 768px)");
const campaignFadeEl = document.querySelector("#campaign .fade");

const targets = document.querySelectorAll(".fade, .fade-l, .fade-r, .fade-t, .fade-b");
targets.forEach(el => {
  // スマホのみ：OPEN記念キャンペーン枠は開いた瞬間にフェード（ビュー外でもスクロール不要）
  if (el === campaignFadeEl && mqMobileFade.matches) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add("active");
      });
    });
    return;
  }
  fadeObserver.observe(el);
});

// MVの文・ボックス・ボタンにもフェードを再適用（PC/SP共通）
const mvFadeTargets = [
  { selector: ".mv-card", fadeClass: "fade-l" },
  { selector: ".mv-copy", fadeClass: "fade-b" },
  { selector: ".mv .mv-lower > .btn", fadeClass: "fade-b", showOnDesktopImmediately: true }
];
mvFadeTargets.forEach(({ selector, fadeClass, showOnDesktopImmediately }) => {
  const el = document.querySelector(selector);
  if (!el) return;
  if (!el.classList.contains(fadeClass)) {
    el.classList.add(fadeClass);
  }
  // PCのみ：MVの予約ボタンはスクロール不要で初期表示
  if (showOnDesktopImmediately && mqDesktopFade.matches) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add("active");
      });
    });
    return;
  }
  fadeObserver.observe(el);
});

//ページトップ
const pageTopBtn = document.querySelector('.pagetop');
pageTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
  });
});
