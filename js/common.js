/* ==========================================================================
   MODOO MATH - 공통 요소 (헤더/푸터)
   사용법:
     <div id="header"></div> ... <div id="footer"></div> 를 페이지에 두고
     <script src="js/common.js" data-root="./"></script> 로 불러옵니다.
     - 루트 페이지:  data-root="./"
     - 서브 페이지:  data-root="../"
   메뉴 활성 표시: <body data-page="service"> 처럼 페이지 키를 지정하세요.
   (헤더/푸터 내용 수정은 이 파일에서 한 번만 하면 모든 페이지에 적용됩니다)
   ========================================================================== */
(function () {
  var ROOT = (document.currentScript && document.currentScript.dataset.root) || './';

  /* ---------- 헤더 ---------- */
  var HEADER_HTML =
    '<div class="container header-inner">' +
    '  <a href="' + ROOT + 'index.html" class="logo">' +
    '    <img src="' + ROOT + 'images/logo.png" alt="모두매쓰">' +
    '  </a>' +
    '  <ul class="gnb">' +
    '    <li><a href="' + ROOT + 'sub/service.html" data-key="service">서비스소개</a></li>' +
    '    <li><a href="' + ROOT + 'sub/feature.html" data-key="feature">기능</a></li>' +
    '    <li><a href="' + ROOT + 'sub/pricing.html" data-key="pricing">요금제</a></li>' +
    '    <li><a href="' + ROOT + 'sub/review.html"  data-key="review">고객후기</a></li>' +
    '  </ul>' +
    '  <div class="header-util">' +
    '    <a href="' + ROOT + 'sub/login.html">회원가입</a>' +
    '    <a href="' + ROOT + 'sub/login.html" class="util-login">로그인</a>' +
    '  </div>' +
    '  <button class="burger" aria-label="메뉴 열기"><i></i><i></i><i></i></button>' +
    '</div>' +
    /* 모바일 메뉴 */
    '<nav class="m-nav">' +
    '  <a href="' + ROOT + 'sub/service.html" data-key="service">서비스소개</a>' +
    '  <a href="' + ROOT + 'sub/feature.html" data-key="feature">기능</a>' +
    '  <a href="' + ROOT + 'sub/pricing.html" data-key="pricing">요금제</a>' +
    '  <a href="' + ROOT + 'sub/review.html"  data-key="review">고객후기</a>' +
    '  <div class="m-util"><a href="' + ROOT + 'sub/login.html">회원가입</a><a href="' + ROOT + 'sub/login.html">로그인</a></div>' +
    '</nav>' +
    '<div class="dim"></div>';

  /* ---------- 푸터 ---------- */
  var FOOTER_HTML =
    '<div class="container footer-inner">' +
    '  <div class="footer-info">' +
    '    <div class="logo"><img src="' + ROOT + 'images/foot_logo.png" alt="모두매쓰"></div>' +
    '    <p>' +
    '      (주)스마트앤패스트<br>' +
    '      사업자등록번호 : 664-81-03042 &nbsp;|&nbsp; 대표 이사 : 정찬영<br>' +
    '      서울특별시 강남구 테헤란로2길 27 FASTFIVE 10F<br>' +
    '      문의 사항 : smartnfast1@gmail.com' +
    '    </p>' +
    '    <p class="copy">© Modoo Math Inc. 2026 All Rights Reserved.</p>' +
    '  </div>' +
    '  <div class="footer-side">' +
    '    <div class="app-badges">' +
    '      <a href="#none" class="badge-btn">' +
    '        <img src="' + ROOT + 'images/foot_ico1.png" alt="">' +
    '        <span><small>다운로드 하기</small><b>App Store</b></span>' +
    '      </a>' +
    '      <a href="#none" class="badge-btn">' +
    '        <img src="' + ROOT + 'images/foot_ico2.png" alt="">' +
    '        <span><small>다운로드 하기</small><b>Google Play</b></span>' +
    '      </a>' +
    '    </div>' +
    '    <div class="sns">' +
    '      <a href="#none" aria-label="YouTube"><img src="' + ROOT + 'images/foot_sns1.png" alt=""></a>' +
    '      <a href="#none" aria-label="Instagram"><img src="' + ROOT + 'images/foot_sns2.png" alt=""></a>' +
    '      <a href="#none" aria-label="KakaoTalk"><img src="' + ROOT + 'images/foot_sns3.png" alt=""></a>' +
    '      <a href="#none" aria-label="X"><img src="' + ROOT + 'images/foot_sns4.png" alt=""></a>' +
    '    </div>' +
    '  </div>' +
    '</div>';

  function init() {
    var header = document.getElementById('header');
    var footer = document.getElementById('footer');
    if (header) header.innerHTML = HEADER_HTML;
    if (footer) footer.innerHTML = FOOTER_HTML;

    /* 현재 페이지 메뉴 활성화 */
    var page = document.body.dataset.page;
    if (page) {
      document.querySelectorAll('[data-key="' + page + '"]').forEach(function (a) {
        a.classList.add('is-active');
      });
    }

    /* 헤더 스크롤 상태 */
    var onScroll = function () {
      header && header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* 모바일 메뉴 토글 */
    var burger = document.querySelector('.burger');
    var mNav = document.querySelector('.m-nav');
    var dim = document.querySelector('.dim');
    function toggleMenu(open) {
      burger.classList.toggle('is-open', open);
      mNav.classList.toggle('is-open', open);
      dim.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    if (burger) {
      burger.addEventListener('click', function () {
        toggleMenu(!burger.classList.contains('is-open'));
      });
      dim.addEventListener('click', function () { toggleMenu(false); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
