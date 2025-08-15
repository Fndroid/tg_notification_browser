function getword(info, tab) {
    console.log("Word " + info.selectionText + " was clicked.");
    chrome.tabs.create({
        url: "http://www.google.com/search?q=" + info.selectionText
    });
}

chrome.contextMenus.create({
    id: "searchMenu",
    title: "Search: %s",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "searchMenu") {
        getword(info, tab);
    }
});