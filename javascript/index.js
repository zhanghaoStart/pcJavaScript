//AuthorBy--------> zhanghao



//唯一全局变量
const MyApplication  = {
    //封装继承函数；
    inherit : (function () {
        var Fer = new Function();
        return function (Son,Father) {
            Fer.prototype = Father.prototype;
            Son.prototype = new Fer();
            Son.prototype.constructor =  Son;
            Son.prototype.uber = Father;//超类
        }
    }()),
    //声明文档构造函数  祖宗级构造函数
    Mydocument : function(){},
    //声明头部导航模块构造函数
    Nav : function(){
        this.init();
    },
    //声明右侧固定栏模块构造函数
    RightFixed : function () {
        this.init()
    },
    //声明中间导航模块函数
    MiddleNav : function () {
        this.init()
    },
    //声明底部banner模块函数
    BottomBanner:function () {
        this.init()
    }
};

//定义公共dom接口和共有方法
MyApplication.Mydocument.prototype = {
    constructor : MyApplication.Mydocument,
    dom:{
        //导航栏navBar
        navBar : document.getElementsByClassName('nav_bar')[0],
        //导航栏左li列表集合
        navLiLeftList : document.getElementsByClassName('nav_bar')[0].getElementsByTagName('ul')[0].getElementsByTagName('li'),
        //左侧列表二级菜单集合
        navLiTwoLevelMenuList:document.getElementsByClassName('nav_bar')[0].getElementsByClassName('liLeftIndexPublic'),
        //导航栏左li列表集合
        navLoginLiList : document.getElementsByClassName('login')[0].getElementsByTagName('ul')[0].getElementsByTagName('li'),
        //二级菜单li集合
        twoLiList : document.getElementsByClassName('liLeftIndex2')[0].getElementsByTagName('li'),
        //三级菜单集合
        threeDivList : document.getElementsByClassName('threeNavPublic'),
        //二级菜单中的解决方案div
        twoSelove : document.getElementsByClassName('liLeftIndex2')[0],
        //二级菜单第一个出现的li
        firstSecondLi : document.getElementsByClassName('first_show')[0],
        //右侧固定导航栏的toTop按钮
        toTopBtn : document.getElementsByClassName('fixedArea_bottom')[0],
        //toTop中的icon
        toTopIcon : document.getElementsByClassName('fixedArea_bottom')[0]
            .getElementsByTagName('span')[0],
        //右侧固定导航中间按钮
        middleBtn : document.getElementsByClassName('fixedArea_middle')[0],
        //按钮触发的盒子
        contactUs : document.getElementsByClassName('contactUs')[0],
        //body
        body : document.body,
        //html
        html : document.documentElement,
        //中间导航span集合
        spanList : document.getElementsByClassName('middle_nav')[0].getElementsByClassName('container')[0].getElementsByTagName('span'),
        //中间导航栏
        middleBar : document.getElementsByClassName('middle_nav')[0],
        //中间的小黄条
        yellowLine : document.getElementsByClassName('middle_nav')[0].getElementsByClassName('container')[0].getElementsByTagName('i')[0],
        //中间banner
        middleBanner : document.getElementsByClassName('middle_banner')[0],
        //六个优势板块
        sixBetter : document.getElementsByClassName('sixBetter')[0],
        //权威认证板块
        quanwei : document.getElementsByClassName('quanwei')[0],
        //联网方式
        interWay:document.getElementsByClassName('interWay')[0],
        //替代盒子
        insteadBox: document.getElementsByClassName('append')[0],
        //echart盒子
        main : document.getElementById("main"),
    },
    methodPublic:{
        //设置元素透明度,透明度值按IE规则计,即0~100
        SetOpacity: function(ev, v){
            ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100 + '';
        },
        //淡入
        fadeIn:function (elem, speed, opacity){
            /*
             * 参数说明
             * elem==>需要淡入的元素
             * speed==>淡入速度,正整数(可选)
             * opacity==>淡入到指定的透明度,0~100(可选)
             */
            speed = speed || 20;
            opacity = opacity || 100;
            //显示元素,并将元素值为0透明度(不可见)
            elem.style.display = 'block';
            MyApplication.Mydocument.prototype.methodPublic.SetOpacity(elem, 0);
            //初始化透明度变化值为0
            let val = 0;
            //循环将透明值以5递增,即淡入效果
            (function(){
                MyApplication.Mydocument.prototype.methodPublic.SetOpacity(elem, val);
                val += 5;
                if (val <= opacity) {
                    setTimeout(arguments.callee, speed)
                }
            })();
        },
        //淡出
        fadeOut:function (elem, speed, opacity){
            /*
             * 参数说明
             * elem==>需要淡入的元素
             * speed==>淡入速度,正整数(可选)
             * opacity==>淡入到指定的透明度,0~100(可选)
             */
            speed = speed || 20;
            opacity  = opacity || 0;
            //初始化透明度变化值为0
            var val = 100;
            //循环将透明值以5递减,即淡出效果
            (function(){
                var timer ;
                MyApplication.Mydocument.prototype.methodPublic.SetOpacity(elem, val);
                val -= 5;
                if (val >= opacity) {
                    setTimeout(arguments.callee, speed);
                }else if (val < 0) {
                    //元素透明度为0后隐藏元素
                    elem.style.display = 'none';
                }
            })();
        },
        //页面滚动动画
        rollAnimation : function (ele,nowLocationY,speed,time) {
            clearInterval(this.timer1);
            let y = ele.offsetTop ;
            let that = this ;
            this.timer1 = setInterval(function () {
                if(nowLocationY > y){
                    if(nowLocationY  - y <= speed){
                        window.scroll(0,y);
                        clearInterval(that.timer1);
                    }
                    else {
                        nowLocationY -= speed ;
                        window.scroll(0,nowLocationY)
                    }
                }
                else{
                    if(y  - nowLocationY  <= speed){
                        window.scroll(0,y);
                        clearInterval(that.timer1);
                    }
                    else {
                        nowLocationY += speed ;
                        window.scroll(0,nowLocationY)
                    }
                }
            },time)

        },
        //中间导航橘色小条条的动画
        iAnimation : function (ele,current,origin,speed,time) {
            clearInterval(this.timer);
            current = ele.offsetLeft;
            //向右
            let that = this ;
            if(origin > current){
                this.timer = setInterval(function () {
                    if(origin - current <= speed){
                        current = origin ;
                        ele.style.left = current + 'px';
                        clearInterval(that.timer);
                    }
                    else {
                        current += speed ;
                        ele.style.left = current + 'px';
                    }
                },time)
            }
            //向左
            else {
                this.timer = setInterval(function () {
                    if(current - origin <= speed){
                        current = origin ;
                        ele.style.left = current + 'px';
                        clearInterval(that.timer);
                    }
                    else {
                        current -= speed ;
                        ele.style.left = current + 'px';
                    }
                },time)
            }
        },
    }
};

/*Nav模块开始*/
{
    //继承祖宗的dom接口和方法 ；
    MyApplication.inherit(MyApplication.Nav, MyApplication.Mydocument);
    //定义导航模块构造函数的原型中的鼠标进入左侧li的事件
    MyApplication.Nav.prototype.leftEnter = function () {
        //this指向实例对象nav
        let that = this;
        //闭包使that拿到上一级作用域链的this指向
        for (let i = 0; i <= this.dom.navLiLeftList.length - 1; i++) {
            this.dom.navLiLeftList[i].onmouseenter = function () {
                for (let i = 0; i <= that.dom.navLiLeftList.length - 1; i++) {
                    that.dom.navLiLeftList[i].style.backgroundColor = '';
                }
                that.dom.navLiLeftList[i].style.backgroundColor = 'rgb(32,41,58)';
                let z = i;
                //鼠标进入清空二级菜单
                for (let i = 0; i <= that.dom.navLiTwoLevelMenuList.length - 1; i++) {
                    that.dom.navLiTwoLevelMenuList[i].style.display = 'none';
                }
                //显示对应二级菜单显示
                for (let i = 0; i <= that.dom.navLiTwoLevelMenuList.length - 1; i++) {
                    if (that.dom.navLiTwoLevelMenuList[i].dataset.id === z + '') {
                        that.methodPublic.fadeIn(that.dom.navLiTwoLevelMenuList[i], 5, 85);
                    }
                }
            };
        }
        //鼠标离开navBar清除所有二级菜单
        this.dom.navBar.onmouseleave = function () {
            //鼠标离开清空
            for (let i = 0; i <= that.dom.navLiTwoLevelMenuList.length - 1; i++) {
                that.dom.navLiTwoLevelMenuList[i].style.display = 'none';
            }
        }
    };
    //鼠标离开nav中li的事件
    MyApplication.Nav.prototype.leftLeave = function () {
        //this指向实例对象nav
        let that = this;
        //闭包使that拿到上一级作用域链的this指向
        for (let i = 0; i <= this.dom.navLiLeftList.length - 1; i++) {
            this.dom.navLiLeftList[i].onmouseleave = function () {
                for (let i = 0; i <= that.dom.navLiLeftList.length - 1; i++) {
                    that.dom.navLiLeftList[i].style.backgroundColor = '';
                }
            };
        }
    };
    //定义鼠标进入二级菜单事件
    MyApplication.Nav.prototype.twoEnter = function () {
        //this指向实例对象nav
        let that = this;
        //闭包使that拿到上一级作用域链的this指向
        this.dom.navLiLeftList[2].addEventListener('mouseenter', function () {
            that.dom.twoLiList[0].style.backgroundColor = 'rgb(26,34,50)';
            that.dom.firstSecondLi.style.color = '#ff6000';
            that.methodPublic.fadeIn(that.dom.threeDivList[0], 5);
        }, false);
        for (let i = 0; i <= this.dom.twoLiList.length - 1; i++) {
            this.dom.twoLiList[i].onmouseenter = function () {
                that.dom.firstSecondLi.style.color = '';
                for (let i = 0; i <= that.dom.twoLiList.length - 1; i++) {
                    that.dom.twoLiList[i].style.backgroundColor = '';
                }
                that.dom.twoLiList[i].style.backgroundColor = 'rgb(26,34,50)';
                let z = i;
                //关闭其他三级菜单
                //显示对应三级菜单显示
                for (let i = 0; i <= that.dom.threeDivList.length - 1; i++) {
                    that.dom.threeDivList[i].style.display = 'none';
                }
                //显示对应三级菜单显示
                for (let i = 0; i <= that.dom.threeDivList.length - 1; i++) {
                    if (that.dom.threeDivList[i].dataset.id === z + '') {
                        that.methodPublic.fadeIn(that.dom.threeDivList[i], 5)
                    }
                }
            }
        }
    };
    //定义鼠标离开三级菜单事件
    MyApplication.Nav.prototype.threeLeave = function () {
        //this指向实例对象nav
        let that = this;
        //闭包使that拿到上一级作用域链的this指向
        this.dom.twoSelove.onmouseleave = function () {
            for (let i = 0; i <= that.dom.threeDivList.length - 1; i++) {
                that.dom.threeDivList[i].style.display = 'none';
            }
        };
    };
    MyApplication.Nav.prototype.init = function (){
        // 导航对象-注册了-左侧导航栏鼠标进入li的事件
        this.leftEnter();
        //导航对象-注册了-左侧导航栏鼠标离开li的事件
        this.leftLeave();
        //导航对象-注册了-左侧导航栏鼠标进入二级导航的事件
        this.twoEnter();
        //导航对象-注册了-左侧导航栏鼠标离开三级导航的事件
        this.threeLeave();
    }
}
/*Nav模块结束了*/


/*右侧固定栏模块开始了*/
{
    //继承祖宗的dom接口和方法
    MyApplication.inherit(MyApplication.RightFixed, MyApplication.Mydocument);
    //定义右侧固定栏toTop下滑出上滑进事件
    MyApplication.RightFixed.prototype.RightBottomShow = function () {
        //this指向实例对象nav
        let that = this;
        if(that.dom.html.scrollTop > 502){
            that.dom.toTopIcon.style.display = 'block';
            that.dom.toTopBtn.classList.add('fixshow');
        }
        else {
            that.dom.toTopIcon.style.display = 'none';
            that.dom.toTopBtn.classList.remove('fixshow');
        }
        window.addEventListener('scroll',function () {
            if(that.dom.html.scrollTop > 502){
                that.dom.toTopIcon.style.display = 'block';
                that.dom.toTopBtn.classList.add('fixshow');
            }
            else {
                that.dom.toTopIcon.style.display = 'none';
                that.dom.toTopBtn.classList.remove('fixshow');
            }
        },false);
    };
    MyApplication.RightFixed.prototype.enterMiddle = function () {
        //this指向实例对象nav
        let that = this;
        this.dom.middleBtn.onmouseenter = function () {
            that.dom.contactUs.classList.add('contactUs_2');
        };
        this.dom.middleBtn.onmouseleave = function () {
            that.dom.contactUs.classList.remove('contactUs_2');
        };

    }
    MyApplication.RightFixed.prototype.init = function(){
        //右侧导航栏对象-注册了-toTop按钮滑入滑出事件
        this.RightBottomShow();
// //右侧导航栏对象-注册了-中间按钮出现消失box事件
        this.enterMiddle();

    }}
/*右侧固定栏模块结束了*/

/*中间导航模块*/
{
    //继承祖宗的dom接口和方法 ；
    MyApplication.inherit(MyApplication.MiddleNav, MyApplication.Mydocument);
    //定义导航栏点击事件
    MyApplication.MiddleNav.prototype.clickMiddleNav = function () {
        //this指向实例对象nav
        let that = this;
        // let div = document.createElement('div');
        // div.className = 'append';
        //移动滚轮发生的关于MiddleNav的事件
        if(that.dom.html.scrollTop > 502){
            // that.dom.body.insertBefore(div,that.dom.middleBanner);
            that.dom.middleBar.classList.add('middleNavFix');
        }
        else {
            // div.remove();
            that.dom.middleBar.classList.remove('middleNavFix');
        }
        window.addEventListener('scroll',function () {
            if(that.dom.html.scrollTop > 502){
                // that.dom.body.insertBefore(div,that.dom.middleBanner);
                that.dom.middleBar.classList.add('middleNavFix');
            }
            else {
                // div.remove();
                that.dom.middleBar.classList.remove('middleNavFix');
            }
        },false);
        //点击对于的标题就溜过去
        this.dom.spanList[0].onclick = function () {
            let nowLocationY = window.pageYOffset;
            that.methodPublic.rollAnimation(that.dom.insteadBox,nowLocationY,4,1);
        };
        this.dom.spanList[1].onclick = function () {
            let nowLocationY = window.pageYOffset;
            that.methodPublic.rollAnimation(that.dom.sixBetter,nowLocationY,4,1);
        };
        this.dom.spanList[2].onclick = function () {
            let nowLocationY = window.pageYOffset;
            that.methodPublic.rollAnimation(that.dom.quanwei,nowLocationY,4,1);
        };
        this.dom.spanList[3].onclick = function () {
            let nowLocationY = window.pageYOffset;
            that.methodPublic.rollAnimation(that.dom.interWay,nowLocationY,4,1);
        };
        //小黄条跟着跑
        if(window.pageYOffset >= (that.dom.middleBanner.offsetTop - 56) && window.pageYOffset < that.dom.sixBetter.offsetTop - 4){
            that.methodPublic.iAnimation(that.dom.yellowLine,that.dom.yellowLine.left,41,10,10);
        }
        else if(window.pageYOffset > (that.dom.sixBetter.offsetTop - 3 ) && window.pageYOffset < that.dom.quanwei.offsetTop){
            console.log(2);
            that.methodPublic.iAnimation(that.dom.yellowLine,that.dom.yellowLine.left,190,10,10);
        }
        else if(window.pageYOffset >= that.dom.quanwei.offsetTop && window.pageYOffset < that.dom.interWay.offsetTop){
            that.methodPublic.iAnimation(that.dom.yellowLine,that.dom.yellowLine.left,340,10,10);
        }
        else if(window.pageYOffset >= that.dom.interWay.offsetTop && window.pageYOffset < that.dom.interWay.offsetTop + 680){
            that.methodPublic.iAnimation(that.dom.yellowLine,that.dom.yellowLine.left,490,10,10);
        };
        window.addEventListener("scroll", function () {
            if(window.pageYOffset >= (that.dom.middleBanner.offsetTop - 56) && window.pageYOffset < that.dom.sixBetter.offsetTop - 4){
                that.methodPublic.iAnimation(that.dom.yellowLine,that.dom.yellowLine.left,41,10,10);
            }
            else if(window.pageYOffset > (that.dom.sixBetter.offsetTop - 3 ) && window.pageYOffset < that.dom.quanwei.offsetTop){
                console.log(2);
                that.methodPublic.iAnimation(that.dom.yellowLine,that.dom.yellowLine.left,190,10,10);
            }
            else if(window.pageYOffset >= that.dom.quanwei.offsetTop && window.pageYOffset < that.dom.interWay.offsetTop){
                that.methodPublic.iAnimation(that.dom.yellowLine,that.dom.yellowLine.left,340,10,10);
            }
            else if(window.pageYOffset >= that.dom.interWay.offsetTop && window.pageYOffset < that.dom.interWay.offsetTop + 680){
                that.methodPublic.iAnimation(that.dom.yellowLine,that.dom.yellowLine.left,490,10,10);
            }
        },false)
    };
    MyApplication.MiddleNav.prototype.init = function(){
        //中间导航对象-注册了-一堆事件
        this.clickMiddleNav();
    }}
/*中间导航模块终于结束了 */

/*底部banner模块*/
{
    //继承祖宗的dom接口和方法 ；
    MyApplication.inherit(MyApplication.BottomBanner, MyApplication.Mydocument);
    //echart导入
    MyApplication.BottomBanner.prototype.auto = function () {
        var myChart = echarts.init(this.dom.main);
        var app = {};
        option = null;

        var data = [{
            fixed: true,
            x: myChart.getWidth() / 2,
            y: myChart.getHeight() / 2,
            symbolSize: 20,
            id: '-1'
        }];

        var edges = [];

        option = {
            series: [{
                type: 'graph',
                layout: 'force',
                animation: false,
                data: data,
                force: {
                    // initLayout: 'circular'
                    // gravity: 0
                    repulsion: 100,
                    edgeLength: 5
                },
                edges: edges
            }]
        };

        setInterval(function () {
            data.push({
                id: data.length
            });
            var source = Math.round((data.length - 1) * Math.random());
            var target = Math.round((data.length - 1) * Math.random());
            if (source !== target) {
                edges.push({
                    source: source,
                    target: target
                });
            }
            myChart.setOption({
                series: [{
                    roam: true,
                    data: data,
                    edges: edges
                }]
            });

            // console.log('nodes: ' + data.length);
            // console.log('links: ' + data.length);
        }, 1000);
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    };
    MyApplication.BottomBanner.prototype.init = function () {
        //底部banner注册自动导入事件
        this.auto();
    }
}
/*底部banner模块结束*/


//nav实例化
MyApplication.nav = new MyApplication.Nav();
//右侧固定导航栏实例化
MyApplication.rightFixed = new MyApplication.RightFixed();
//中间导航栏实例化
MyApplication.middleNav = new MyApplication.MiddleNav();
//底部banner实例化
MyApplication.bottomBanner = new MyApplication.BottomBanner();

