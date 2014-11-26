function DOMPop(event){
	if(document.getElementById("translateDiv")){
		document.body.removeChild(document.getElementById("translateDiv"));
	}
	var selection=document.getSelection();
	var selectedText=selection.toString();
	if(selectedText.length > 0){
		var scrollX=document.body.scrollLeft;
		var scrollY=document.body.scrollTop;
		var leftPos=event.clientX+scrollX;
		var topPos=event.clientY+scrollY;
		var translatedText;
		var translating="正在翻译中";
		appendTranslatedDiv(translating,leftPos,topPos);
		var currentProtocol=location.protocol;
		var url = currentProtocol+"//translate.google.cn/translate_a/single?client=t&sl=en&tl=zh-CN&hl=zh-CN&dt=bd&dt=ex&dt=ld&dt=md&dt=qc&dt=rw&dt=rm&dt=ss&dt=t&dt=at&dt=sw&ie=UTF-8&oe=UTF-8&prev=conf&psl=en&ptl=en&it=sel.63&ssel=0&tsel=0&q=" + selectedText;
		translateSend(url, function(res) {
			var firstIndex = res.indexOf('"');
			var secIndex = res.indexOf('"', firstIndex + 1);
			translatedText = res.slice(firstIndex + 1, secIndex);
		});
		appendTranslatedDiv(translatedText,leftPos,topPos);
	}else{
		selection=null;
		selectedText=null;
		return event.preventDefault();
	}
}
function appendTranslatedDiv(translatedText,leftPos,topPos){
	if(document.getElementById("translateDiv")){
		document.body.removeChild(document.getElementById("translateDiv"));
	}
	var translatedHTML='<p>'+translatedText+'</p>';
	var translateDiv=document.createElement("div");
	translateDiv.id="translateDiv";
	translateDiv.style.src="../css/content.css";
	translateDiv.style.left=leftPos+"px";
	translateDiv.style.top=topPos+"px";
	translateDiv.innerHTML=translatedHTML;
	document.body.appendChild(translateDiv);
}
function translateSend(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("get", url, false);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			callback(xhr.responseText)
		}
	};
	xhr.send();
}
document.addEventListener('mouseup',DOMPop,false);

