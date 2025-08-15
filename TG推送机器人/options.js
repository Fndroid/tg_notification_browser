let confirmBtn = document.getElementById('confirmBtn');

confirmBtn.addEventListener('click', function () {
    let link = document.getElementById('linkIt').value;
    let isNoti = document.getElementById('soundCb').checked;

    // 解析用户输入的 URL 以提取 origin
    let url;
    try {
        url = new URL(link);
    } catch (e) {
        alert('请输入有效的 URL');
        return;
    }
    let origin = url.origin; // 提取协议和主机部分，例如 https://tgbot.lbyczf.com

    // 请求用户输入的 URL 权限
    chrome.permissions.request({
        origins: [`${origin}/*`]
    }, function (granted) {
        if (granted) {
            // 权限授予后保存设置
            chrome.storage.sync.set({ 'link': link, 'notify': isNoti }, function () {
                alert('设置成功');
            });
        } else {
            alert('权限未授予，无法保存设置');
        }
    });
});