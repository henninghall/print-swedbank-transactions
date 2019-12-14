const url = "https://online.swedbank.se/app/foretag/start-page";

const print = numberOfFiles => () => {
  // chrome.tabs.update({ url });

  // chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  // if (changeInfo.status == 'complete') {
  // if (tab.url === url) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: "const NUMBER_OF_FILES = " + numberOfFiles
      },
      () => {
        chrome.tabs.executeScript(tabs[0].id, { file: "content.js" });
      }
    );
  });
  // }
  // }
  // })
};

let printAll = document.getElementById("printAll");
let print1 = document.getElementById("print1");
let print10 = document.getElementById("print10");

printAll.onclick = print();
print1.onclick = print(1);
print10.onclick = print(10);
