/**
 * Created by Administrator on 2017/9/20.
 */
(function(w){
    function Pwd(config){
        this.arr = [];
        this.num = 0;
        var password = function(){
            return arr
        };
        this.getPassword = function(){
            return password()
        };
        this.config = config;
        this.container = document.getElementById(this.config.container);
        this.main = document.getElementById(this.config.main);
        this.render();
        this.count();
    }
    Pwd.prototype = {
        constructor:Pwd,
        render:function(){
            //将配置参数缓存到局部作用域
            var panel_width = this.config.width,
                panel_height = this.config.height,
                panel_background = this.config.background,
                pwd_item = '';
            //对面板进行基本配置
            Pwd.tool.attr(this.container,"width",panel_width);
            Pwd.tool.attr(this.container,"height",panel_height);
            Pwd.tool.attr(this.container,"background",panel_background);
            //生成密码显示框
            var panel_show_pwd_box = document.createElement("div");
            panel_show_pwd_box.className = "pwd-item-box";
            for(var i = 0 ; i < this.config.pwd_len ; i++){
                pwd_item +="<span class='pwd-item'></span>";
            }
            panel_show_pwd_box.innerHTML = pwd_item;
            this.container.appendChild(panel_show_pwd_box);
            var pwd_keyborad = document.createElement("ul");
            pwd_keyborad.className = "pwd-keyborad";
            var pwd_keyborad_item = "";
            for(var j = 0 ; j < 12 ; j++){
                if(j==9){
                    pwd_keyborad_item += "<span class='pwd-keyborad-item pwd-side-bottom'>"+"."+"</span>"
                }else if(j==10){
                    pwd_keyborad_item += "<li class='pwd-keyborad-item'>"+"0"+"</li>"
                }else if(j==11){
                    pwd_keyborad_item += "<span class='pwd-keyborad-item pwd-side-bottom'>"+"<span class='pwd-del-icon'>×</span>"+"</span>"
                }else{
                    pwd_keyborad_item += "<li class='pwd-keyborad-item'>"+(j+1)+"</li>"
                }
            }
            pwd_keyborad.innerHTML = pwd_keyborad_item;
            this.container.appendChild(pwd_keyborad);
        },
        count:function(){
            var that = this;
            Pwd.tool.addHandle(that.container,"touchstart",function(e){
                e = e || event ;
                var active = e.target;
                if(active.nodeName==="LI"){
                    active.className="pwd-keyborad-item pwd-keyborad-active"
                }else if(active.nodeName==="SPAN"&&that.arr.length>0){
                    that.container.getElementsByClassName("pwd-item")[--that.num].innerHTML="";
                    that.arr.pop();
                }

            });
            Pwd.tool.addHandle(that.container,"touchstart",function(e){
                var tmp_num;
                e = e || event ;
                var active = e.target;
                if(active.nodeName==="LI"&&that.arr.length<6){
                    active.className="pwd-keyborad-item";
                    tmp_num =active.innerHTML;
                    that.arr.push(tmp_num);
                    that.container.getElementsByClassName("pwd-item")[that.num++].innerHTML="·";
                    if(that.num==6){
                        that.container.innerHTML = "";
                        content.style="";
                        that.main.innerHTML = "<img src='./timg.gif'/>";
                    }
                }

            })
        },
    };
    Pwd.tool={
        attr:function(dom,attrName,attrVal){
            var arg_len = arguments.length;
            if(dom instanceof Object){
                if(arg_len==2&&attrName instanceof String){
                    return dom.style[attrName];
                }else if(arg_len == 3){
                    dom.style[attrName]=attrVal;
                    return true;
                }else {
                    throw new Error("参数至少为2个!")
                }
            }
        },
        addHandle:function(obj,eventType,fn){
            obj.addEventListener(eventType,fn)
        }
    };

        Pwd.init = function(config){
        new this(config)
    };
    w["Pwd"]=Pwd;
})(window);