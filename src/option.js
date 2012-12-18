(function (d) {
    var extension = chrome.extension.getBackgroundPage();
        profileManager = extension.profileManager;
    
    var delayRange = d.getElementById('delayRange'),
        delay = d.getElementById('delay'),
        //pageSize = d.getElementById('pageSize'),
        form = d.getElementById('configForm'),
        profile = profileManager.getProfile(),
        info = d.getElementById('info'),
        timer = null;

    delayRange.value = profile.delay;
    delay.innerHTML = profile.delay;
    //pageSize.value = profile.pageSize;

    function showinfo (msg) {
        timer && clearTimeout(timer);
        info.innerHTML = msg;
        info.style.display = 'inline';
        timer = setTimeout(function () {
            info.style.display = 'none';
        }, 2000);
    }

    delayRange.onchange = function () {
        delay.innerHTML = this.value;
    };

    form.onsubmit = function (e) {
        e.stopPropagation();
        e.preventDefault();
        profileManager.setProfile(delayRange.value);
        //console.debug(profileManager.getProfile());
        showinfo('已保存');
        return false;
    };
})(document);