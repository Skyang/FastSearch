console.log("Load Success!");
function DOMPop(){
	var selection=document.getSelection();
	var text=selection.toString();
	console.log(selection);
	console.log(selection.getRangeAt(0));
	/*if(text.length > 0){
		var selectionRange=selection.getRangeAt(0);
		console.log("Select Success");
		var translateDiv=document.createElement("div");
	}*/
}
document.addEventListener('mouseup',DOMPop,false);

/*function translateSend(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("get", url, false);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			callback(xhr.responseText)
		}
	};
	xhr.send()
}
if (tranBeforeText.length == 0) {
				document.getElementById("tranAfter").innerText = "输入不能为空"
			} else {
				document.getElementById("tranAfter").innerText = "正在翻译中....";
				var tmp = document.getElementById("define-btn");
				tmp.innerText = "Defining";
				var tranLink = document.getElementById("tranLink");
				tranLink.innerText = "转到谷歌翻译>>";
				tranLink.href = "http://translate.google.cn/#en/zh-CN/" + tranBeforeText;
				var url = "http://translate.google.cn/translate_a/single?client=t&sl=en&tl=zh-CN&hl=zh-CN&dt=bd&dt=ex&dt=ld&dt=md&dt=qc&dt=rw&dt=rm&dt=ss&dt=t&dt=at&dt=sw&ie=UTF-8&oe=UTF-8&prev=conf&psl=en&ptl=en&it=sel.63&ssel=0&tsel=0&q=" + tranBeforeText;
				translateSend(url, function(res) {
					var firstIndex = res.indexOf('"');
					var secIndex = res.indexOf('"', firstIndex + 1);
					var resSliced = res.slice(firstIndex + 1, secIndex);
					setTimeout(function() {
						document.getElementById("tranAfter").innerText = resSliced;
						tmp.innerText = "Define"
					}, 500)
				})
			}*/