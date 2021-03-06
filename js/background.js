var omnibox = chrome.omnibox;
omnibox.setDefaultSuggestion({
    description: "Define in Youdao Translate"
});
omnibox.onInputChanged.addListener(function (text, suggest) {
    suggest([{
        content: "http://www.baidu.com/s?wd=" + text,
        description: "Search " + '"' + text + '"' + " in Baidu"
    }, {
        content: "https://www.google.com.hk/?gws_rd=ssl#newwindow=1&q=" + text,
        description: "Search " + '"' + text + '"' + " in Google"
    }])
});
omnibox.onInputEntered.addListener(function (text) {
    if ( text.length < 26 ) {
        var tranUrl = "http://translate.google.cn/#en/zh-CN/" + text;
        window.open(tranUrl)
    } else {
        window.open(text)
    }
});