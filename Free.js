(function (window) {
    window.tools = window.free = window.Free = globalThis.Free = {
        /******************************************【1.简单动画和获取元素样式】*************************************** */
        // 定义方法获取元素的样式
        /**
         * 参数说明：
         *  obj,要获取样式的对象。
         *  name,要获取的样式。(String类型)
         */

        getStyle: function (obj, name) {
            if (window.getComputedStyle) {
                // 常浏览器的方式,具有getComputedStyle()方法
                return getComputedStyle(obj, null)[name];
            } else {
                // IE8的方式,没有getComputedStyle()方法
                return obj.currentStyle[name];
            }
        },
        //创建一个可以执行动画的方法。
        /**
         * 参数说明
         *  obj，要执行动画的参数。
         *  attr，要执行动画的样式，比如left，top，height，width等(以字符串形式传入)。
         *  target，执行动画的目标位置(移动边界)。
         *  speed，移动速度(传递一个正值即可)。
         *  callback,回调方法,这个方法将会在动画执行完毕以后执行（增加方法的可扩展性）。
         */
        move: function (obj, attr, target, speed, callback) {
            // 关闭上一次的定时器(防止每次点击时创建新的定时器导致速度加快)
            clearInterval(obj.timer);
            // 获取元素当前相对位置
            var current = parseInt(Free.getStyle(obj, attr));
            // 判断speed是作为正值使用还是负值使用(这样可以使输入的speed不用考虑正负)
            if (current < target) {
                speed = speed;
            } else if (current > target) {
                speed = -speed;
            }
            // 开启定时器，用来执行动画效果
            // 向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识（尽量别用全局变量保存，有隐患）
            obj.timer = setInterval(function () {
                // 获取box1原来的attr值
                var oldValue = parseInt(Free.getStyle(obj, attr));
                // 添加速度
                var newValue = oldValue + speed;
                // 防止div越界
                if (newValue > target && speed > 0) {
                    newValue = target;
                } else if (newValue < target && speed < 0) {
                    newValue = target;
                }
                obj.style[attr] = newValue + "px";
                // 当元素移动到边界时，关闭定时器
                if (newValue == target) {
                    clearInterval(obj.timer);
                    //动画执行完毕，调用回调方法(采用“与”的形式是为了使用户在不需要回调方法时，就不用传递回调方法这个参数)
                    callback && callback();
                }
            }, 30)
        },

        /******************************************【2.样式类操作】*************************************** */
        // 定义一个方法，用来向一个元素中添加指定的class属性值
        /** 
         * 添加一个类到指定的类中。
         *   参数说明：
         *     obj 要添加class属性的元素
         *     cn 要添加的class值（类名）。字符串形式
         */
        addClass: function (obj, cn) {
            // 判断obj中是否有cn这个class,如果没有在添加，否则不添加。（防止添加多个相同类）
            if (!Free.hasClass(obj, cn)) {
                obj.className += " " + cn;
            }
        },

        /**
         * 删除一个元素中指定的class属性
         */
        removeClass: function (obj, cn) {
            // 创建一个正则表达式
            var reg = new RegExp("\\b" + cn + "\\b");
            // 删除class
            obj.className = obj.className.replace(reg, "");
        },

        /**
         * toggleClass可以用来切换一个类
         * 如果元素中具有该类，则删除
         * 如果元素中没有该类，则添加
         */
        toggleClass: function (obj, cn) {
            // 检查obj中是否有cn这个class
            if (Free.hasClass(obj, cn)) {
                // 如果有cn，则删除
                Free.removeClass(obj, cn);
            } else {
                // 如果没有则添加
                Free.addClass(obj, cn);
            }
        },

        // 判断一个元素中是否含有指定的class属性值
        hasClass: function (obj, cn) {
            // 判断obj中有没有cn
            // 创建一个正则表达式(\b是正则表达式中的单词边界)
            var reg = new RegExp("\\b" + cn + "\\b");
            return reg.test(obj.className);
        },

        /******************************************【3.获取DOM元素】****************************************/
        /**
         * 参数说明：
         *      obj: 要获取的元素的选择器
         */
        getElement: function (obj) {
            return document.querySelector(obj);
        },
        /******************************************【4.绑定单击响应方法】****************************************/
        /**
         * 参数说明：
         *  obj，要绑定的对象选择器
         *  fun, 回调方法。--->function(){}
         */
        myClickAll: function (obj, fun) {
            var btn = document.querySelector(obj);
            btn.onclick = fun;
        },

        /******************************************【5.开启任意拖拽】****************************************/
        /**任意拖拽，没有限制
         * 参数说明
         *      -obj:被拖拽元素
         * 注意：被拖拽元素要开启定位
         */
        drag: function drag(obj) {
            // 为obj绑定鼠标按下事件
            // 当鼠标在被拖拽元素上按下时，开始拖拽 onmousedown
            obj.onmousedown = function (event) {
                event = event || window.event;
                // 判断用户是否开启定位
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                }

                /**
                 * div的偏移量：鼠标.clentX - 元素.offsetLeft
                 * div的偏移量：鼠标.clentY - 元素.offsetTop
                 */
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;

                // 当鼠标移动时被拖拽元素跟随鼠标移动 onmousemove
                document.onmousemove = function (event) {
                    event = event || window.event;
                    // 获取鼠标坐标
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;
                    // 修改obj的位置
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                };
                /**
                 * 注意：这里如果为box1绑定鼠标松开事件，当页面里有另一个div是box
                 * 的兄弟元素时，如果将box1移入第二个div下，此时如果松开鼠标，则不会触发鼠标松开事件。
                 * 所以我们要将鼠标松开事件绑定给document
                 */
                document.onmouseup = function () {
                    //当鼠标松开时，被拖拽元素被固定在当前位置
                    // 取消document的onmousemove事件
                    document.onmousemove = null;
                    // 取消document的onmouseup事件(是该事件只发生一次)
                    document.onmouseup = null;
                };
                return false;
            };

            /**
             * 当我们拖拽一个网页中的内容时，浏览器会默认去搜索引擎中搜索内容，
             *  此时会导致拖拽功能的异常，这个是浏览器提供的一个默认行为。
             *  如果不希望发生这个行为则可以通过return false来取消这一行为
             * 但是这招对IE8不起作用。
             */
        },

        /******************************************【6.开启拖拽(有范围限制)】****************************************/
        /**
         * 被拖拽元素不能离开浏览器视口
         * 参数说明：
         *      obj：被拖拽对象
         */
        limitDrag: function (obj) {
            // 为obj绑定鼠标按下事件
            // 当鼠标在被拖拽元素上按下时，开始拖拽 onmousedown
            obj.onmousedown = function (event) {
                event = event || window.event;
                // 判断用户是否开启定位
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                }
                /**
                 * div的偏移量：鼠标.clentX - 元素.offsetLeft
                 * div的偏移量：鼠标.clentY - 元素.offsetTop
                 */
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;

                // 当鼠标移动时被拖拽元素跟随鼠标移动 onmousemove
                document.onmousemove = function (event) {
                    event = event || window.event;
                    // 获取鼠标坐标
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;
                    // 设置范围
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
                    // 修改obj的位置
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },

        /******************************************【7.开启拖拽(磁性吸附)】****************************************/
        /**
         * 被拖拽元素靠近浏览器边角时自动吸附上去
         * 参数说明：
         *      obj：被拖拽对象
         *      adsorb: 吸附距离
         */
        adsorbDrag: function (obj, adsorb) {
            // 为obj绑定鼠标按下事件
            // 当鼠标在被拖拽元素上按下时，开始拖拽 onmousedown
            obj.onmousedown = function (event) {
                event = event || window.event;
                // 判断用户是否开启定位
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                }
                /**
                 * div的偏移量：鼠标.clentX - 元素.offsetLeft
                 * div的偏移量：鼠标.clentY - 元素.offsetTop
                 */
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;

                // 当鼠标移动时被拖拽元素跟随鼠标移动 onmousemove
                document.onmousemove = function (event) {
                    event = event || window.event;
                    // 获取鼠标坐标
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;
                    // 设置范围，磁性吸附
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
                    // 修改obj的位置
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },

        /******************************************【8.开启拖拽(碰撞检测)】****************************************/
        /**
         *  碰撞检测(有磁性吸附和范围限制)
         * 参数说明：
         *      obj：被拖拽对象
         *      obj1：被撞对象
         *      absorb：吸附距离
         *      fun: 碰撞后要设置的事件方法
         *      
         */
        collideDrag: function (obj, adsorb, obj1, fun) {
            // 为obj绑定鼠标按下事件
            // 当鼠标在被拖拽元素上按下时，开始拖拽 onmousedown
            obj.onmousedown = function (event) {
                event = event || window.event;
                // 判断用户是否开启定位
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                }
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;

                // 当鼠标移动时被拖拽元素跟随鼠标移动 onmousemove
                document.onmousemove = function (event) {
                    event = event || window.event;
                    // 获取鼠标坐标
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;
                    // 设置范围
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
                    // 修改obj的位置
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                    // 碰撞检测
                    var Top1 = obj.offsetTop;
                    var Bottom1 = obj.offsetTop + obj.offsetHeight;
                    var Left1 = obj.offsetLeft;
                    var Right1 = obj.offsetLeft + obj.offsetWidth;

                    var Top2 = obj1.offsetTop;
                    var Bottom2 = obj1.offsetTop + obj1.offsetHeight;
                    var Left2 = obj1.offsetLeft;
                    var Right2 = obj1.offsetLeft + obj1.offsetWidth;

                    if (!(Right1 < Left2 || Left1 > Right2 || Top1 > Bottom2 || Bottom1 < Top2)) {
                        var funs = fun;
                        funs();
                    }

                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },

        /******************************************【9.开启拖拽(碰撞检测)】****************************************/
        /**
         * 碰撞检测（无范围限制）
         * obj：被拖拽对象
         *      obj: 拖拽对象 
         *      obj1: 碰撞对象
         *      fun : 碰撞后要设置的事件方法
         */
        collideDrags: function (obj, obj1, fun) {
            // 为obj绑定鼠标按下事件
            // 当鼠标在被拖拽元素上按下时，开始拖拽 onmousedown
            obj.onmousedown = function (event) {
                event = event || window.event;
                // 判断用户是否开启定位
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                }
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;

                // 当鼠标移动时被拖拽元素跟随鼠标移动 onmousemove
                document.onmousemove = function (event) {
                    event = event || window.event;
                    // 获取鼠标坐标
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;
                    // 修改obj的位置
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                    // 碰撞检测
                    var Top1 = obj.offsetTop;
                    var Bottom1 = obj.offsetTop + obj.offsetHeight;
                    var Left1 = obj.offsetLeft;
                    var Right1 = obj.offsetLeft + obj.offsetWidth;

                    var Top2 = obj1.offsetTop;
                    var Bottom2 = obj1.offsetTop + obj1.offsetHeight;
                    var Left2 = obj1.offsetLeft;
                    var Right2 = obj1.offsetLeft + obj1.offsetWidth;

                    if (!(Right1 < Left2 || Left1 > Right2 || Top1 > Bottom2 || Bottom1 < Top2)) {
                        var funs = fun;
                        funs();
                    }

                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },

        /******************************************【10.开启拖拽(综合版)】****************************************/

        /**
         *  碰撞检测(综合版)
         * 参数说明：
         *      obj：被拖拽对象
         *      obj1：被撞对象(可有可无)
         *      flag: 是否开启范围限制和磁性吸附,如果为true则开启范围限制，如果不传或者传递的是false则不开启范围限制（默认不开启范围限制）
         *      value：吸附距离(单纯用来拖拽可不用传递，如果考虑碰撞则必须传递)
         *      fun: 碰撞后要设置的事件方法（可有可无）
         *      
         */
        multipleDrag: function (obj, flag, value, obj1, fun) {
            // 为obj绑定鼠标按下事件
            // 当鼠标在被拖拽元素上按下时，开始拖拽 onmousedown
            obj.onmousedown = function (event) {
                event = event || window.event;
                // 判断用户是否开启定位
                if (tools.getStyle(obj, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                }
                var ol = event.clientX - this.offsetLeft;
                var ot = event.clientY - this.offsetTop;

                // 当鼠标移动时被拖拽元素跟随鼠标移动 onmousemove
                document.onmousemove = function (event) {
                    event = event || window.event;
                    // 获取鼠标坐标
                    var x = event.clientX - ol;
                    var y = event.clientY - ot;

                    // 初始化value
                    var adsorb = 0;
                    // 初始化limit
                    limit = flag === true ? true : false;
                    // 设置范围
                    if (limit) {
                        // 如果吸附距离有值则开启吸附
                        if (value) {
                            adsorb = value;
                        }
                        // 如果flag为true则开启范围限制
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
                    // 修改obj的位置
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                    // 碰撞检测
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
                            var funs = fun;
                            funs();
                        }
                    }

                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            };
        },

        /******************************************【11.开启进度条拖拽】****************************************/
        /**
         * 进度条横向拖拽
         * 参数说明：
         *      - 必传参数
         *      obj1: 被拖拽对象
         *      obj2：进度条显示对象
         *      flag: 如果flag为 row 则水平拖拽，如果flag为 colume 则垂直拖拽
         *      
         *      - 选传参数
         *          obj3: 显示百分比对象
         *      
         */
        dragX: function (obj1, flag, obj2, obj3) {
            // 为进度条方块绑定鼠标按下事件
            obj1.onmousedown = function (event) {
                event = event || window.event;
                // 判断用户是否开启定位
                if (tools.getStyle(obj1, "position") == "static") {
                    alert("尚未开启定位，无法进行拖拽");
                    console.error("尚未开启定位，无法进行拖拽");
                }
                // 获取鼠标偏移量
                var progressX = event.clientX - this.offsetLeft;
                var progressY = event.clientY - this.offsetTop;
                // 绑定鼠标移动事件
                document.onmousemove = function (event) {
                    event = event || window.event;
                    // 获取方块偏移量
                    var innerX = event.clientX - progressX;
                    var innerY = event.clientY - progressY;
                    // 获取方块移动总距离
                    var progressWidth = obj1.parentNode.clientWidth - obj1.offsetWidth;
                    var progressHeight = obj1.parentNode.clientHeight - obj1.offsetHeight;
                    // 控制范围，防止越界
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
                    if (flag == "row") {
                        // 修改方块偏移量 和 显示进度条底色
                        obj1.style.left = obj2.style.width = innerX + "px";
                        // 显示百分比
                        if (obj3) {
                            obj3.innerHTML = Math.round(innerX * 100 / progressWidth) + "%";
                        }
                    } else if (flag == "colume") {
                        // 修改方块偏移量 和 显示进度条底色
                        obj1.style.bottom = obj2.style.height = innerY + "px";
                        // 显示百分比
                        if (obj3) {
                            obj3.innerHTML = Math.round(innerX * 100 / progressWidth) + "%";
                        }
                    }
                };
                // 绑定鼠标抬起事件
                document.onmouseup = function () {
                    // 取消鼠标移动事件
                    document.onmousemove = null;
                    // 取消鼠标抬起事件
                    document.onmouseup = null;
                };
                // 取消默认行为
                return false;
            };
        },

        /******************************************【12.图像生成马赛克】****************************************/
        /**
         * 参数说明：
         *      -src:被处理图像的路径(String类型)
         *      -level:马赛克处理程度（Number类型）
         *      -obj:画笔对象
         *      -flag:是否保留原始图像
         */
        mosaic: function (src, level, obj, flag) {
            var img = new Image();
            img.src = src;
            img.onload = function () {
                test.width = img.width * 2; //将画布扩大两倍
                test.height = img.height;
                draw();
            };
            // 定义方法操作图片
            function draw() {
                // 插入图片
                obj.drawImage(img, 0, 0);
                var oldImgData = obj.getImageData(0, 0, img.width, img.height);
                var newImgData = obj.createImageData(img.width, img.height);

                // 马赛克
                /**
                 * 1.选取一个马赛克矩形
                 * 2.从马赛克矩形中随机抽出一个像素点的信息（rgba）
                 * 3.将整个马赛克矩形中的像素点信息统一调成随机抽出的那个
                 */
                // 设置马赛克矩形尺寸
                if (level <= 0) {
                    alert("level 的值不合法");
                    level = 1;
                }
                var size = level;
                // 选取一个马赛克矩形
                for (var i = 0; i < oldImgData.width / size; i++) {
                    for (var j = 0; j < oldImgData.height / size; j++) {
                        // （i,j）每个马赛克矩形中的每一个像素的坐标
                        // 马赛克矩形坐标:(0,0)----》马赛克矩形中的像素点： (0,0)---》(4,4)
                        // 马赛克矩形坐标:(0,1)----》马赛克矩形中的像素点： (0,5)---》(4,9)
                        // 马赛克矩形坐标:(1,0)----》马赛克矩形中的像素点： (5,0)---》(9,4)
                        // 马赛克矩形坐标:(1,1)----》马赛克矩形中的像素点： (5,5)---》(9,9)

                        // 获取单个像素信息(x和y为像素点的坐标)
                        var x = i * size + Math.floor(Math.random() * size);
                        var y = j * size + Math.floor(Math.random() * size);
                        var color = getPxInfo(oldImgData, x, y);

                        // 将整个马赛克矩形中的像素点信息统一换成随机抽出的那个
                        for (var a = 0; a < size; a++) {
                            for (var b = 0; b < size; b++) {
                                setPxInfo(newImgData, i * size + a, j * size + b, color);
                            }
                        }
                    }
                }
                // 清空画布信息
                obj.clearRect(0, 0, test.widht, test.height);
                // 重新写入像素信息
                if (flag == true) {
                    obj.putImageData(newImgData, img.width, 0);
                } else {
                    obj.putImageData(newImgData, 0, 0);
                }
                // 创建方法获取单个点的像素信息
                function getPxInfo(imgdata, x, y) {
                    var color = [];
                    var data = imgdata.data;
                    var w = imgdata.width;
                    var h = imgdata.height;
                    // (x,y) x*w+y:这里 w 代表的是一行上边像素点的个数，x表示列，y表示行
                    // r
                    color[0] = data[(y * w + x) * 4];
                    // g
                    color[1] = data[(y * w + x) * 4 + 1];
                    // b
                    color[2] = data[(y * w + x) * 4 + 2];
                    // a
                    color[3] = data[(y * w + x) * 4 + 3];

                    return color;
                }
                // 创建方法修改像素信息
                function setPxInfo(imgdata, x, y, color) {
                    var data = imgdata.data;
                    var w = imgdata.width;
                    var h = imgdata.height;
                    // (x,y) x*w+y:这里 w 代表的是一行上边像素点的个数，x表示列，y表示行
                    // r
                    data[(y * w + x) * 4] = color[0];
                    // g
                    data[(y * w + x) * 4 + 1] = color[1];
                    // b
                    data[(y * w + x) * 4 + 2] = color[2];
                    // a
                    data[(y * w + x) * 4 + 3] = color[3];

                    return color;
                }
            }
        },

        /******************************************【13.固定整数位数】****************************************/
        /**
         * 定义方法固定位数（位数不够，前面补充自定义数字），实现视频时间显示为两位数。
         * 参数说明：
         *  num：被操作数
         *  n： 固定的总位数
         *  nums：位数不足时要补充的数
         */
        cover: function (num, n, nums) {
            return (Array(n).join(nums) + num).slice(-n);
        },

        /******************************************【14.刮刮卡特效】****************************************/
        /**
         * 参数说明：
         *  obj: 画布
         *  image: 刮刮卡外部遮挡图片（被刮图层）路径，String类型
         */
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
                    var flag = 0; //存储像素点个数
                    ctx.drawImage(img, 0, 0, obj.width, obj.height);

                    // 手指按下事件
                    obj.addEventListener("touchstart", function (event) {
                        event = event || window.event;
                        var touchC = event.changedTouches[0];

                        // 获取手指偏移量
                        var x = touchC.clientX - this.offsetLeft;
                        var y = touchC.clientY - this.offsetTop;

                        // 将样式定义到全局
                        ctx.lineWidth = 40;
                        ctx.lineCap = "round"; //设定线条末尾是圆形
                        ctx.lineJoin = "round"; //设定线条与线条间接合处为圆形
                        ctx.globalCompositeOperation = "destination-out"

                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(x, y); //这里采用划线的方式而不采用画圆的方式是为了防止滑动速度过快而出现断裂间隙
                        ctx.lineTo(x + 1, y + 1);
                        ctx.stroke();
                        ctx.restore();
                    });

                    // 手指移动事件
                    obj.addEventListener("touchmove", function (event) {
                        event = event || window.event;
                        var touchC = event.changedTouches[0];

                        // 获取手指偏移量
                        var x = touchC.clientX - this.offsetLeft;
                        var y = touchC.clientY - this.offsetTop;

                        ctx.save();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y);
                        ctx.stroke();
                        ctx.restore();
                    });

                    // 手指抬起事件
                    obj.addEventListener("touchend", function () {
                        var imgData = ctx.getImageData(0, 0, this.width, this.height);
                        var allPx = imgData.width * imgData.height;
                        for (var i = 0; i < allPx; i++) {
                            // rgba中的 a 控制透明。a:data[4*i+3]
                            // 如果抬起手指图像透明
                            if (imgData.data[4 * i + 3] == 0) {
                                flag++;
                            }
                        }
                        if (flag >= allPx / 2) {
                            obj.style.opacity = "0"; //画布透明
                        }
                    });

                    // 过度执行完
                    obj.addEventListener("transitionend", function () {
                        this.remove(); //移除画布
                    });
                }
            }
        },

        /******************************************【15.键盘控制div移动】****************************************/
        /**
         * 参数说明:
         *      obj: 要移动的对象
         *      speeds:移动速度
         *      setSpeed: 设置加速度多少(默认是0)
         */
        divMove: function (obj, speeds, setSpeed) {
            //定义变量存储键盘编码(影响移动方向)
            var choice = 0;
            // 定义变量存储移动速度
            var speed = speeds;
            // 绑定键盘按下事件
            document.onkeydown = function (event) {
                event = event || window.event;
                // 按下ctrl时加速
                if (event.ctrlKey) {
                    speed = setSpeed;
                } else {
                    speed = speeds;
                }
                choice = event.keyCode;
                console.log(choice);
            };
            // 绑定键盘松开事件
            document.onkeyup = function (event) {
                event = event || window.event;
                choice = 0;
            };
            // 开启定时器,控制div移动
            setInterval(function () {
                /**
                 * 37左
                 * 38上
                 * 39右
                 * 40下
                 */
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
        /******************************************【16.轮播图】****************************************/
        /**
         * 参数说明:
         *      obj1 : 轮播图显示容器
         *      obj2 : 图片存储容器
         *      obj3 : 轮播图导航
         *      obj4 : 轮播图左右轮播控制
         *      img  : 图片标签
         */
        loopChart: function (obj1, obj2, obj3, obj4) {

        },

        /******************************************【call方法】****************************************/
        /**
         * 功能说明：
         *      -改变方法this指向，执行方法并返回结果
         *      -即执行Fn,使this为obj，并将后面的n个参数传给fn(功能等同于方法对象的call方法),如果obj为null，则 this 指向全局对象
         * 参数说明：
         *      Fn ：要执行的方法
         *      obj：方法运行时this指向的对象
         *      ...args：方法运行时的参数(可多个)
         * 
         */
        call: function (Fn, obj, ...args) {
            // 判断
            if (obj === undefined || obj === null) {
                obj = globalThis; //全局对象
            }
            // 为 obj 添加临时的方法
            obj.temp = Fn;
            // 调用 temp 方法
            let result = obj.temp(...args);
            // 删除 temp 方法
            delete obj.temp;
            // 返回执行结果
            return result;
        },
        /******************************************【apply方法】****************************************/
        /**
         * 功能说明：
         *      -改变方法this指向，执行方法并返回结果
         *      -即执行Fn,使this为obj，并将args数组中的元素传给fn(功能等同于方法对象的apply方法),如果obj为null，则 this 指向全局对象
         * 参数说明：
         *      Fn ：要执行的方法
         *      obj：方法运行时this指向的对象
         *      args: 数组
         *      
         */
        apply: function (Fn, obj, args) {
            // 判断
            if (obj === undefined || obj === null) {
                obj = globalThis;
            }
            // 为 obj 添加临时的方法
            obj.temp = Fn;
            // 执行方法
            let result = obj.temp(...args);
            // 删除临时属性
            delete obj.temp;
            // 返回结果
            return result;
        },
        /******************************************【bind方法】****************************************/
        /**
         * 限制事件处理方法频繁调用：1.方法节流 2.方法防抖
         * 功能说明：
         *      --改变方法this指向，执行方法并返回结果
         *      -给Fn绑定this为obj，并指定参数为后面的n个参数(功能等同于方法对象的bind方法)
         * 参数说明：
         *      Fn : 要执行的方法
         *      obj : 方法运行时this指向的对象
         *      ...args: 方法运行时的参数
         *      ...args2: 方法运行时的参数
         */
        bind: function (Fn, obj, ...args) {
            // 返回一个新的方法
            return function (...args2) {
                // 执行 call 方法
                return Free.call(Fn, obj, ...args, ...args2);
            }
        },
        /******************************************【方法节流】****************************************/
        /**
         * 节流了解：
         *      -在方法需要频繁触发时：方法执行一次后，只有大于设定的执行周期后才会执行第二次
         *      -适用于多次事件按事件做平均分配触发
         * 功能场景：
         *      -窗口调整(resize)
         *      -页面滚动(scroll)
         *      -DOM元素的拖拽功能实现(mousemove)
         *      -抢购疯狂点击(click)
         *      -向后台发送请求(ajax)
         * 功能说明:
         *      -创建一个节流方法，在wait毫秒内最多执行 callback 一次
         * 
         * 参数说明：
         *      @param {Function} callback
         *      @param {Number} wait  时间间隔
         */
        throttle: function (callback, wait) {
            // 定义开始时间
            let start = 0;
            // 返回结果是一个方法
            return function (event) {
                // 获取当前的时间戳
                let nowTime = Date.now();
                // 判断
                if (nowTime - start >= wait) {
                    // 若满足条件则执行回调方法,this指向事件源(事件调用者)
                    callback.call(this, event);
                    // 修改开始时间
                    start = nowTime;
                }
            }
        },
        /******************************************【方法防抖】****************************************/
        /**
         * 功能说明：
         *      -创建一个防抖方法，该方法会从上一次被调用后，延迟 wait 毫秒后调用
         * 参数说明：
         *      @param {Function} callback
         *      @param {Number} time  时间间隔
         */
        debounce: function (callback, time) {
            // 定时器标识
            let timer = null;
            // 返回一个方法
            return function (event) {
                // 关闭上一次的定时器
                clearTimeout(timer);
                // 启动定时器
                timer = setTimeout(() => {
                    // 执行回调
                    callback(this, event);
                }, time)
            }
        },
        /******************************************【map方法】****************************************/
        /** 
         * 功能说明:
         *      -创建一个新数组，其结果是 该数组中的每个元素是调用一次提供的方法后的返回值
         *      -即返回一个由回调方法的返回值组成的新数组
         * 参数说明：
         *      @param {Array} arr
         *      @param {Function} callback
         */
        map: function (arr, callback) {
            // 声明一个空数组
            let result = [];
            // 遍历数组
            for (let i = 0; i < arr.length; i++) {
                // 执行回调
                result.push(callback(arr[i], i));
            }
            // 返回结果
            return result;
        },
        /******************************************【reduce方法】****************************************/
        /**
         * 功能说明：
         *     -从左到右为每个数组元素执行一次回到方法，并把上次回调方法的返回值放在一个暂存器中，传给下次回调方法，
         *          并返回最后一次回调方法的返回值。
         * 参数说明：
         *     @param {Array} arr
         *     @param {Function} callback
         *     initValue : 初始值    
         */
        reduce: function (arr, callback, initValue) {
            // 声明变量
            let result = initValue;
            // 遍历数组
            for (let i = 0; i < arr.length; i++) {
                // 执行回调
                result = callback(result, arr[i]);
            }
            // 返回最终的结果
            return result;
        },
        /******************************************【filter方法】****************************************/
        /**
         * 功能说明：
         *    
         * 参数说明：
         *      @param {Array} arr
         *      @param {Function} callback
         */
        filter: function (arr, callback) {
            // 声明空数组
            let result = [];
            // 遍历数组
            for (let i = 0; i < arr.length; i++) {
                // 执行回调
                let res = callback(arr[i], i);
                // 判断 如果为 真 则压入到 result 结果中
                if (res) {
                    result.push(arr[i]);
                }
            }
            // 返回结果
            return result;
        },
        /******************************************【find方法】****************************************/
        /**
         * 功能说明：
         *      -找到第一个满足测试方法的元素并返回那个元素的值，如果找不到，则返回 undefined
         * 参数说明：
         *      @param {Array} arr
         *      @param {Function} callback
         */
        find: function (arr, callback) {
            // 遍历数组
            for (let i = 0; i < arr.length; i++) {
                // 执行回调
                let res = callback(arr[i], i);
                // 判断
                if (res) {
                    // 返回当前正在遍历的元素
                    return arr[i];
                }
            }
            // 如果没有遇到满足条件的 返回 undefined
            return undefined;
        },
        /******************************************【findIndex方法】****************************************/
        /**
         * 功能说明：
         *      -找到第一个满足测试方法的元素并返回那个元素的索引，如果找不到则返回 undefined
         * 参数说明：
         *      @param {Array} arr
         *      @param {Function} callback
         */
        findIndex: function (arr, callback) {
            // 遍历数组
            for (let i = 0; i < arr.length; i++) {
                // 执行回调
                let res = callback(arr[i], i);
                // 判断
                if (res) {
                    // 返回当前正在遍历的元素
                    return i;
                }
            }
            // 如果没有遇到满足条件的 返回 undefined
            return undefined;
        },
        /******************************************【every方法】****************************************/
        /**
         * 功能说明：
         *      -如果数组中的每个元素都满足测试方法，则返回 true，否则返回false
         * 参数说明：
         *      @param {Array} arr
         *      @param {Function} callback
         */
        every: function (arr, callback) {
            // 遍历数组
            for (let i = 0; i < arr.length; i++) {
                // 执行回调,如果回调执行结果返回为 false
                if (!callback(arr[i], i)) {
                    return false;
                }
            }
            return true;
        },
        /******************************************【some方法】****************************************/
        /**
         * 功能说明：
         *      -如果数组中至少有一个元素满足测试方法，则返回 true，否则返回false
         * 参数说明：
         *      @param {Array} arr
         *      @param {Function} callback
         */
        some: function (arr, callback) {
            // 遍历数组
            for (let i = 0; i < arr.length; i++) {
                // 执行回调,如果回调执行结果返回为 true
                if (callback(arr[i], i)) {
                    return true;
                }
            }
            return false;
        },
        /******************************************【unique方法】****************************************/
        /**
         * 功能说明：
         *      -根据当前数组产生一个去除重复元素后的新数组
         * 参数说明:
         *      @param {Array} arr
         */
        unique: function (arr) {
            // 声明一个空数组
            const result = [];
            // 遍历原始数组
            arr.forEach(item => {
                // 检查 result 数组中是否包含这个元素
                if (result.indexOf(item) === -1) {
                    // 若没有该元素，则插入到result中
                    result.push(item);
                }
            });
            // 返回
            return result;
        },
        /******************************************【unique2方法】****************************************/
        /**
         * 功能说明：
         *      -根据当前数组产生一个去除重复元素后的新数组
         * 参数说明:
         *  @param {Array} arr 
         */
        unique2: function (arr) {
            // 声明空数组
            const result = [];
            // 声明空对象
            const obj = {};
            // 遍历数组
            arr.forEach(item => {
                if (obj[item] === undefined) {
                    // 将 item 作为下标存储在obj中
                    obj[item] = true;
                    result.push(item);
                }
            });
            // 返回结果
            return result;
        },
        /******************************************【unique3方法】****************************************/
        /**
         * 功能说明：
         *      -根据当前数组产生一个去除重复元素后的新数组
         * 参数说明:
         *  @param {Array} arr 
         */
        unique3: function (arr) {
            // // 将数组转化为集合 set
            // let set = new Set(arr);
            // // 将 set 展开创建一个数组
            // let array = [...set];
            // return array;
            return [...new Set(arr)];
        },
        /******************************************【concat方法】****************************************/
        /**
         * 功能说明：
         * 参数说明：
         * 
         */
        concat:function(arr,...args){
            // 声明一个空数组
            const result = [...arr];
            // 遍历数组
            args.forEach(item =>{
                // 判断 item 是否为数组
                if(Array.isArray(item)){
                    // 将数组 item 展开再存入
                    result.push(...item);
                }else {
                    // 将非数组 item 直接存入
                    result.push(item);
                }
            });
            // 返回结果
            return result;
        },
    }

})(window);