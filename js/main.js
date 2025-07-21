$(function () {
  const $section = $("#experience");
  const $clickBtn = $section.find(".click-btn");
  const $lightEffect = $section.find(".light-effect");

  // マウスが動いたとき
  $section.on("mousemove", function (e) {
    const offset = $section.offset();
    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;

    // click-btnをマウス位置に追従
    $clickBtn.css({
      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
    });

    // light-effectも追従
    $lightEffect.css({
      left: x + "px",
      top: y + "px",
    });
  });

  // セクションから離れたとき
  $section.on("mouseleave", function () {
    $clickBtn.css({ opacity: 0 });
    $lightEffect.css({ opacity: 0 });
  });

  // セクションに入ったとき
  $section.on("mouseenter", function () {
    $clickBtn.css({ opacity: 1 });
    $lightEffect.css({ opacity: 1 });
  });

  // スムーススクロール（#experience のみ特殊）
  // $('a[href^="#"]').on("click", function (e) {
  //   const speed = 100;
  //   const href = $(this).attr("href");
  //   const $target = href === "#" || href === "" ? $("html") : $(href);

  //   if (href === "#experience") {
  //     const position =
  //       $target.offset().top +
  //       $target.outerHeight() -
  //       $(window).height() +
  //       20;

  //     $("html, body").animate({ scrollTop: position }, speed, "swing");
  //   } else {
  //     const position = $target.offset().top;
  //     $("html, body").animate({ scrollTop: position }, speed, "swing");
  //   }

  //   e.preventDefault();
  // });
  $('a[href^="#"]').on("click", function (e) {
    const speed = 200;
    const href = $(this).attr("href");
    const $target = href === "#" || href === "" ? $("html") : $(href);

    let position;

    if (href === "#experience") {
      // experience → セクションの終わり近くに止まる
      position =
        $target.offset().top + $target.outerHeight() - $(window).height() + 20;
    } else if (href === "#voice") {
      // voice → 少し上に止める
      position = $target.offset().top - 200; // .voiceの停止位置を200px上にする
    } else {
      // それ以外 → 通常通り
      position = $target.offset().top;
    }

    $("html, body").animate({ scrollTop: position }, speed, "swing");
    e.preventDefault();
  });

  // フェードイン関数
  function fadeInVoice() {
    $(".voice").each(function () {
      const elemTop = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();

      if (scroll > elemTop - windowHeight + 100) {
        $(this).addClass("active");
      }
    });
  }

  // ページ読み込み時とスクロール時に発火
  $(window).on("scroll load", function () {
    fadeInVoice();
  });

  // ハンバーガーメニュー開閉
  $("#hamburger").on("click", function () {
    $(this).toggleClass("active");
    $("#neonMenu").toggleClass("active");
  });

  // マスク部分（menuの外側）をクリックしたら閉じる
  $("#neonMenu").on("click", function (e) {
    // メニュー本体以外がクリックされたら閉じる
    if (!$(e.target).closest(".menu-inner").length) {
      $(this).removeClass("active");
      $("#hamburger").removeClass("active");
    }
  });

  // ハンバーガー展開時、スクロール防止
  $("#hamburger").on("click", function () {
  $(this).toggleClass("active");
  $("#neonMenu").toggleClass("active");
  $("body").toggleClass("menu-open");
});


  // ロゴ画像の切り替え
  function switchLogo() {
    const logo = document.getElementById("responsive-logo");
    if (window.innerWidth <= 768) {
      logo.src = "img/logo-mobile.png";
    } else {
      logo.src = "img/logo-desktop.png";
    }
  }

  // 初回ロード時
  switchLogo();

  // ウィンドウサイズ変更時にも切り替える
  window.addEventListener("resize", switchLogo);
});
