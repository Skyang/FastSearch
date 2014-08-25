function translateSend(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("get", url, false);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			callback(xhr.responseText)
		}
	};
	xhr.send()
}
document.getElementById("tranBefore").focus();
document.addEventListener("click",
	function(event) {
		var target = event.target;
		var tranBeforeText = document.getElementById("tranBefore").value;
		switch (target.id) {
			case "baiduSearch":
				if (tranBeforeText.length == 0) {
					document.getElementById("tranAfter").innerText = "输入不能为空"
				} else {
					var baiduUrl = "http://www.baidu.com/s?wd=" + tranBeforeText;
					window.open(baiduUrl)
				}
				break;
			case "googleSearch":
				if (tranBeforeText.length == 0) {
					document.getElementById("tranAfter").innerText = "输入不能为空"
				} else {
					var googleUrl = "https://www.google.com.hk/?gws_rd=ssl#newwindow=1&q=" + tranBeforeText + "&safe=strict";
					window.open(googleUrl)
				}
				break;
			case "define-btn":
				document.getElementById("tranAfter").innerText = "正在翻译中....";
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
					translateSend(url,
						function(res) {
							var firstIndex = res.indexOf('"');
							var secIndex = res.indexOf('"', firstIndex + 1);
							var resSliced = res.slice(firstIndex + 1, secIndex);
							setTimeout(function() {
									document.getElementById("tranAfter").innerText = resSliced;
									tmp.innerText = "Define"
								},
								500)
						})
				}
				break
		}
	},
	false);
document.addEventListener("mouseover",
	function(event) {
		var target = event.target;
		switch (target.id) {
			case "define-btn":
				document.getElementById("define-btn").style.backgroundColor = "#159C49";
				break;
			case "baiduSearch":
				document.getElementById("baiduSearch").style.backgroundColor = "#189FD5";
				break;
			case "googleSearch":
				document.getElementById("googleSearch").style.backgroundColor = "#114CA4";
				break
		}
	},
	false);
document.addEventListener("mouseout",
	function(event) {
		var target = event.target;
		switch (target.id) {
			case "define-btn":
				document.getElementById("define-btn").style.backgroundColor = "";
				break;
			case "baiduSearch":
				document.getElementById("baiduSearch").style.backgroundColor = "";
				break;
			case "googleSearch":
				document.getElementById("googleSearch").style.backgroundColor = "";
				break
		}
	},
	false);
document.addEventListener("keyup",
	function(event) {
		if (event.keyCode == 13) {
			document.getElementById("define-btn").click()
		}
	},
	false);