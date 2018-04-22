let confirmBtn = document.getElementById('confirmBtn');

confirmBtn.addEventListener('click', function() {
    let link = document.getElementById('linkIt').value;
    let isNoti = document.getElementById('soundCb').checked;
    chrome.storage.sync.set({'link': link, 'notify': isNoti}, function() {
        alert('设置成功')
    })
})