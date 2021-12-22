var fs = require('fs')
var path=require('path');

var filenames = [path.resolve(__dirname+'/index.html')];
// __dirname+'/cloud.html' 为具体的html文件，如果有多个文件，则添加到数组
var _t=+new Date();
console.log(filenames);
filenames.forEach(function(item, index) {
	fs.readFile(item,'utf8',function(err,files){
		var result = files.replace(/href=["'].*\.css.*?["']/g, txt => {
            console.log(files);
			// 去掉最后一个字符串
			var str = txt.substr(0, txt.length-1);
			var txts = str.split('?');
			return `${txts[0]}?_t=${_t}"`
		});
		result = result.replace(/src=["'].*\.js.*?["']/g, txt => {
			// 去掉最后一个字符串
			var str = txt.substr(0, txt.length-1);
			var txts = str.split('?');
			return `${txts[0]}?_t=${_t}"`
		});

		fs.writeFile(item, result, 'utf8', function (err) {
					if (err) return console.log(err);
		});
	})
});


