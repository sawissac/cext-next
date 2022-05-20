chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    /** ... */
  });
});

chrome.action.onClicked.addListener(function (tabs) {
  chrome.scripting.executeScript({
    target: { tabId: tabs.id, allFrames: true },
    files: ["/contentscript/..."],
  });
});
