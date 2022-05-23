const googleBtn = document.getElementById("google");
const bingBtn = document.getElementById("bing");

googleBtn.addEventListener("click", () => {
    chrome.tabs.create({
      url: "https://www.google.com/" 
    });
});
bingBtn.addEventListener("click", () => {
  chrome.tabs.create({
      url: "https://www.bing.com/" 
    });
});
