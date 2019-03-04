function sendMessage(data) {
  let gettingItem = browser.storage.local.get(['link', 'notify'])
  function onGot(items) {
    let userLink = items.link;
    let userNotify = items.notify;
    console.log(userLink, userNotify)
    if (!userLink) {
        return
    }
    data.disable_notification = userNotify
    let xhr = new XMLHttpRequest();
    xhr.open('POST', userLink, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
  }
  function onError(error) {
    console.error(error)
  }
  gettingItem.then(onGot, onError)
}

browser.browserAction.onClicked.addListener(function (tab) {
  console.log(tab)
  let data = {
    text: `${tab.title}\n${tab.url}`,
    disable_web_page_preview: true,
  }
  sendMessage(data)
});

browser.menus.create({
  id: "mainContenxtMenu",
  title: "推送到Telegram",
  contexts: ["image", "selection", "link"]
});

browser.menus.onClicked.addListener(function (info, tab) {
  let str = [info.selectionText, info.linkUrl, info.srcUrl].join('\n\n')
  let data = {}
  if (info.selectionText) {
    data.text = info.selectionText
  } else if (info.linkUrl) {
    data.text = info.linkUrl
  } else if (info.srcUrl) {
    data.photo = info.srcUrl
  }
  sendMessage(data)
})
