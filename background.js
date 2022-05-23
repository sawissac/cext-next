/**
 *  set vaule on install
 *
 */

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    state: [{name: "data1"},{name: "data2"}]
  });
});

/**
 *  take action on click icon
 *
 */

chrome.action.onClicked.addListener(function (tabs) {
  if (isHttpUrl(tabs.url)) {
    /**define port */
    const port = chrome.tabs.connect(tabs.id, {
      name: "cextNextPort",
    });

    /** send data to the content */
    chrome.storage.sync.get("state", (res) => {
      port.postMessage({
        state: res.state
      });
    });
    /** listening the content replies */
    port.onMessage.addListener(function (msg) {
      chrome.storage.sync.set({
        state: msg.state
      });

      chrome.storage.sync.get("state", (res) => {
        port.postMessage({
          state: res.state
        });
      });
    });

    /** show the injected box */
    chrome.scripting.executeScript({
      target: { tabId: tabs.id, allFrames: true },
      files: ["/action/showcextbox.js"],
    });
  }
});


/**
 *  When tab change
 * 
 */
chrome.tabs.onActivated.addListener((info) => {
  getTab().then((res) => {
    if (isHttpUrl(res.url)) {
      chrome.action.setPopup({ popup: "", tabId: info.tabId });
      
      const port = chrome.tabs.connect(info.tabId, {
        name: "cextNextPort",
      });

      chrome.storage.sync.get("data", (res) => {
        port.postMessage({
          data: res.data,
        });
      });

      chrome.action.setBadgeText({ text: "ON" });
    } else {
      chrome.action.setBadgeText({ text: "OFF" });
      chrome.action.setPopup({ popup: "/popup.html", tabId: info.tabId });
    }
  });
});

chrome.tabs.onCreated.addListener((tab) => {
  if (isHttpUrl(tab.url)) {
    chrome.action.setBadgeText({ text: "ON" });
  } else {
    chrome.action.setPopup({ popup: "/popup.html", tabId: tab.id });
    chrome.action.setBadgeText({ text: "OFF" });
  }
});

chrome.tabs.onUpdated.addListener((tab, changeInfo, tabInfo) => {
  if (isHttpUrl(tabInfo.url)) {
    chrome.action.setBadgeText({ text: "ON" });
    chrome.action.setPopup({ popup: "", tabId: tab.id });
  } else {
    chrome.action.setBadgeText({ text: "OFF" });
    chrome.action.setPopup({ popup: "/popup.html", tabId: tab.id });
  }
});

async function getTab() {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  return tabs[0];
}

function isHttpUrl(url) {
  const t = url.split("/");
  const getUrlStart = t[0];
  return getUrlStart.includes("http");
}
