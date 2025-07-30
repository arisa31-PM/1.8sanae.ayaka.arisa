$(function () {

  const $section = $("#experience");

  const $clickBtn = $section.find(".click-btn");

  const $clickBtnSp = $section.find(".click-btn-sp");

  const $lightEffect = $section.find(".light-effect");

  const $hoverPc = $section.find(".hover-text.hover-pc");

  const $hoverSp = $section.find(".hover-text.hover-sp");



  const isMobile = window.innerWidth <= 768;



  if (!isMobile) {

    $section.on("mousemove", function (e) {

      const offset = $section.offset();

      const x = e.pageX - offset.left;

      const y = e.pageY - offset.top;



      $clickBtn.css({ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` });

      $lightEffect.css({ left: x + "px", top: y + "px" });

    });



    $section.on("mouseleave", function () {

      $clickBtn.css({ opacity: 0 });

      $lightEffect.css({ opacity: 0 });

    });



    $section.on("mouseenter", function () {

      $clickBtn.css({ opacity: 1 });

      $lightEffect.css({ opacity: 1 });

    });



    $clickBtn.show();

    $clickBtnSp.hide();

    $hoverPc.show();

    $hoverSp.hide();

  } else {

    $clickBtn.hide();

    $clickBtnSp.show();

    $lightEffect.hide();

    $hoverPc.hide();

    $hoverSp.show();

  }


  // スムーズスクロール

  $('a[href^="#"]').on("click", function (e) {

    const speed = 200;

    const href = $(this).attr("href");

    const $target = href === "#" || href === "" ? $("html") : $(href);

    let position;



    if (href === "#experience") {

      position = $target.offset().top + $target.outerHeight() - $(window).height() + 20;

    } else if (href === "#voice") {

      position = $target.offset().top - 200;

    } else {

      position = $target.offset().top;

    }



    $("html, body").animate({ scrollTop: position }, speed, "swing");

    e.preventDefault();

  });


  // VOICE セクションのフェードイン

  function fadeInVoice() {

    $(".voice").each(function () {

      const elemTop = $(this).offset().top;

      const elemBottom = elemTop + $(this).outerHeight();

      const scrollTop = $(window).scrollTop();

      const windowHeight = $(window).height();

      const isVisible = scrollTop + windowHeight > elemTop + 100 && scrollTop < elemBottom - 100;



      const $slider = $(this).hasClass("slider-left") || $(this).hasClass("slider-right")

        ? $(this)

        : $(this).find(".slider-left, .slider-right");



      if (isVisible) {

        $slider.addClass("active");

      } else {

        $slider.removeClass("active");

      }

    });

  }



  $(window).on("scroll load", fadeInVoice);


  // ハンバーガーメニュー

  $("#hamburger").on("click", function () {

    $(this).toggleClass("active");

    $("#neonMenu").toggleClass("active");

    $("body").toggleClass("menu-open");

    $("#leafIcon").toggleClass("open");

  });



  $("#neonMenu").on("click", function (e) {

    if (!$(e.target).closest(".menu-inner").length) {

      $(this).removeClass("active");

      $("#hamburger").removeClass("active");

      $("body").removeClass("menu-open");

      $("#leafIcon").removeClass("open");

    }

  });



  $(".menu-inner a").on("click", function () {

    $("#neonMenu").removeClass("active");

    $("#hamburger").removeClass("active");

    $("body").removeClass("menu-open");

    $("#leafIcon").removeClass("open");

  });

  // 横スクロールセクション
  $(function () {
    const container = document.querySelector('.scroll-container');
    const nextSection = document.querySelector('.fall');
    const header = document.getElementById("header");
    const footer = document.querySelector("footer");
    const isMobile = window.innerWidth <= 768;
    let isHorizontalScrollActive = false;

    // 横スクロール制御 (PC)
    if (container) {
      container.addEventListener('wheel', (e) => {
        if (!isMobile) { // PCの場合は横スクロール
          e.preventDefault(); // 縦スクロールを無効に
          if (!isHorizontalScrollActive) {
            // 横スクロールの前に縦スクロールを完全に無効化
            if (container.scrollTop === 0 || container.scrollTop === container.scrollHeight - container.clientHeight) {
              isHorizontalScrollActive = true; // 横スクロールを有効にする
            }
          }

          // 横スクロールが有効な場合、横スクロール
          if (isHorizontalScrollActive) {
            container.scrollLeft += e.deltaY; // 横スクロール処理
          }
        }
      }, { passive: false });
    }

    // 横スクロールが終わったら次のセクションにスクロール
    if (nextSection) {
      container.addEventListener('scroll', () => {
        const scrollEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        if (scrollEnd) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }


    // フッターが見えたらヘッダー非表示
    if (header && footer) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              header.classList.add("unfixed");
            } else {
              header.classList.remove("unfixed");
            }
          });
        },
        { root: null, threshold: 0 }
      );
      observer.observe(footer);
    } else {
      console.log("ヘッダーまたはフッターが見つかりませんでした。");
    }

    // モバイルでは縦スクロールを有効にし、横スクロールを無効化
    if (isMobile) {
      document.querySelector('.horizontal-section').addEventListener('wheel', function (e) {
        if (e.deltaY !== 0) {
          e.preventDefault(); // 横スクロール無効化
          window.scrollBy(0, e.deltaY); // 縦スクロールを有効にする
        }
      }, { passive: false });
    }
  });
})
