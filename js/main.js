$(function () {
  const $section = $("#experience");
  const $clickBtn = $section.find(".click-btn");
  const $lightEffect = $section.find(".light-effect");

  // マウスが動いたとき
  $section.on("mousemove", function (e) {
    const offset = $section.offset();
    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;

    // circle-btnをマウス位置に追従
    $clickBtn.css({
      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
    });

    // light-effectも追従
    $lightEffect.css({
      left: x + 'px',
      top: y + 'px'
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
});

// 横スクロール
// document.addEventListener("DOMContentLoaded", () => {
//   const container = document.querySelector('.scroll-container');

//   if (!container) return;

//   container.addEventListener('wheel', (e) => {
//     // 縦方向のスクロールが優先されるときのみ処理
//     if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
//       // 横スクロール可能なときだけ実行
//       if (container.scrollWidth > container.clientWidth) {
//         e.preventDefault(); // ブラウザのデフォルト縦スクロールを止める
//         container.scrollLeft += e.deltaY; // ホイール縦操作を横に変換
//       }
//     }
//   }, { passive: false }); // ← preventDefault を有効にするために必要
// });
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.scroll-container');
  const nextSection = document.querySelector('.fall');

  //  ホイールで横スクロール
  container.addEventListener('wheel', (e) => {
    // Shiftキー押されてる or 縦方向の操作の時のみ横にスクロールさせる
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      if (container.scrollWidth > container.clientWidth) {
        e.preventDefault(); // ← これ効かせるには passive: false が必要（下に追加）
        container.scrollLeft += e.deltaY;
      }
    }
  }, { passive: false });

  //  一番右までスクロールしたら、次のセクションへ自動スクロール
  container.addEventListener('scroll', () => {
    const scrollEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
    if (scrollEnd) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});