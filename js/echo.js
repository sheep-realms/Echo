class Echo {
    constructor() {
        this.message = '';
        this.messageBuffer = [];
        this.dbChrBuffer = '';
        this.timer = 0;
        this.groupCount = 0;
        this.groupStack = [];
        this.printSpeed = 30;
        this.state = 'stop';
        this.event = {
            backspace: function() {},
            clear: function() {},
            groupEnd: function() {},
            groupStart: function() {},
            print: function() {},
            printEnd: function() {},
            printStart: function() {},
            send: function() {},
            skip: function() {}
        }
    }

    backspace() {
        // 触发退格事件
        this.event.backspace();
    }

    clear() {
        this.message = '';
        this.messageBuffer = [];
        this.timer = 0;
        // 触发清空事件
        this.event.clear();
    }

    groupEnd() {
        let i = this.groupStack.shift();
        let n = this.groupStack[0];
        if (n == undefined) n = 0;
        let e = {
            groupId: i,
            groupNow: n
        }
        this.event.groupEnd(e);
        return e;
    }

    groupStart(obj) {
        this.groupCount++;
        this.groupStack.pop(this.groupCount);
        let e = {
            groupId: this.groupCount,
            groupNow: this.groupCount,
            data: obj
        }
        this.event.groupStart(e);
        return e;
    }

    messageSerialize(msg) {
        if (typeof msg == 'string') {
            return msg.split('');
        } else if (typeof msg == 'object' && msg != null) {
            let data = [
                {
                    action: 'group_start',
                    class: msg?.class,
                    color: msg?.color,
                    bold: msg?.bold,
                    underline: msg?.underline
                },
                ...msg.text.split(''),
                {
                    action: 'group_end'
                }
            ]

            if (msg?.pause) {
                let before = ' '.repeat(msg.pause).split(' ');
                before.shift();
                data = [...data, ...before];
            }
            
            return data;
        }
    }

    on(eventName, action = function() {}) {
        if (typeof action != 'function') return;
        return this.event[eventName] = action;
    }

    print(that = this) {
        if (that.state == 'ready') {
            that.state = 'play';
            // 触发打印开始事件
            that.event.printStart();
        }

        let a;
        if (that.dbChrBuffer != '') {
            a = that.dbChrBuffer;
            that.dbChrBuffer = '';
        } else {
            if (typeof that.messageBuffer[0] == 'string') {
                a = that.messageBuffer.shift();
                // 中日韩字符跳过一回合
                if (a.search(/[\u4e00-\u9fa5\u0800-\u4e00\uac00-\ud7ff]/) != -1) {
                    that.dbChrBuffer = a;
                    return;
                }
            }
        }

        // 触发打印事件
        that.event.print(a);

        if (typeof that.messageBuffer[0] == 'object') {
            let obj = that.messageBuffer.shift();
            if (obj.action == 'group_start') {
                that.groupStart(obj);
            } else if (obj.action == 'group_end') {
                that.groupEnd();
            }
        }

        if (that.messageBuffer.length == 0 && that.dbChrBuffer == '') {
            clearInterval(that.timer);
            that.state = 'last';
        }

        if (that.state == 'last') {
            // 触发打印结束事件
            that.event.printEnd();
            that.state = 'stop';
        }

        return a;
    }

    send(text, data = {}) {
        this.clear();
        // 触发发送事件
        this.event.send();
        this.message = text;
        if (typeof this.message == 'string') {
            this.messageBuffer = text.split('');
        } else if (typeof this.message == 'object' && this.message != null) {
            if (Array.isArray(this.message)) {
                this.message.forEach(e => {
                    this.messageBuffer = [...this.messageBuffer, ...this.messageSerialize(e)]
                });
            } else {
                this.messageBuffer = this.messageSerialize(this.message);
            }
        }
        this.timer = setInterval(this.print, (data?.printSpeed ? data.printSpeed : this.printSpeed), this);
        this.state = 'ready';
        return this.message;
    }

    skip() {
        clearInterval(this.timer);
        let txt = this.dbChrBuffer + this.messageBuffer.join('');
        this.messageBuffer = [];
        // 触发跳过事件
        this.event.skip(txt);
        // 触发打印事件
        this.event.print(txt);
        // 触发打印结束事件
        this.event.printEnd();
        this.state = 'stop';
        return txt;
    }
}