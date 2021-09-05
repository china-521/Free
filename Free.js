(function (window) {
    window.tools = window.free = window.property = {
        /******************************************【1.简单动画和获取元素样式】*************************************** */
        // 定义方法获取元素的样式
        /**
         * 参数说明：
         *  obj,要获取样式的对象。
         *  name,要获取的样式。
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
        //创建一个可以执行动画的函数。
        /**
         * 参数说明
         *  obj，要执行动画的参数。
         *  attr，要执行动画的样式，比如left，top，height，width等(以字符串形式传入)。
         *  target，执行动画的目标位置(移动边界)。
         *  speed，移动速度(传递一个正值即可)。
         *  callback,回调函数,这个函数将会在动画执行完毕以后执行（增加函数的可扩展性）。
         */
        move: function (obj, attr, target, speed, callback) {
            // 关闭上一次的定时器(防止每次点击时创建新的定时器导致速度加快)
            clearInterval(obj.timer);
            // 获取元素当前相对位置
            var current = parseInt(free.getStyle(obj, attr));
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
                var oldValue = parseInt(free.getStyle(obj, attr));
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
                    //动画执行完毕，调用回调函数(采用“与”的形式是为了使用户在不需要回调函数时，就不用传递回调函数这个参数)
                    callback && callback();
                }
            }, 30)
        },

        /******************************************【2.样式类操作】*************************************** */
        // 定义一个函数，用来向一个元素中添加指定的class属性值
        /** 
         * 添加一个类到指定的类中。
         *   参数说明：
         *     obj 要添加class属性的元素
         *     cn 要添加的clsaa值（类名）。字符串形式
         */
        addClass: function (obj, cn) {
            // 判断obj中是否有cn这个class,如果没有在添加，否则不添加。（防止添加多个相同类）
            if (!hasClass(obj, cn)) {
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
            if (hasClass(obj, cn)) {
                // 如果有cn，则删除
                removeClass(obj, cn);
            } else {
                // 如果没有则添加
                addClass(obj, cn);
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
        getElement:function(obj){
            return document.querySelector(obj);
        },
        /******************************************【3.绑定单击响应函数】****************************************/
        /**
         * 参数说明：
         *  obj，要绑定的对象选择器
         *  fun, 回调函数。--->function(){}
         */
        myClickAll: function (obj, fun) {
            var btn = document.querySelector(obj);
            btn.onclick = fun;
        },

        /******************************************【4.开启任意拖拽】****************************************/
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

        /******************************************【5.开启拖拽(有范围限制)】****************************************/
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

        /******************************************【6.开启拖拽(磁性吸附)】****************************************/
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

        /******************************************【7.开启拖拽(碰撞检测)】****************************************/
        /**
         *  碰撞检测(有磁性吸附和范围限制)
         * 参数说明：
         *      obj：被拖拽对象
         *      obj1：被撞对象
         *      absorb：吸附距离
         *      fun: 碰撞后要设置的事件函数
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

        /******************************************【8.开启拖拽(碰撞检测)】****************************************/
        /**
         * 碰撞检测（无范围限制）
         * obj：被拖拽对象
         *      obj: 拖拽对象 
         *      obj1: 碰撞对象
         *      fun : 碰撞后要设置的事件函数
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

        /******************************************【9.开启拖拽(综合版)】****************************************/

        /**
         *  碰撞检测(综合版)
         * 参数说明：
         *      obj：被拖拽对象
         *      obj1：被撞对象(可有可无)
         *      flag: 是否开启范围限制和磁性吸附,如果为true则开启范围限制，如果不传或者传递的是false则不开启范围限制（默认不开启范围限制）
         *      value：吸附距离(单纯用来拖拽可不用传递，如果考虑碰撞则必须传递)
         *      fun: 碰撞后要设置的事件函数（可有可无）
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

        /******************************************【10.开启进度条拖拽】****************************************/
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

        /******************************************【11.图像生成马赛克】****************************************/
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
                // 创建函数获取单个点的像素信息
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
                // 创建函数修改像素信息
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

        /******************************************【12.固定整数位数】****************************************/
        /**
         * 定义函数固定位数（位数不够，前面补充自定义数字），实现视频时间显示为两位数。
         * 参数说明：
         *  num：被操作数
         *  n： 固定的总位数
         *  nums：位数不足时要补充的数
         */
        cover: function (num, n, nums) {
            return (Array(n).join(nums) + num).slice(-n);
        },

        /******************************************【13.刮刮卡特效】****************************************/
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

        /******************************************【14.键盘控制div移动】****************************************/
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
    }
    /******************************************【end.提示/帮助】****************************************/
    console.log('Welcome to my CSDN:\n'+'https://mp.csdn.net/mp_blog/manage/article?spm=1000.2115.3001.5448');
})(window);