
    var save=""; 
	var tim=1;  
	setInterval("tim++",10);  
	var b=1;  
	var autourl=new Array();  
	autourl[1]="//1038661.com";autourl[2]="//1038662.com";autourl[3]="//1038663.com";autourl[4]="//1038663.com";autourl[5]="//1038665.com";autourl[6]="//1038665.com";autourl[7]="//1038669.com";
    function auto(url,b){
		$("#sudu"+b).html(tim+"ms");
	}  
	function run(){  
		for(var i=1;i<autourl.length;i++){  
			document.write("<img name=\"suduname\" src=\""+autourl[i]+"/"+"\" width=\"1\" height=\"1\" onerror=\"auto('"+autourl[i]+"',"+i+")\" style=\"display:none\" />");  
		} 
	}  
	run();  
	document.write(save); 

