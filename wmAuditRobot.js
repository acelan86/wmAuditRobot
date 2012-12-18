var wmAuditRobot = (function (w, d) {
    function openUrl(urls) {
        if (urls[0]) {
            window.open(urls[0]);
            urls.shift();
            setTimeout(function (){
                openUrl(urls);
            }, delay * 1000);
        }
    }

    function init () {
        var div = d.createElement('div');
        div.innerHTML = "此页面已启用网盟审核小助手，请使用右上角的网盟小助手图标打开所有链接";
        div.style.cssText = "width:100%;opacity:.7;z-index:99999;background-color:#000;color:#fff;padding:6px 10px; position:fixed;left:0px;top:0px;font-size:12px";
        d.body.appendChild(div);
    }
    init();
    return {
        open : function (delay) {
            alert(delay);
            var as = document.querySelectorAll('td.username div'),
                len = as.length,
                urls = [];
            while(len--) {
                urls.push(as[len].parentNode.parentNode.childNodes[3].childNodes[0].href);
            }
            openUrl(urls, delay);
        }
    };
})(window, document);