var profileManager = (function () {
    var key = "wmAuditRobot",
        profile = {
            delay : 1
            //pageSize : 20
        };

    return {
        getProfile : function () {
            return {
                //pageSize : parseInt(window.localStorage[key + 'pageSize'], 10) || profile.pageSize,
                delay : parseInt(window.localStorage[key + 'delay'], 10) || profile.delay
            };
        },
        setProfile : function (delay) {
            window.localStorage[key + 'delay'] = parseInt(delay, 10);
            //window.localStorage[key + 'pageSize'] = parseInt(pageSize, 10);
        }
    };
})();


chrome.browserAction.onClicked.addListener(function(tab) {
    var profile = profileManager.getProfile();
    if (tab.url.indexOf("http://beidou.baidu.com/auditmanager") === 0) {
    //if (tab.url.indexOf("http://") == 0){
        chrome.tabs.executeScript(null, {code:"window.wmAuditRobot.open(" + profile.delay + ");"});
    }
});