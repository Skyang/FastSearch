function DOMPop(event) {
    if ( document.getElementById("translateDiv") ) {
        document.body.removeChild(document.getElementById("translateDiv"));
    }
    var selection = document.getSelection();
    var selectedText = selection.toString();
    if ( selectedText.length > 0 ) {
        var scrollX = document.body.scrollLeft;
        var scrollY = document.body.scrollTop;
        var leftPos = event.clientX + scrollX;
        var topPos = event.clientY + scrollY;
        //var translatedText;
        var apiKey = "802967876";
        var keyfrom = "FastSearch";
        var url = location.protocol + "//fanyi.youdao.com/openapi.do?keyfrom=" + keyfrom + "&key=" + apiKey + "&type=data&doctype=json&version=1.1&q=" + selectedText;
        translateRequest({
            url: url,
            success: function (msg) {
                var explains = msg.basic.explains;
                var length = explains.length;
                var result;
                for (var i = 0; i < length; i++) {
                    (function (index) {
                        if ( result ) {
                            result += "<p>" + explains[index] + "</p>";
                        } else {
                            result = "<p>" + explains[index] + "</p>";
                        }
                    })(i);
                }
                translatedText = result;
                appendTranslatedDiv(translatedText, leftPos, topPos);
            },
            fail: function (msg) {
                var translating = "网络错误.若反复出现此消息，可发送邮件给我反馈：(hhyuestc@gmail.com).错误信息为:" + msg;
                appendTranslatedDiv(translating, leftPos, topPos);
            }
        });
    } else {
        selection = null;
        selectedText = null;
        return event.preventDefault();
    }
}
function appendTranslatedDiv(translatedText, leftPos, topPos) {
    if ( document.getElementById("translateDiv") ) {
        document.body.removeChild(document.getElementById("translateDiv"));
    }
    var translatedHTML = "<div id='translateTriangle'></div>" + "<span>" + translatedText + "</span>";
    var translateDiv = document.createElement("div");
    translateDiv.id = "translateDiv";
    translateDiv.style.src = "../css/content.css";
    translateDiv.style.left = leftPos + "px";
    var currentTop = parseInt(topPos + 17);
    translateDiv.style.top = currentTop + "px";
    translateDiv.innerHTML = translatedHTML;
    document.body.appendChild(translateDiv);
}
var translateRequest = function (options) {
    $.ajax({
        method: "GET",
        url: options.url,
        success: function (msg) {
            options.success(msg);
        },
        error: function (msg) {
            options.fail(msg);
        }
    })
};
document.addEventListener('mouseup', DOMPop, false);