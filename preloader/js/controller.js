Object.assign(cextInnerBox.style,{
  background:`url('${chrome.runtime.getURL("/img/dot-background.png")}')`,
  backgroundPosition: 'center',
  backgroundSize: '200px 200px',
})


const positionHeader = document.createElement("h5");
const dataTransferHeader = document.createElement("h5");

positionHeader.textContent = "Position Control";
dataTransferHeader.textContent = "Data transfer";

cextInnerBox.appendChild(positionHeader);

const arrowSvgUrl = chrome.runtime.getURL("/icon/arrow/angle-left.svg");
const plusSvgUrl = chrome.runtime.getURL("/icon/arrow/plus.svg");

const cextImgs = [
  { src: arrowSvgUrl, rotate: 0, action: cextBoxPos.leftExpand },
  { src: plusSvgUrl, rotate: 0, action: cextBoxPos.center },
  { src: arrowSvgUrl, rotate: -180, action: cextBoxPos.rightExpand },
  { src: arrowSvgUrl, rotate: 90, action: cextBoxPos.centerTop },
  { src: arrowSvgUrl, rotate: -90, action: cextBoxPos.centerBottom },
  { src: arrowSvgUrl, rotate: 43, action: cextBoxPos.leftTop },
  { src: arrowSvgUrl, rotate: 133, action: cextBoxPos.rightTop },
  { src: arrowSvgUrl, rotate: -47, action: cextBoxPos.leftBottom },
  { src: arrowSvgUrl, rotate: -135, action: cextBoxPos.rightBottom },
];

const cextBtnCon = document.createElement("div");
cextBtnCon.setAttribute("class", "cext-btn-con");

for (let i of cextImgs) {
  const btn = document.createElement("div");
  const imgs = document.createElement("img");
  btn.setAttribute("class", "cext-btn");
  imgs.src = i.src;
  imgs.width = 15;
  imgs.setAttribute("style", `transform:rotate(${i.rotate}deg)`);
  btn.appendChild(imgs);
  btn.addEventListener("click", () => {
    Helper.frame(cextBox, i.action);
  });
  cextBtnCon.appendChild(btn);
}

cextInnerBox.appendChild(cextBtnCon);
cextInnerBox.appendChild(dataTransferHeader);

const cextInput = document.createElement("input");
const sendmessagebtn = document.createElement("input");

cextInput.type = "text";
cextInput.setAttribute("class", "cext-input");

sendmessagebtn.type = "button";
sendmessagebtn.setAttribute("class", "cext-btn-expand");
sendmessagebtn.value = "send message";

cextInnerBox.appendChild(cextInput);
cextInnerBox.appendChild(sendmessagebtn);

const cextListUl = document.createElement("ul");
const notifine = document.createElement("h5");

notifine.textContent = "Send message and view in new tab and see the data change."
cextInnerBox.appendChild(notifine);
cextInnerBox.appendChild(cextListUl);

function buildCextList(list) {
  cextListUl.innerHTML = "";
  for (let i of list) {
    const li = document.createElement("li");
    li.textContent = i.name;
    cextListUl.appendChild(li);
  }
}


/**
 * Reprot Back to the extension
 *  
 */

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (res) {
    if (port.name === "cextNextPort") {
      const stateData = res.state;
      buildCextList(stateData);

      sendmessagebtn.addEventListener("click", function (e) {
        const inputValue = cextInput.value;
        if (inputValue.length > 0) {
          stateData.push({ name: inputValue });
          port.postMessage({
            state: stateData
          });
        };
      });
    }
  });
});
