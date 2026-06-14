/* ==========================================================================
   MODOO MATH - 메인 스크립트 (Swiper + GSAP ScrollTrigger)
   ========================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ======================================================
       1. 히어로 Swiper + 진행 프로그레스바
       ====================================================== */
    var progressFill = document.querySelector('.hero-progress .bar i');
    var fracCur = document.querySelector('.hero-progress .cur');
    var fracTotal = document.querySelector('.hero-progress .total');

    if (document.querySelector('.hero-swiper')) {
      var heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        speed: 800,
        autoplay: { delay: 5000, disableOnInteraction: false },
        on: {
          init: function (sw) {
            if (fracTotal) fracTotal.textContent = sw.slides.length;
            animateHeroContent(sw);
          },
          slideChangeTransitionStart: function (sw) {
            if (fracCur) fracCur.textContent = sw.realIndex + 1;
            animateHeroContent(sw);
          },
          /* 자동재생 남은 시간 → 프로그레스바 폭으로 표시 */
          autoplayTimeLeft: function (sw, time, progress) {
            if (progressFill) progressFill.style.width = (1 - progress) * 100 + '%';
          }
        }
      });
    }

    /* 슬라이드 전환 시 텍스트 등장 모션 */
    function animateHeroContent(sw) {
      if (typeof gsap === 'undefined') return;
      var active = sw.slides[sw.activeIndex];
      if (!active) return;
      var items = active.querySelectorAll('.eyebrow, h1, p, .btn');
      gsap.fromTo(items,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      );
    }

    /* ======================================================
       1-2. 이미지 자동 로테이션 (.img-rotator)
       data-images="경로1, 경로2..." / data-interval="2600"
       ====================================================== */
    document.querySelectorAll('.img-rotator').forEach(function (box) {
      var srcs = (box.dataset.images || '').split(',')
        .map(function (s) { return s.trim(); })
        .filter(Boolean);
      if (!srcs.length) return;

      var interval = Number(box.dataset.interval) || 2600;
      box.innerHTML = '';

      var imgs = srcs.map(function (src, i) {
        var im = document.createElement('img');
        im.src = src;
        im.alt = '';
        im.className = 'rot-img' + (i === 0 ? ' is-show' : '');
        box.appendChild(im);
        return im;
      });

      var cur = 0, timer = null;

      function go(n) {
        n = (n + imgs.length) % imgs.length;
        if (n === cur) return;
        var prev = imgs[cur], next = imgs[n];
        cur = n;
        if (window.gsap) {
          gsap.fromTo(next, { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.out' });
          gsap.to(prev, { opacity: 0, duration: 0.5, ease: 'power2.out' });
        }
        next.classList.add('is-show');
        prev.classList.remove('is-show');
      }
      function start() { stop(); timer = setInterval(function () { go(cur + 1); }, interval); }
      function stop() { clearInterval(timer); }

      /* 사용자 조작 없이 계속 자동 반복 */
      start();
    });

    /* ======================================================
       2. GSAP ScrollTrigger
       ====================================================== */
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('gsap-on');

    /* --- 기본 페이드업 --- */
    gsap.utils.toArray('[data-ani="fade-up"]').forEach(function (el) {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );
    });

    /* --- 카드 스태거 (후기/요금제) --- */
    gsap.utils.toArray('[data-ani="stagger"]').forEach(function (wrap) {
      gsap.fromTo(wrap.children,
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: wrap, start: 'top 82%', toggleActions: 'play none none reverse' },
          onStart: function () { wrap.style.opacity = 1; }
        }
      );
      gsap.set(wrap, { opacity: 1 });
    });

    /* --- 이유 섹션: 이미지/텍스트 좌우 교차 등장 + 이미지 패럴랙스 --- */
    gsap.utils.toArray('[data-ani="row"]').forEach(function (row) {
      var visual = row.querySelector('[data-ani-child="visual"]');
      var text = row.querySelector('[data-ani-child="text"]');
      var reverse = row.classList.contains('is-reverse');

      gsap.set(row, { opacity: 1 });

      var tl = gsap.timeline({
        scrollTrigger: { trigger: row, start: 'top 78%', toggleActions: 'play none none reverse' }
      });
      tl.fromTo(visual,
        { x: reverse ? 80 : -80, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      ).fromTo(text,
        { x: reverse ? -60 : 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.7'
      );

      /* 스크롤 패럴랙스 */
      gsap.to(visual, {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    });

    /* --- 히어로 콘텐츠 살짝 패럴랙스 아웃 --- */
    var hero = document.querySelector('.hero');
    if (hero) {
      gsap.to('.hero-content', {
        y: 120, opacity: 0.3, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    /* ======================================================
       3. 기능 소개 탭 인터랙션
       ====================================================== */
    var tabBtns = document.querySelectorAll('.feature-tabs button');
    var panels = document.querySelectorAll('.feature-panel');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = Number(btn.dataset.tab);
        tabBtns.forEach(function (b) { b.classList.remove('is-active'); });
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var panel = panels[idx];
        panel.classList.add('is-active');
        /* 패널 전환 모션 */
        gsap.fromTo(panel.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
        );
      });
    });

    /* 뷰포트 안에 이미 들어와 있는 콘텐츠는 무조건 노출
       (모바일 주소창 변화로 ScrollTrigger가 누락돼 빈 화면이 되는 현상 방지) */
    function revealInView() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      gsap.utils.toArray('[data-ani]').forEach(function (el) {
        if (el.getBoundingClientRect().top < vh * 0.98) {
          gsap.set(el, { opacity: 1, y: 0, x: 0 });
          /* stagger/row 등 자식이 따로 숨겨지는 경우까지 노출 */
          if (el.children.length) gsap.set(el.children, { opacity: 1, y: 0, x: 0, scale: 1 });
        }
      });
    }

    /* 동적 콘텐츠(헤더 등) 삽입 후 트리거 위치 재계산 + 노출 보정 */
    window.addEventListener('load', function () { ScrollTrigger.refresh(); revealInView(); });
    window.addEventListener('resize', revealInView, { passive: true });
    /* 폰트/이미지 로딩 지연 대비 최종 안전장치 */
    setTimeout(function () { ScrollTrigger.refresh(); revealInView(); }, 1000);
    revealInView();
  });
})();
