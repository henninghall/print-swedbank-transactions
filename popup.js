let button = document.getElementById('printAll');

const url = "https://online.swedbank.se/app/foretag/start-page"

button.onclick = function (element) {

    chrome.tabs.update({ url });

    chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            if (tab.url === url) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.executeScript(tabs[0].id, { file: "content.js" });
                })
            }
        }
    })

};
