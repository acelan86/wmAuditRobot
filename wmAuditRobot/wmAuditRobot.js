var wmAuditRobot = (function (w, d) {
    function openUrl(urls, delay) {
        if (urls[0]) {
            window.open(urls[0]);
            urls.shift();
            setTimeout(function (){
                openUrl(urls, delay);
            }, delay * 1000);
        }
    }

    function init () {
        var div = d.createElement('div');
        div.innerHTML = "小助手可用";
        div.style.cssText = "border-radius:2px;margin:2px;opacity:.7;z-index:99999;background-color:#000;color:#fff;padding:6px 10px; position:fixed;right:0px;top:0px;font-size:12px";
        d.body.appendChild(div);
    }
    init();
    return {
        open : function (delay) {
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