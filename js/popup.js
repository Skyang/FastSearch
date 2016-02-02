var getConfig = function () {
    var apiInfo = [{
        apiKey: "802967876",
        keyfrom: "FastSearch"
    }, {
        apiKey: "877799571",
        keyfrom: "FastSearch1"
    }];
    return (Math.random() > 0.5) ? apiInfo[0] : apiInfo[1];
};
var config = getConfig();
var url;
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
$("#tranBefore").focus();
var processMsg = function (msg) {
    var explains = msg.basic ? msg.basic.explains : msg.translation;
    var phonetic = msg.basic ? msg.basic.phonetic : null;
    var length = explains.length;
    var result;
    //增加音标
    if ( phonetic ) {
        result = "\/" + phonetic + "\/" + "<br/>";
    }
    for (var i = 0; i < length; i++) {
        (function (index) {
            if ( result ) {
                result += explains[index] + "<br/>";
            } else {
                result = explains[index] + "<br/>";
            }
        })(i);
    }
    return result;
};
document.addEventListener("click", function (event) {
    var target = event.target;
    var tranBeforeText = document.getElementById("tranBefore").value;
    if ( tranBeforeText.length == 0 ) {
        document.getElementById("tranAfter").innerText = "输入不能为空";
        return false;
    }
    switch ( target.id ) {
        case "baiduSearch":
            var baiduUrl = "http://www.baidu.com/s?wd=" + tranBeforeText;
            window.open(baiduUrl);
            break;
        case "googleSearch":
            var googleUrl = "https://www.google.com.hk/?gws_rd=ssl#newwindow=1&q=" + tranBeforeText + "&safe=strict";
            window.open(googleUrl);
            break;
        case "define-btn":
            document.getElementById("tranAfter").innerText = "正在翻译中....";
            var defineBtn = document.getElementById("define-btn");
            defineBtn.innerText = "翻译中...";
            var tranLink = document.getElementById("tranLink");
            tranLink.innerText = "转到谷歌翻译>>";
            tranLink.href = "http://translate.google.cn/#en/zh-CN/" + tranBeforeText;
            //var url = "http://translate.google.cn/translate_a/single?client=t&sl=en&tl=zh-CN&hl=zh-CN&dt=bd&dt=ex&dt=ld&dt=md&dt=qc&dt=rw&dt=rm&dt=ss&dt=t&dt=at&dt=sw&ie=UTF-8&oe=UTF-8&prev=conf&psl=en&ptl=en&it=sel.63&ssel=0&tsel=0&q=" + tranBeforeText;
            url = "http://fanyi.youdao.com/openapi.do?keyfrom=" + config.keyfrom + "&key=" + config.apiKey + "&type=data&doctype=json&version=1.1&q=" + tranBeforeText;
            translateRequest({
                url: url,
                success: function (msg) {
                    defineBtn.innerText = "翻译";
                    document.getElementById("tranAfter").innerHTML = processMsg(msg);
                },
                fail: function (msg) {
                    console.log("Fail");
                }
            });
            break;
    }
}, false);
var setBackGroundColor = function (id, color) {
    document.getElementById(id).style.backgroundColor = color;
};
document.addEventListener("mouseover", function (event) {
    var target = event.target;
    switch ( target.id ) {
        case "define-btn":
            setBackGroundColor("define-btn", "#159C49");
            break;
        case "baiduSearch":
            setBackGroundColor("baiduSearch", "#189FD5");
            break;
        case "googleSearch":
            setBackGroundColor("googleSearch", "#114CA4");
            break;
    }
}, false);

document.addEventListener("mouseout", function (event) {
    var target = event.target;
    switch ( target.id ) {
        case "define-btn":
            setBackGroundColor("define-btn", "");
            break;
        case "baiduSearch":
            setBackGroundColor("baiduSearch", "");
            break;
        case "googleSearch":
            setBackGroundColor("googleSearch", "");
            break;
    }
}, false);

document.addEventListener("keyup", function (event) {
    if ( event.keyCode == 13 ) {
        document.getElementById("define-btn").click()
    }
}, false);