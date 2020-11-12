
    var save=""; 
	var tim=1;  
	setInterval("tim++",10);  
	var b=1;  
	var autourl=new Array();  
	autourl[1]="//817b.cc";autourl[2]="//817c.cc";autourl[3]="//817d.cc";autourl[4]="//817e.cc";autourl[5]="//817f.cc";autourl[6]="//817g.cc";autourl[7]="//817h.cc";
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

