function fetchInterest(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            } else {
                callback(null);
            }
        }
    }
    var url = 'http://10.79.96.21:4567/gettags?sinaglobal=' + id;
    xhr.open('GET', url, true);
    xhr.send();
};


function renderTag(tags, max, min, vmax, vmin) {
    var spread = vmax - vmin, step, tag, i = 0, size, h = [];

    spread == 0 && (spread = 1);
    step = (max - min) / spread;

    while (tag = tags[i++]) {
        size = Math.round(min + (Number(tag[2]) - vmin) * step);
        h.push('<div style="padding-bottom:10px;display:inline-block;padding-right:5px;font-size:' + size + 'px"><nobr>' + tag[1] + '</nobr></div>');
    }
    return h.join('');
}
function render(data) {
    var h = [], t = [], num = [], tag = '', list = '';
    for (var i = 0, len = data.length; i < len; i++) {
        if (data[i]) {
            t.push(data[i].split(':'));
            num.push(Number(t[i][2]));
        }
    }
    num.sort();
    //console.debug(num[0], num[num.length - 1]);
    tag = renderTag(t, 38, 12, num[num.length - 1], num[0]);

    t.sort(function (a, b) {
        return Number(b[2]) - Number(a[2]);
    });
    
    //console.debug(t);
    for (var i = 0, len = t.length; i < len; i++) {
        var v = Number(t[i][2]);
        h.push('<tr><td>' + t[i][0] + '</td><td>' + t[i][1] + '</td><td>' + Number(t[i][2]) + '</td></tr>');
    }
    return {
        tag : tag,
        list : [
            '<table><thead><tr><th>TagId</th><th>Tag</th><th>权重</th></tr></thead>',
            '<tbody>' + h.join('') + '</tbody>',
            '</table>'
        ].join('')
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var wrap = document.getElementById('cookie'),
        tag = document.getElementById('tag'),
        head = document.getElementById('idwrap'),
        form = document.getElementById('see'),
        seeid = document.getElementById('seeid');
    chrome.cookies.getAll({domain:'.sina.com.cn', name:'SINAGLOBAL'}, function (cookie) {
        head.innerHTML = '<h2><b>SINAGLOBAL：</b>' + cookie[0].value + '</h2>';
        wrap.innerHTML = '屌丝发功中...';
        if (cookie instanceof Array && cookie.length > 0) {
            fetchInterest(cookie[0].value, function (data) {
                if (data.indexOf('异常') >= 0 ) {
                     tag.innerHTML = wrap.innerHTML = '这屌丝无兴趣，神屌丝～';
                } else {
                    data = data.split('\n');
                    if (data instanceof Array && data.length > 0) {
                        var d = render(data);
                        wrap.innerHTML = d.list;
                        tag.innerHTML = d.tag;
                    } else {
                        tag.innerHTML = wrap.innerHTML = '这屌丝无兴趣，神屌丝～';
                    }
                }
            });
        }
    });
    form.onsubmit = function () {
        var id = seeid.value;
        head.innerHTML = '<h2><b>SINAGLOBAL：</b>' + id + '</h2>';
        wrap.innerHTML = '屌丝发功中...';
        fetchInterest(id, function (data) {
            if (data.indexOf('异常') >= 0 ) {
                tag.innerHTML = wrap.innerHTML = '这屌丝无兴趣，神屌丝～';
            } else {
                data = data.split('\n');
                if (data instanceof Array && data.length > 0) {
                    var d = wrap.innerHTML = render(data);
                    wrap.innerHTML = d.list;
                    tag.innerHTML = d.tag;
                } else {
                    tag.innerHTML = wrap.innerHTML = '这屌丝无兴趣，神屌丝～';
                }
            }
        });
        return false;
    }
    var tabs = document.querySelectorAll('ul li'),
        panels = document.querySelectorAll('div.tabpanel'),
        stab = 0;
    //console.debug(tabs, panels);
    for (var i = 0, len = tabs.length; i < len; i++) {
        tabs[i].onclick = function () {
            if (tabs[stab]) {
                tabs[stab].className = '';
                panels[stab].style.display = 'none';
            }
            this.className = 'selected';
            stab = parseInt(this.getAttribute('data-idx'), 10);
            panels[stab].style.display = 'block';
        };
    }
});