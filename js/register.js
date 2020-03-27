window.onload = checkFrom;


function checkFrom(){
    var ousername  = document.getElementById("user_name");
    var opwd  = document.getElementById("pwd");
    var ocpwd  = document.getElementById("cpwd");
    var otel  = document.getElementById("tel");
    var oallow  = document.getElementById("allow");
    var label  = document.getElementsByClassName("label")[0];
    console.log(label);
    
    var otips = document.getElementsByClassName("error_tip"); //找出所有的错误提示
    //记录是否正确的变量
    var fusername = false;
    var fpwd = false;
    var fcpwd= false;
    var ftel = false;
    var fallow = false;
 
    ousername.onblur = checkUsername;//onblur事件:当用户离开input输入框时执行一段Javascript代码：
    opwd.onblur = checkPwd;
    ocpwd.onblur = checkCpwd;
    otel.onblur = checkTel;
    oallow.onclick = checkAllow;


    let uName = document.querySelector('#user_name');
    let uPwd = document.querySelector('#pwd');
    let ruPwd = document.querySelector('#cpwd');
    let uTel = document.querySelector('#tel');
    let sexs = document.querySelectorAll('input[type=radio]');
    let btn = document.querySelector('input[type=button]');
    btn.onclick = function () {
        checkUsername();
        checkPwd();
        checkCpwd();
        checkTel();
        checkAllow();
        if(fusername && fpwd && fcpwd && ftel && fallow){
            let username = uName.value.trim();
            let pwd = uPwd.value.trim();
            let sex = getSex();
            let tel = uTel.value.trim();
            let obj = {
                'username':username,
                'pwd':pwd,
                'sex':sex,
                'tel':tel,
            }
            obj = JSON.stringify(obj);
            let url = 'http://localhost:3000/register';
            fetch(url,{
                method:'POST',
                body:obj,
                headers:{ 'Content-Type':"application/x-www-form-urlencoded"}
            }).then(data=>data.json()).then(res=>{
                console.log(res);
                    btn.value = res.msg;
                    document.querySelector('.login').style.display = 'block';
            });
        }else{
            alert('注册信息有误，请重新注册！')
        }
}
    
    

  //获取性别  
    function getSex() {
        for (let i = 0; i < sexs.length; i++) {
            var sex;
            if (sexs[i].checked) {
                sex = sexs[i].value;
            }
        }
        return sex;
    }


//校验用户名
    function checkUsername (){
        if(ousername.value === ""){//未输入内容
            //提示信息错误
            otips[0].innerHTML = "用户名不能为空";
            otips[0].style.display = "block";
            fusername = false;
        }else if(!isUser(ousername.value)){ //说明内容不正确
            otips[0].innerHTML = "输入内容格式有误";
            otips[0].style.display = "block";
            fusername = false;
        }else{
            otips[0].innerHTML = "";
            otips[0].style.display = "none";
            fusername=true;
        }
    }

//密码校验
    function checkPwd(){
        if(opwd.value === ""){//未输入内容
            //提示信息错误
            otips[1].innerHTML = "密码不能为空";
            otips[1].style.display = "block";
            fpwd = false;
        }else if((opwd.value).length < 6){ //说明长度不够           
            otips[1].innerHTML = "输入长度不够";
            otips[1].style.display = "block";
            fpwd = false;
        }else{
            otips[1].innerHTML = "";
            otips[1].style.display = "none";
            fpwd = true;
        }
    }
//确认密码 
    function checkCpwd(){
            if(opwd.value !== ocpwd.value){  //说明两次密码不一致
                otips[2].innerHTML = "两次密码不一致";
                otips[2].style.display = "block";
                fcpwd= false;
            }else{
                otips[2].innerHTML = "";
                otips[2].style.display = "none";
                fcpwd =true;
            }
    }

//电话校验
    function checkTel(){
            if(otel.value === ""){//未输入内容
                //提示信息错误
                otips[3].innerHTML = "手机号不能为空";
                otips[3].style.display = "block";
                ftel = false;
            }else if(!isTel(otel.value)){ //说明内容不正确
                otips[3].innerHTML = "格式错误，请填写正确信息";
                otips[3].style.display = "block";
                ftel = false;
            }else{
                otips[3].innerHTML = "";
                otips[3].style.display = "none";
                ftel = true;
            }
    }

//是否同意处理
    function checkAllow(){
        if(oallow.checked){
            fallow = true;
            label.style.color = '#757575';
        }else{
            label.style.color = 'red';
            fallow = false;
          
        }
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
//手机号  （邮箱js）格式判断
function isTel(e){

        // return e.indexOf(".") !== -1  && e.indexOf("@") !== -1
        var re = /^1[3456789]\d{9}$/;
        return  e.match(re);
        // (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)

}
//用户名
function isUser(username) {
    let re = /^[a-zA-Z]{1}[a-zA-Z0-9]{2,15}$/;
    return re.test(username);
}