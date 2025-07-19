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

