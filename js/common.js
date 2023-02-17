let echo = new Echo();

let pointTimer = 0;

let gruopIndex = 0;

echo.on('print', function(chr) {
    if (gruopIndex == 0) {
        $('.echo-output').append(chr);
    } else {
        $(`.echo-output span[data-group="${gruopIndex}"]`).append(chr);
    }
});

echo.on('clear', function() {
    $('.echo-output').html('');
});

echo.on('printStart', function() {
    clearTimeout(pointTimer);
    $('.echo-point').removeClass('hide');
    $('.echo-point').removeClass('end');
    $('.echo-point').addClass('active');
});

echo.on('printEnd', function() {
    // 整理字符串
    $('.echo-output').html($('.echo-output').html());
    // 添加结束样式
    $('.echo-point').addClass('end');
    // 定时移除动画
    pointTimer = setTimeout(function() {
        $('.echo-point').removeClass('active');
    } ,2000);
});

echo.on('backspace', function() {
    let str = $('.echo-output').text();
    $('.echo-output').text(str.substring(0, str.length - 1));
});

echo.on('groupStart', function(e) {
    gruopIndex = e.groupNow;
    let d = msgStyleGenerator(e.data);
    $('.echo-output').append(`<span data-group="${gruopIndex}" class="${d.class}" style="${d.style}"></span>`);
});

echo.on('groupEnd', function(e) {
    gruopIndex = e.groupNow;
});

function msgStyleGenerator(data) {
    let cls = '';
    let style = '';
    if (data?.color) style += `color: ${data.color}; --echo-span-color: ${data.color};; `;
    if (data?.bold) cls += 'echo-text-bold '
    if (data?.underline) cls += 'echo-text-underline '

    return {
        class: cls,
        style: style
    }
}