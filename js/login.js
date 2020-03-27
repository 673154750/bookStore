window.onload = checkFrom;


function checkFrom(){
    var oname_input  = document.getElementById("name_input");
    var opass_input  = document.getElementById("pass_input");
    var otips = document.getElementsByClassName("user_error"); //找出所有的错误提示
    var otip2 = document.getElementsByClassName("pwd_error"); //找出所有的错误提示
    // var submit = document.getElementById("sub");
    //记录是否正确的变量
    var fname_input = false;
    var fpass_input = false;

    oname_input.onblur = checkName;//onblur事件:当用户离开input输入框时执行一段Javascript代码：
    opass_input.onblur = checkPass;
    let uName = document.querySelector('#name_input');
    let uPwd = document.querySelector('#pass_input');
    let button = document.querySelector('.input_submit');
    let tip = document.querySelector('#error');
    console.log(tip);

    button.onclick = function () {
        checkName();
        checkPass();
        if(fname_input && fpass_input){
        let username = uName.value.trim();
        let pwd = uPwd.value.trim();
        let user = {
            'username': `${username}`,
            'pwd': `${pwd}`
        };
        user = JSON.stringify(user);
        let url = 'http://localhost:3000/login';
        fetch(url, {
            method: 'POST',
            body: user,
            headers: { 'Content-Type': "application/x-www-form-urlencoded" }
        }).then(data => data.json()).then(res => {
            let obj1 = res.obj;
            let user = JSON.stringify(res.user) ;
            if (obj1.code == 201) {
                sessionStorage.setItem('user',`${user}`);
                window.location.href = 'bookList.html';
            } else {
                tip.innerHTML = obj1.msg;
                tip.style.display = 'block';
            }
        });
    }else{
        alert('完善信息');
    }
}


        

            


//校验用户名
    function checkName (){
        if(oname_input.value === ""){//未输入内容
            //提示信息错误
            otips[0].innerHTML = "用户名不能为空";
            otips[0].style.display = "block";
        }else if(!isUser(oname_input.value)){ //说明内容不正确
            otips[0].innerHTML = "格式有误，请重新输入！";
            otips[0].style.display = "block";
        }else{
            otips[0].innerHTML = "";
            otips[0].style.display = "none";
            fname_input=true;
        }
    }

//密码校验
    function checkPass(){
        if(opass_input.value === ""){//未输入内容
            //提示信息错误
            otip2[0].innerHTML = "密码不能为空";
            otip2[0].style.display = "block";
        }else if((opass_input.value).length < 6){ //说明长度不够           
            otip2[0].innerHTML = "输入长度不够";
            otip2[0].style.display = "block";
        }else{
            otip2[0].innerHTML = "";
            otip2[0].style.display = "none";
            fpass_input = true;
        }
    }

//工具函数
//用户名字母数字判断
    function isValid(s){
            for(var i = 0;i<s.length;i++){
                var c = s.charAt(i);
                if(c >= 'A' && c <= 'Z' || c >='a' && c<='z' ||c>='0' && c<='9'){
                    continue;
                }else{
                    return false;
                }
            }
            return true;
    }

    function isUser(username) {
        let re = /^[a-zA-Z]{1}[a-zA-Z0-9]{2,15}$/;
        return re.test(username);
    }
    function setCookie(cookieName, cookieValue, expiresMinute){
        //检测过期时间参数有没有传递
        var s = '';
        if(expiresMinute !== undefined){
            var mydate = new Date();
            mydate.setMinutes(mydate.getMinutes() + expiresMinute);
            s = ";expires="+mydate.toGMTString();
        }
        document.cookie = cookieName + "=" +cookieValue + s;
    }
    
}