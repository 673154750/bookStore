
//设置cookie
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


//获取cookie
function getCookie(cookieName){
    var arr = document.cookie.split('; ');//拆分成数组  例如['uname=aaa', "pwd=123", 'tt=123']
    for(var i = 0;i < arguments.length; i++){
        var brr = arr[i].split('=');// ['uname', 'aaa']
        if(brr[0] === cookieName){
            return brr[1];
        }
    }
    return null
}