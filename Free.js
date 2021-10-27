(function (window) {
    window.tools = window.free = window.Free = globalThis.Free = {
        getStyle: function (selector, name) {
            var obj = Free.getElement(selector);
            if (window.getComputedStyle) {
                return getComputedStyle(obj, null)[name];
            } else {
                return obj.currentStyle[name];
            }
        },
        cartoon: function (selector, attr, target, speed, callback) {
            var obj = Free.getElement(selector);
            if (attr === 'left' || attr === 'right' || attr === 'top' || attr === 'bottom') {
                if (tools.getStyle(selector, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                    return;
                }
            }
            clearInterval(obj.timer);
            var current = parseInt(Free.getStyle(selector, attr));
            if (current < target) {
                speed = speed;
            } else if (current > target) {
                speed = -speed;
            }
            obj.timer = setInterval(function () {
                var oldValue = parseInt(Free.getStyle(selector, attr));
                var newValue = oldValue + speed;
                if (newValue > target && speed > 0) {
                    newValue = target;
                } else if (newValue < target && speed < 0) {
                    newValue = target;
                }
                obj.style[attr] = newValue + "px";
                if (newValue == target) {
                    clearInterval(obj.timer);
                    callback && callback();
                }
            }, 30)
        },
        addClass: function (selector, cn) {
            var obj = Free.getElement(selector);
            if (!Free.hasClass(selector, cn)) {
                obj.className += " " + cn;
            }
        },
        removeClass: function (selector, cn) {
            var obj = Free.getElement(selector);
            var reg = new RegExp("\\b" + cn + "\\b");
            obj.className = obj.className.replace(reg, "");
        },
        toggleClass: function (selector, cn) {
            if (Free.hasClass(selector, cn)) {
                Free.removeClass(selector, cn);
            } else {
                Free.addClass(selector, cn);
            }
        },
        hasClass: function (selector, cn) {
            var obj = Free.getElement(selector);
            var reg = new RegExp("\\b" + cn + "\\b");
            return reg.test(obj.className);
        },
        getElement: function (selector) {
            return document.querySelector(selector);
        },
        eventAll: function (selector, eventName, fun) {
            var btn = document.querySelector(selector);
            eventName = eventName.replace(/^on/, '');
            btn.addEventListener(eventName, fun);
        },
        drag: function drag(selector) {
            var obj = Free.getElement(selector);
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(selector, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                    return;
                }
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;
                document.onmousemove = function (event) {
                    event = event || window.event;
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                };
                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                return false;
            };
        },
        limitDrag: function (selector) {
            var obj = Free.getElement(selector);
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(selector, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                    return;
                }
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;
                document.onmousemove = function (event) {
                    event = event || window.event;
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;
                    if (x < 0) {
                        x = 0;
                    }
                    if (x > (document.documentElement.clientWidth - obj.offsetWidth)) {
                        x = document.documentElement.clientWidth - obj.offsetWidth;
                    }
                    if (y < 0) {
                        y = 0;
                    }
                    if (y > (document.documentElement.clientHeight - obj.offsetHeight)) {
                        y = document.documentElement.clientHeight - obj.offsetHeight;
                    }
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },
        adsorbDrag: function (selector, adsorb) {
            var obj = Free.getElement(selector);
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(selector, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                    return;
                }
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;
                document.onmousemove = function (event) {
                    event = event || window.event;
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;
                    if (x < adsorb) {
                        x = 0;
                    }
                    if (x > (document.documentElement.clientWidth - obj.offsetWidth - adsorb)) {
                        x = document.documentElement.clientWidth - obj.offsetWidth;
                    }
                    if (y < adsorb) {
                        y = 0;
                    }
                    if (y > (document.documentElement.clientHeight - obj.offsetHeight - adsorb)) {
                        y = document.documentElement.clientHeight - obj.offsetHeight;
                    }
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },
        collideDrag: function (selector1, selector2, adsorb, fun) {
            var obj = Free.getElement(selector1);
            var obj1 = Free.getElement(selector2);
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(selector1, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                    return;
                }
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;
                document.onmousemove = function (event) {
                    event = event || window.event;
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;
                    if (x < adsorb) {
                        x = 0;
                    }
                    if (x > (document.documentElement.clientWidth - obj.offsetWidth - adsorb)) {
                        x = document.documentElement.clientWidth - obj.offsetWidth;
                    }
                    if (y < adsorb) {
                        y = 0;
                    }
                    if (y > (document.documentElement.clientHeight - obj.offsetHeight - adsorb)) {
                        y = document.documentElement.clientHeight - obj.offsetHeight;
                    }
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                    var Top1 = obj.offsetTop;
                    var Bottom1 = obj.offsetTop + obj.offsetHeight;
                    var Left1 = obj.offsetLeft;
                    var Right1 = obj.offsetLeft + obj.offsetWidth;
                    var Top2 = obj1.offsetTop;
                    var Bottom2 = obj1.offsetTop + obj1.offsetHeight;
                    var Left2 = obj1.offsetLeft;
                    var Right2 = obj1.offsetLeft + obj1.offsetWidth;
                    if (!(Right1 < Left2 || Left1 > Right2 || Top1 > Bottom2 || Bottom1 < Top2)) {
                        (fun)();
                    }
                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },
        collideDrags: function (selector1, selector2, fun) {
            var obj = Free.getElement(selector1);
            var obj1 = Free.getElement(selector2);
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(selector1, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                    return;
                }
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;
                document.onmousemove = function (event) {
                    event = event || window.event;
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                    var Top1 = obj.offsetTop;
                    var Bottom1 = obj.offsetTop + obj.offsetHeight;
                    var Left1 = obj.offsetLeft;
                    var Right1 = obj.offsetLeft + obj.offsetWidth;
                    var Top2 = obj1.offsetTop;
                    var Bottom2 = obj1.offsetTop + obj1.offsetHeight;
                    var Left2 = obj1.offsetLeft;
                    var Right2 = obj1.offsetLeft + obj1.offsetWidth;
                    if (!(Right1 < Left2 || Left1 > Right2 || Top1 > Bottom2 || Bottom1 < Top2)) {
                        (fun)();
                    }
                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },
        multipleDrag: function ({
            selector1,
            flag,
            value,
            selector2,
            fun
        }) {
            var obj = Free.getElement(selector1);
            var obj1 = Free.getElement(selector2);
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(selector1, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                    return;
                }
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;
                document.onmousemove = function (event) {
                    event = event || window.event;
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;
                    var adsorb = 0;
                    limit = flag === true ? true : false;
                    if (limit) {
                        if (value) {
                            adsorb = value;
                        }
                        if (x < adsorb) {
                            x = 0;
                        }
                        if (x > (document.documentElement.clientWidth - obj.offsetWidth - adsorb)) {
                            x = document.documentElement.clientWidth - obj.offsetWidth;
                        }
                        if (y < adsorb) {
                            y = 0;
                        }
                        if (y > (document.documentElement.clientHeight - obj.offsetHeight - adsorb)) {
                            y = document.documentElement.clientHeight - obj.offsetHeight;
                        }
                    }
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                    if (obj1) {
                        var Top1 = obj.offsetTop;
                        var Bottom1 = obj.offsetTop + obj.offsetHeight;
                        var Left1 = obj.offsetLeft;
                        var Right1 = obj.offsetLeft + obj.offsetWidth;
                        var Top2 = obj1.offsetTop;
                        var Bottom2 = obj1.offsetTop + obj1.offsetHeight;
                        var Left2 = obj1.offsetLeft;
                        var Right2 = obj1.offsetLeft + obj1.offsetWidth;
                        if (!(Right1 < Left2 || Left1 > Right2 || Top1 > Bottom2 || Bottom1 < Top2)) {
                            (fun)();
                        }
                    }
                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },
        dragX: function ({
            selector1,
            flag = true,
            selector2,
            selector3
        }) {
            var obj1 = Free.getElement(selector1);
            var obj2 = Free.getElement(selector2);
            var obj3 = Free.getElement(selector3);
            obj1.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(selector1, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                    return;
                }
                var progressX = event.clientX - this.offsetLeft;
                var progressY = event.clientY - this.offsetTop;
                document.onmousemove = function (event) {
                    event = event || window.event;
                    var innerX = event.clientX - progressX;
                    var innerY = event.clientY - progressY;
                    var progressWidth = obj1.parentNode.clientWidth - obj1.offsetWidth;
                    var progressHeight = obj1.parentNode.clientHeight - obj1.offsetHeight;
                    if (innerX <= 0) {
                        innerX = 0;
                    } else if (innerX >= progressWidth) {
                        innerX = progressWidth;
                    }
                    if (innerY <= 0) {
                        innerY = 0;
                    } else if (innerY >= progressHeight) {
                        innerY = progressHeight;
                    }
                    if (flag) {
                        obj1.style.left = obj2.style.width = innerX + "px";
                        if (obj3) {
                            obj3.innerHTML = Math.round(innerX * 100 / progressWidth) + "%";
                        }
                    } else {
                        obj1.style.bottom = obj2.style.height = innerY + "px";
                        if (obj3) {
                            obj3.innerHTML = Math.round(innerX * 100 / progressWidth) + "%";
                        }
                    }
                };
                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                return false;
            };
        },
        mosaic: function ({
            src,
            level,
            selector,
            flag = false
        }) {
            var text = Free.getElement(selector);
            if (text.getContext) {
                var ctx = text.getContext('2d');
            }
            var img = new Image();
            img.src = src;
            img.onload = function () {
                text.width = img.width * 2; 
                text.height = img.height;
                draw();
            };
            function draw() {
                ctx.drawImage(img, 0, 0);
                var oldImgData = ctx.getImageData(0, 0, img.width, img.height);
                var newImgData = ctx.createImageData(img.width, img.height);
                if (level <= 0) {
                    alert("level 的值不合法");
                    level = 1;
                }
                var size = level;
                for (var i = 0; i < oldImgData.width / size; i++) {
                    for (var j = 0; j < oldImgData.height / size; j++) {
                        var x = i * size + Math.floor(Math.random() * size);
                        var y = j * size + Math.floor(Math.random() * size);
                        var color = getPxInfo(oldImgData, x, y);
                        for (var a = 0; a < size; a++) {
                            for (var b = 0; b < size; b++) {
                                setPxInfo(newImgData, i * size + a, j * size + b, color);
                            }
                        }
                    }
                }
                ctx.clearRect(0, 0, text.width, text.height);
                if (flag) {
                    ctx.drawImage(img, 0, 0);
                    ctx.putImageData(newImgData, img.width, 0);
                } else {
                    text.width = img.width;
                    ctx.putImageData(newImgData, 0, 0);
                }
                function getPxInfo(imgdata, x, y) {
                    var color = [];
                    var data = imgdata.data;
                    var w = imgdata.width;
                    var h = imgdata.height;
                    color[0] = data[(y * w + x) * 4];
                    color[1] = data[(y * w + x) * 4 + 1];
                    color[2] = data[(y * w + x) * 4 + 2];
                    color[3] = data[(y * w + x) * 4 + 3];
                    return color;
                }
                function setPxInfo(imgdata, x, y, color) {
                    var data = imgdata.data;
                    var w = imgdata.width;
                    var h = imgdata.height;
                    data[(y * w + x) * 4] = color[0];
                    data[(y * w + x) * 4 + 1] = color[1];
                    data[(y * w + x) * 4 + 2] = color[2];
                    data[(y * w + x) * 4 + 3] = color[3];
                    return color;
                }
            }
        },
        fixedNumber: function (num, n, num1) {
            return (Array(n).join(num1) + num).slice(-n);
        },
        mediaTime: function (timeAll) {
            var hour = cover(parseInt(timeAll / 3600), 2);
            var min = cover(parseInt(timeAll % 3600 / 60), 2);
            var sec = cover(parseInt(timeAll % 3600), 2);
            return hour + ":" + min + ":" + sec;
        },
        scratchCard: function ({
            selector,
            src,
            width,
            height
        }) {
            var obj = Free.getElement(selector);
            if (width || height) {
                obj.style.width = width + 'px';
                obj.style.height = height + 'px';
            } else {
                obj.width = document.documentElement.clientWidth;
                obj.height = document.documentElement.clientHeight;
            }
            if (obj.getContext) {
                var ctx = obj.getContext("2d");
                var img = new Image();
                img.src = src;
                img.onload = function () {
                    draw();
                };
                function draw() {
                    var flag = 0; 
                    ctx.drawImage(img, 0, 0, obj.width, obj.height);
                    obj.addEventListener("touchstart", function (event) {
                        event = event || window.event;
                        var touchC = event.changedTouches[0];
                        var x = touchC.clientX - this.offsetLeft;
                        var y = touchC.clientY - this.offsetTop;
                        ctx.lineWidth = 40;
                        ctx.lineCap = "round"; 
                        ctx.lineJoin = "round"; 
                        ctx.globalCompositeOperation = "destination-out"
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(x, y); 
                        ctx.lineTo(x + 1, y + 1);
                        ctx.stroke();
                        ctx.restore();
                    });
                    obj.addEventListener("touchmove", function (event) {
                        event = event || window.event;
                        var touchC = event.changedTouches[0];
                        var x = touchC.clientX - this.offsetLeft;
                        var y = touchC.clientY - this.offsetTop;
                        ctx.save();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y);
                        ctx.stroke();
                        ctx.restore();
                    });
                    obj.addEventListener("touchend", function () {
                        var imgData = ctx.getImageData(0, 0, this.width, this.height);
                        var allPx = imgData.width * imgData.height;
                        for (var i = 0; i < allPx; i++) {
                            if (imgData.data[4 * i + 3] == 0) {
                                flag++;
                            }
                        }
                        if (flag >= allPx / 2) {
                            obj.style.opacity = "0"; 
                        }
                    });
                    obj.addEventListener("transitionend", function () {
                        this.remove(); 
                    });
                }
            }
        },
        divMove: function ({selector, speed, setSpeed = 0,time = 30}) {
            var obj = Free.getElement(selector);
            var choice = 0;
            var speed = speed;
            document.onkeydown = function (event) {
                event = event || window.event;
                if (event.ctrlKey) {
                    speed = setSpeed;
                } else {
                    speed = speed;
                }
                choice = event.keyCode;
                console.log(choice);
            };
            document.onkeyup = function (event) {
                event = event || window.event;
                choice = 0;
            };
            setInterval(function () {
                switch (choice) {
                    case 37:
                        obj.style.left = (obj.offsetLeft - speed) + "px";
                        break;
                    case 38:
                        obj.style.top = (obj.offsetTop - speed) + "px";
                        break;
                    case 39:
                        obj.style.left = (obj.offsetLeft + speed) + "px";
                        break;
                    case 40:
                        obj.style.top = (obj.offsetTop + speed) + "px";
                        break;
                    case 65:
                        obj.style.left = (obj.offsetLeft - speed) + "px";
                        break;
                    case 87:
                        obj.style.top = (obj.offsetTop - speed) + "px";
                        break;
                    case 68:
                        obj.style.left = (obj.offsetLeft + speed) + "px";
                        break;
                    case 83:
                        obj.style.top = (obj.offsetTop + speed) + "px";
                        break;
                }
            }, time);
        },
        loopChart: function (obj1, obj2, obj3, obj4) {
        },
        $tempTimeDown: [],
        timeDown: function (selector, {
            days,
            hours,
            minutes,
            seconds,
            describe = "倒计时：",
            flag = true
        }) {
            var time_wrapper = document.querySelector(selector);
            var unitSecond = days * 24 * 3600 + hours * 3600 + minutes * 60 + seconds;
            function time(unitSecond) {
                var timeArr = new Array(0, 0, 0, 0);
                var unitDay = 24 * 60 * 60;
                var unitHour = 60 * 60;
                var unitMin = 60;
                var unitSec = 0;
                if (!unitSecond) {
                    return;
                }
                if (unitSecond >= unitDay) {
                    timeArr[0] = parseInt(unitSecond / unitDay);
                    unitSecond %= unitDay;
                }
                if (unitSecond >= unitHour) {
                    timeArr[1] = parseInt(unitSecond / unitHour);
                    unitSecond %= unitHour;
                }
                if (unitSecond >= unitMin) {
                    timeArr[2] = parseInt(unitSecond / unitMin);
                    unitSecond %= unitMin;
                }
                if (unitSecond > unitSec) {
                    timeArr[3] = unitSecond;
                }
                return timeArr;
            }
            var timeDownArr = time(unitSecond);
            var timer = setInterval(() => {
                timeDownArr[3]--;
                if (timeDownArr[0] > 0) {
                    if (timeDownArr[3] <= 0) {
                        timeDownArr[3] = 59;
                        timeDownArr[2] -= 1;
                    }
                    if (timeDownArr[2] <= 0) {
                        timeDownArr[2] = 59;
                        timeDownArr[1] -= 1;
                    }
                    if (timeDownArr[1] <= 0) {
                        timeDownArr[1] = 23;
                        timeDownArr[0] -= 1;
                    }
                } 
                else if (timeDownArr[0] <= 0) {
                    timeDownArr[0] = 0;
                    if (timeDownArr[1] > 0) {
                        if (timeDownArr[3] <= 0) {
                            timeDownArr[3] = 59;
                            timeDownArr[2] -= 1;
                        }
                        if (timeDownArr[2] <= 0) {
                            timeDownArr[2] = 59;
                            timeDownArr[1] -= 1;
                        }
                    } 
                    else if (timeDownArr[1] <= 0) {
                        timeDownArr[1] = 0;
                        if (timeDownArr[2] > 0) {
                            if (timeDownArr[3] <= 0) {
                                timeDownArr[3] = 59;
                                timeDownArr[2] -= 1;
                            }
                        } 
                        else if (timeDownArr[2] <= 0) {
                            timeDownArr[2] = 0;
                            if (timeDownArr[3] <= 0) {
                                clearInterval(timer);
                            }
                        }
                    }
                }
                if (flag) {
                    time_wrapper.innerHTML = describe + timeDownArr[0] + '天' + timeDownArr[1] + '时' + timeDownArr[2] + '分' + timeDownArr[3] + '秒';
                } else {
                    Free.$tempTimeDown = timeDownArr;
                }
            }, 1000);
        },
        $tempRunTime: [],
        runTime: function (selector, {
            year,
            month,
            day,
            hour,
            minute,
            second,
            describe = '本站已运行：',
            flag = true
        }) {
            var time_wrapper = document.querySelector(selector);
            function time(unitSecond) {
                var timeArr = new Array(0, 0, 0, 0, 0);
                var unitYear = 365 * 24 * 60 * 60;
                var unitDay = 24 * 60 * 60;
                var unitHour = 60 * 60;
                var unitMin = 60;
                var unitSec = 0;
                if (!unitSecond) {
                    return;
                }
                if (unitSecond >= unitYear) {
                    timeArr[0] = parseInt(unitSecond / unitYear);
                    unitSecond %= unitYear;
                }
                if (unitSecond >= unitDay) {
                    timeArr[1] = parseInt(unitSecond / unitDay);
                    unitSecond %= unitDay;
                }
                if (unitSecond >= unitHour) {
                    timeArr[2] = parseInt(unitSecond / unitHour);
                    unitSecond %= unitHour;
                }
                if (unitSecond >= unitMin) {
                    timeArr[3] = parseInt(unitSecond / unitMin);
                    unitSecond %= unitMin;
                }
                if (unitSecond > unitSec) {
                    timeArr[4] = unitSecond;
                }
                return timeArr;
            }
            setInterval(() => {
                var startTime = Math.round(new Date(Date.UTC(year, month - 1, day, hour, minute, second)).getTime() / 1000);
                var nowTime = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
                var runTimeArr = time(nowTime - startTime);
                if (flag) {
                    time_wrapper.innerHTML = describe + runTimeArr[0] + '年' + runTimeArr[1] + '天' + runTimeArr[2] + '时' + runTimeArr[3] + '分' + runTimeArr[4] + '秒';
                } else {
                    Free.$tempRunTime = runTimeArr;
                }
            }, 1000);
        },
        call: function (Fn, obj, ...args) {
            if (obj === undefined || obj === null) {
                obj = globalThis; 
            }
            obj.temp = Fn;
            let result = obj.temp(...args);
            delete obj.temp;
            return result;
        },
        apply: function (Fn, obj, args) {
            if (obj === undefined || obj === null) {
                obj = globalThis;
            }
            obj.temp = Fn;
            let result = obj.temp(...args);
            delete obj.temp;
            return result;
        },
        bind: function (Fn, obj, ...args) {
            return function (...args2) {
                return Free.call(Fn, obj, ...args, ...args2);
            }
        },
        throttle: function (callback, wait) {
            let start = 0;
            return function (event) {
                let nowTime = Date.now();
                if (nowTime - start >= wait) {
                    callback.call(this, event);
                    start = nowTime;
                }
            }
        },
        debounce: function (callback, time) {
            let timer = null;
            return function (event) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    callback(this, event);
                }, time)
            }
        },
        map: function (arr, callback) {
            let result = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(callback(arr[i], i));
            }
            return result;
        },
        reduce: function (arr, callback, initValue) {
            let result = initValue;
            for (let i = 0; i < arr.length; i++) {
                result = callback(result, arr[i]);
            }
            return result;
        },
        filter: function (arr, callback) {
            let result = [];
            for (let i = 0; i < arr.length; i++) {
                let res = callback(arr[i], i);
                if (res) {
                    result.push(arr[i]);
                }
            }
            return result;
        },
        find: function (arr, callback) {
            for (let i = 0; i < arr.length; i++) {
                let res = callback(arr[i], i);
                if (res) {
                    return arr[i];
                }
            }
            return undefined;
        },
        findIndex: function (arr, callback) {
            for (let i = 0; i < arr.length; i++) {
                let res = callback(arr[i], i);
                if (res) {
                    return i;
                }
            }
            return undefined;
        },
        every: function (arr, callback) {
            for (let i = 0; i < arr.length; i++) {
                if (!callback(arr[i], i)) {
                    return false;
                }
            }
            return true;
        },
        some: function (arr, callback) {
            for (let i = 0; i < arr.length; i++) {
                if (callback(arr[i], i)) {
                    return true;
                }
            }
            return false;
        },
        unique1: function (arr) {
            const result = [];
            arr.forEach(item => {
                if (result.indexOf(item) === -1) {
                    result.push(item);
                }
            });
            return result;
        },
        unique2: function (arr) {
            const result = [];
            const obj = {};
            arr.forEach(item => {
                if (obj[item] === undefined) {
                    obj[item] = true;
                    result.push(item);
                }
            });
            return result;
        },
        unique3: function (arr) {
            return [...new Set(arr)];
        },
        concat: function (arr, ...args) {
            const result = [...arr];
            args.forEach(item => {
                if (Array.isArray(item)) {
                    result.push(...item);
                } else {
                    result.push(item);
                }
            });
            return result;
        },
        slice: function (arr, begin, end) {
            if (arr.length === 0) {
                return [];
            }
            begin = begin || 0;
            if (begin >= arr.length) {
                return [];
            }
            end = end || arr.length;
            if (end <= begin) {
                return [];
            }
            const result = [];
            for (let i = 0; i < arr.length; i++) {
                if (i >= begin && i < end) {
                    result.push(arr[i]);
                }
            }
            return result;
        },
        flatten1: function (arr) {
            let result = [];
            arr.forEach(item => {
                if (Array.isArray(item)) {
                    result = result.concat(Free.flatten1(item));
                } else {
                    result = result.concat(item);
                }
            });
            return result;
        },
        flatten2: function (arr) {
            let result = [...arr];
            while (result.some(item => Array.isArray(item))) {
                result = [].concat(...result);
            }
            return result;
        },
        chunk: function (arr, size = 1) {
            if (arr.length === 0) {
                return [];
            }
            let result = [];
            let temp = [];
            arr.forEach(item => {
                if (temp.length === 0) {
                    result.push(temp);
                }
                temp.push(item);
                if (temp.length === size) {
                    temp = [];
                }
            });
            return result;
        },
        difference: function (arr1 = [], arr2 = []) {
            if (arr1.length === 0) {
                return [];
            }
            if (arr2.length === 0) {
                return arr1.slice();
            }
            let result = arr1.filter(item => !arr2.includes(item));
            return result;
        },
        pull: function (arr, ...args) {
            const result = [];
            for (let i = 0; i < arr.length; i++) {
                if (args.includes(arr[i])) {
                    result.push(arr[i]);
                    arr.splice(i, 1);
                    i--;
                }
            }
            return result;
        },
        pullAll: function (arr, values) {
            return Free.pull(arr, ...values);
        },
        drop: function (arr, count, flag = true) {
            if (flag) {
                return arr.filter((value, index) => index >= count);
            } else {
                return arr.filter((value, index) => index < arr.length - count);
            }
        },
        newInstance: function (Fn, ...args) {
            const obj = {};
            const result = Fn.call(obj, ...args);
            obj.__proto__ = Fn.prototype;
            return result instanceof Object ? result : obj;
        },
        myInstance: function (obj, Fn) {
            let prototype = Fn.prototype;
            let proto = obj.__proto__;
            while (proto) {
                if (prototype === proto) {
                    return true;
                } else {
                    proto = proto.__proto__;
                }
            }
            return false;
        },
        mergeObject: function (...multiObject) {
            const result = {};
            multiObject.forEach(obj => {
                Object.keys(obj).forEach(key => {
                    if (result.hasOwnProperty(key)) {
                        result[key] = [].concat(result[key], obj[key]);
                    } else {
                        result[key] = obj[key];
                    }
                })
            });
            return result;
        },
        shallowCopy: function (target) {
            if (typeof target === 'object' && target !== null) {
                if (Array.isArray(target)) {
                    return [...target];
                } else {
                    return {
                        ...target
                    };
                }
            } else {
                return target;
            }
        },
        shallowCopy2: function (target) {
            if (typeof target === 'object' && target !== null) {
                const result = Array.isArray(target) ? [] : {};
                for (let key in target) {
                    if (target.hasOwnProperty(key)) {
                        result[key] = target[key];
                    }
                }
                return result;
            } else {
                return target;
            }
        },
        deepCopy: function (target) {
            let str = JSON.stringify(target);
            let data = JSON.parse(str);
            return data;
        },
        deepCopy2: function (target) {
            if (typeof target === 'object' && target !== null) {
                const result = Array.isArray(target) ? [] : {};
                for (let key in target) {
                    if (target.hasOwnProperty(key)) {
                        result[key] = Free.deepCopy2(target[key]);
                    }
                }
                return result;
            } else {
                return target;
            }
        },
        deepCopy3: function (target, map = new Map()) {
            if (typeof target === 'object' && target !== null) {
                let hasCopy = map.get(target);
                if (hasCopy) {
                    return hasCopy;
                }
                const result = Array.isArray(target) ? [] : {};
                map.set(target, result);
                for (let key in target) {
                    if (target.hasOwnProperty(key)) {
                        result[key] = Free.deepCopy3(target[key], map);
                    }
                }
                return result;
            } else {
                return target;
            }
        },
        deepCopy4: function (target, map = new Map()) {
            if (typeof target === 'object' && target !== null) {
                let hasCopy = map.get(target);
                if (hasCopy) {
                    return hasCopy;
                }
                let isArray = Array.isArray(target);
                const result = isArray ? [] : {};
                map.set(target, result);
                if (isArray) {
                    target.forEach((item, index) => {
                        result[index] = Free.deepCopy4(item, map);
                    });
                } else {
                    Object.keys(target).forEach(key => {
                        result[key] = Free.deepCopy4(target[key], map);
                    });
                }
                return result;
            } else {
                return target;
            }
        },
        strArr: function (str) {
            return [...str]
        },
        $arrObj: [],
        arrString: function (arr) {
            let str = '';
            arr.forEach((value) => {
                if (typeof value === 'object') {
                    Free.$arrObj.push(value);
                    str += JSON.stringify(value) + '&';
                } else {
                    str += value;
                }
            })
            return str;
        },
        reverseString: function (str) {
            let arr = [...str];
            arr.reverse();
            let str1 = arr.join('');
            return str1;
        },
        palindrome: function (str) {
            return Free.reverseString(str) === str;
        },
        cutString: function (str, size, flag = true) {
            if (flag) {
                return str.slice(0, size) + '...';
            } else {
                let arr = [...str];
                let str1 = Free.slice(arr, size, false);
                return '...' + str1.join('');
            }
        },
        addEventListener: function (el, type, Fn, selector) {
            if (typeof el === 'string') {
                el = document.querySelector(el);
            }
            if (!selector) {
                el.addEventListener(type, Fn);
            } else {
                el.addEventListener(type, function (event) {
                    const target = event.target;
                    if (target.matches(selector)) {
                        Fn.call(target, event);
                    }
                });
            }
        },
        eventBus: {
            callbacks: {},
        },
        $on: function (type, callback) {
            if (Free.eventBus.callbacks[type]) {
                Free.eventBus.callbacks[type].push(callback);
            } else {
                Free.eventBus.callbacks[type] = [callback];
            }
        },
        $emit: function (type, data) {
            if (Free.eventBus.callbacks[type] && Free.eventBus.callbacks[type].length > 0) {
                Free.eventBus.callbacks[type].forEach(callback => {
                    callback(data);
                });
            }
        },
        $off: function (eventName) {
            if (eventName) {
                delete Free.eventBus.callbacks[eventName]
            } else {
                Free.eventBus.callbacks = {};
            }
        },
        PubSub: {
            index: 0,
            callbacks: {}
        },
        $subscribe: function (channel, callback) {
            let index = 'index:' + Free.Pubsub.index++;
            if (Free.Pubsub.callbacks[channel]) {
                Free.Pubsub.callbacks[channel][index] = callback;
            } else {
                Free.Pubsub.callbacks[channel] = {
                    [index]: callback
                }
            }
            return index;
        },
        $publish: function (channel, data) {
            if (Free.Pubsub.callbacks[channel]) {
                Object.values(Free.Pubsub.callbacks[channel]).forEach(callback => {
                    callback(data);
                });
            }
        },
        $unsubscribe: function (flag) {
            if (flag === undefined) {
                Free.Pubsub.callbacks = {};
            } else if (typeof flag === 'string') {
                if (flag.indexOf('index:') === 0) {
                    let callbackObj = Object.values(Free.Pubsub.callbacks).find(obj => obj.hasOwnProperty(flag));
                    if (callbackObj) {
                        delete callbackObj[flag];
                    } else {
                        console.error('没有匹配的：' + flag);
                    }
                } else {
                    delete Free.Pubsub.callbacks[flag];
                }
            }
        },
        $axios: function ({
            method,
            url,
            params,
            data
        }) {
            method = method.toUpperCase();
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                let str = '';
                for (let k in params) {
                    str += `${k}=${params[k]}&`;
                }
                str = str.slice(0, -1);
                xhr.open(method, url + '?' + str);
                if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
                    xhr.setRequestHeader('Content-type', 'application/json');
                    xhr.send(JSON.stringify(data));
                } else {
                    xhr.send();
                }
                xhr.responseType = 'json';
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve({
                                status: xhr.status,
                                message: xhr.statusText,
                                body: xhr.response
                            });
                        } else {
                            reject(new Error('请求失败，状态码为：' + xhr.status));
                        }
                    }
                };
            });
        },
        axios: {
            get: function (url, options) {
                let config = Object.assign(options, {
                    method: 'GET',
                    url: url
                });
                return Free.$axios(config);
            },
            post: function (url, options) {
                let config = Object.assign(options, {
                    method: 'POST',
                    url: url
                });
                return Free.$axios(config);
            },
            put: function (url, options) {
                let config = Object.assign(options, {
                    method: 'PUT',
                    url: url
                });
                return Free.$axios(config);
            },
            delete: function (url, options) {
                let config = Object.assign(options, {
                    method: 'DELETE',
                    url: url
                });
                return Free.$axios(config);
            },
        }
    }
    console.log('Welcome to my blog:\n','https://blog.csdn.net/m0_47214030?spm=1000.2115.3001.5343')
})(window);