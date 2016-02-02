function getConfig() {
    var apiInfo = [{
        apiKey: "802967876",
        keyfrom: "FastSearch"
    }, {
        apiKey: "877799571",
        keyfrom: "FastSearch1"
    }];
    return (Math.random() > 0.5) ? apiInfo[0] : apiInfo[1];
}
function DOMPop(event) {
    var selection, selectedText;
    selection = document.getSelection();
    selectedText = selection.toString();
    if ( document.getElementById("translateDiv") ) {
        document.body.removeChild(document.getElementById("translateDiv"));
        selectedText = "";
    }
    if ( selectedText.length > 0 ) {
        var scrollX = document.body.scrollLeft;
        var scrollY = document.body.scrollTop;
        var leftPos = event.clientX + scrollX;
        var topPos = event.clientY + scrollY;
        //var translatedText;
        var apiInfo = getConfig();
        var url = location.protocol + "//fanyi.youdao.com/openapi.do?keyfrom=" + apiInfo.keyfrom + "&key=" + apiInfo.apiKey + "&type=data&doctype=json&version=1.1&q=" + selectedText;
        translateRequest({
            url: url,
            success: function (msg) {
                if ( msg.errorCode == 0 ) {
                    var translatedText = processMsg(msg);
                    appendTranslatedDiv(translatedText, leftPos, topPos);
                }
            },
            fail: function (msg) {
                var translating = "网络错误.若反复出现此消息，可发送邮件给我反馈：(hhyuestc@gmail.com).错误信息为:" +
                (typeof(msg) == "object") ? JSON.stringify(msg) : msg;
                appendTranslatedDiv(translating, leftPos, topPos);
            }
        });
    } else {
        selection = null;
        selectedText = null;
    }
}
function processMsg(msg) {
    var explains = msg.basic ? msg.basic.explains : msg.translation;
    var phonetic = msg.basic ? msg.basic.phonetic : null;
    var length = explains.length;
    var result;
    //增加音标
    if ( phonetic ) {
        result = "<p>" + "\/" + phonetic + "\/" + "</p>";
    }
    for (var i = 0; i < length; i++) {
        (function (index) {
            if ( result ) {
                result += "<p>" + explains[index] + "</p>";
            } else {
                result = "<p>" + explains[index] + "</p>";
            }
        })(i);
    }
    return result;
}
function appendTranslatedDiv(translatedText, leftPos, topPos) {
    var translatedHTML = "<div id='translateTriangle'></div>" + "<div>" + translatedText + "</div>";
    var translateDiv = document.createElement("div");
    translateDiv.id = "translateDiv";
    translateDiv.style.src = "../css/content.css";
    translateDiv.style.left = leftPos + "px";
    var currentTop = parseInt(topPos + 17);
    translateDiv.style.top = currentTop + "px";
    translateDiv.innerHTML = translatedHTML;
    document.body.appendChild(translateDiv);
}
function translateRequest(options) {
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