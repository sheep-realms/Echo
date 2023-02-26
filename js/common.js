let echo = new Echo();

let pointTimer = 0;

let gruopIndex = 0;

let state = 'stop'

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
    setState('play');
    clearTimeout(pointTimer);
    $('.echo-point').removeClass('hide');
    $('.echo-point').removeClass('end');
    $('.echo-point').addClass('active');
    $('.echo-output').removeClass('hide');
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
    setState('stop');
});

echo.on('backspace', function() {
    let str = '';
    if (gruopIndex == 0) {
        str = $('.echo-output').html();
        $('.echo-output').html(str.substring(0, str.length - 1));
    } else {
        str = $(`.echo-output span[data-group="${gruopIndex}"]`).html();
        $(`.echo-output span[data-group="${gruopIndex}"]`).html(str.substring(0, str.length - 1));
    }
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
    if (data?.class) {
        cls = data.class + ' ';
    }
    let style = '';
    if (data?.typewrite) cls += 'echo-text-typewrite '
    if (data?.style) {
        if (data.style?.color) style += `color: ${data.style.color}; --echo-span-color: ${data.style.color}; `;
        if (data.style?.bold) cls += 'echo-text-bold '
        if (data.style?.italic) cls += 'echo-text-italic '
        if (data.style?.underline) cls += 'echo-text-underline '
        if (data.style?.rock) cls += 'echo-text-rock-' + data.style.rock + ' '
    }

    return {
        class: cls,
        style: style
    }
}

echo.on('typewriteEnd', function() {
    $('.echo-output .echo-text-typewrite').remove();
});

// 以下部分为游戏内容 //////////////////////////////////////////////////

let randomTimer = 0;
let randomMs = 0;
let randomMsOut = 20000;
let randomMsOutTxt = 20000;
let randomMsMax = 120000;
let randomMsMin = 20000;

let pointOutTimer = 0;
let textOutTimer = 0;

let sendNow = false;
let debugMode = false;

$(document).on('click', '.echo-point', function() {
    if (state == 'play') return;
    sendNow = true;
    echo.next();
    sendNow = false;
});

echo.on('send', function() {
    if (!sendNow) {
        debugMode = true;
        clearTimeout(randomTimer);
        clearTimeout(pointOutTimer);
        clearTimeout(textOutTimer);
    }
});

$(document).ready(function() {
    timerSet(timerRandomMs());
});

function setState(value) {
    state = value;
    if (state == 'stop' && !debugMode) {
        if (echo.messageList.length == 0) {
            timerOut(1000);
        } else {
            timerOut();
        }
    } else {
        clearTimeout(randomTimer);
        clearTimeout(pointOutTimer);
        clearTimeout(textOutTimer);
    }
}

function randomMsg() {
    let max = echoMessages.length - 1;
    let r = Number((Math.random() * max).toFixed());
    let msg = JSON.parse(JSON.stringify(echoMessages[r]))
    return msg;
}

function timerRandomMs() {
    randomMs = Number((Math.random() * (randomMsMax - randomMsMin) + randomMsMin).toFixed());
    return randomMs;
}

function timerSet(value) {
    if (debugMode) return;
    clearTimeout(randomTimer);
    randomTimer = setTimeout(timerMain, value);
}

function timerMain() {
    if (debugMode) {
        clearTimeout(randomTimer);
        clearTimeout(pointOutTimer);
        clearTimeout(textOutTimer);
        return;
    }

    let msg = randomMsg();

    sendNow = true;
    echo.sendList(msg.messages);
    sendNow = false;
}

function timerOut(value = randomMsOut) {
    pointOutTimer = setTimeout(function() {
        $('.echo-point').removeClass('end');
        $('.echo-point').removeClass('active');
        $('.echo-point').addClass('hide');
    }, value);
    textOutTimer = setTimeout(function() {
        $('.echo-output').addClass('hide');
        timerSet(timerRandomMs());
    }, randomMsOutTxt);
}