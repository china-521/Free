(function (window) {
    window.tools = window.free = window.Free = globalThis.Free = {
        getStyle: function (obj, name) {
            if (window.getComputedStyle) {
                return getComputedStyle(obj, null)[name];
            } else {
                return obj.currentStyle[name];
            }
        },
        move: function (obj, attr, target, speed, callback) {
            clearInterval(obj.timer);
            var current = parseInt(Free.getStyle(obj, attr));
            if (current < target) {
                speed = speed;
            } else if (current > target) {
                speed = -speed;
            }
            obj.timer = setInterval(function () {
                var oldValue = parseInt(Free.getStyle(obj, attr));
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
        addClass: function (obj, cn) {
            if (!Free.hasClass(obj, cn)) {
                obj.className += " " + cn;
            }
        },
        removeClass: function (obj, cn) {
            var reg = new RegExp("\\b" + cn + "\\b");
            obj.className = obj.className.replace(reg, "");
        },
        toggleClass: function (obj, cn) {
            if (Free.hasClass(obj, cn)) {
                Free.removeClass(obj, cn);
            } else {
                Free.addClass(obj, cn);
            }
        },
        hasClass: function (obj, cn) {
            var reg = new RegExp("\\b" + cn + "\\b");
            return reg.test(obj.className);
        },
        getElement: function (option) {
            return document.querySelector(option);
        },
        myClickAll: function (obj, fun) {
            var btn = document.querySelector(obj);
            btn.onclick = fun;
        },
        drag: function drag(obj) {
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
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
        limitDrag: function (obj) {
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
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
        adsorbDrag: function (obj, adsorb) {
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
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
        collideDrag: function (obj, adsorb, obj1, fun) {
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
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
                        var fun1 = fun;
                        fun1();
                    }
                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },
        collideDrags: function (obj, obj1, fun) {
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
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
                        var fun1 = fun;
                        fun1();
                    }
                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },
        multipleDrag: function (obj, flag, value, obj1, fun) {
            obj.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
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
                            var fun1 = fun;
                            fun1();
                        }
                    }
                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },
        dragX: function (obj1, flag, obj2, obj3) {
            obj1.onmousedown = function (event) {
                event = event || window.event;
                if (tools.getStyle(obj1, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
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
                    if (flag === "row") {
                        obj1.style.left = obj2.style.width = innerX + "px";
                        if (obj3) {
                            obj3.innerHTML = Math.round(innerX * 100 / progressWidth) + "%";
                        }
                    } else if (flag === "column") {
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
        mosaic: function (src, level, obj, flag) {
            var img = new Image();
            img.src = src;
            img.onload = function () {
                test.width = img.width * 2; 
                test.height = img.height;
                draw();
            };
            function draw() {
                obj.drawImage(img, 0, 0);
                var oldImgData = obj.getImageData(0, 0, img.width, img.height);
                var newImgData = obj.createImageData(img.width, img.height);
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
                obj.clearRect(0, 0, test.width, test.height);
                if (flag == true) {
                    obj.putImageData(newImgData, img.width, 0);
                } else {
                    obj.putImageData(newImgData, 0, 0);
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
        scratchCard: function (obj, image) {
            var test = document.getElementById("test");
            obj.width = document.documentElement.clientWidth;
            obj.height = document.documentElement.clientHeight;
            if (obj.getContext) {
                var ctx = obj.getContext("2d");
                var img = new Image();
                img.src = image;
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
        divMove: function (obj, speeds, setSpeed) {
            var choice = 0;
            var speed = speeds;
            document.onkeydown = function (event) {
                event = event || window.event;
                if (event.ctrlKey) {
                    speed = setSpeed;
                } else {
                    speed = speeds;
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
            }, 30);
        },
        loopChart: function (obj1, obj2, obj3, obj4) {
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
        unique: function (arr) {
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
        flatten: function (arr) {
            let result = [];
            arr.forEach(item => {
                if (Array.isArray(item)) {
                    result = result.concat(Free.flatten(item));
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
        Pubsub: {
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
        },
    }
    console.log("Welcome to my blog：\n"+"https://mp.csdn.net/mp_blog/manage/article?spm=1000.2115.3001.5448");
})(window);