
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
function setCookie(name,value)
{
	//console.log(name+","+value);
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
}
var fuser = getCookie("fmuser");
console.log(fuser);
if(fuser !=null && fuser !='')
{
	document.getElementById("fzxyzb_tanchuang").style.display="none";
}
setCookie("fmuser","123456",'d30');