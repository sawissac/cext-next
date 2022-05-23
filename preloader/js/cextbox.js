const cextBox = document.createElement("div");
const cextInnerBox = document.createElement("div");
cextBox.appendChild(cextInnerBox);

let cextBoxToggle = true;

const showCextBox = () => {
  if (cextBoxToggle) {
    document.body.appendChild(cextBox);
    cextBoxToggle = false;
  }else{
    document.body.removeChild(cextBox);
    cextBoxToggle = true;
  }
}

const cextBoxPos = {
  leftTop: "cext-box cextbox-pos-left-top",
  rightTop: "cext-box cextbox-pos-right-top",
  leftBottom: "cext-box cextbox-pos-left-bottom",
  rightBottom: "cext-box cextbox-pos-right-bottom",
  leftExpand: "cext-box cextbox-pos-left-expand",
  rightExpand: "cext-box cextbox-pos-right-expand",
  centerTop: "cext-box cextbox-pos-center-top",
  centerBottom: "cext-box cextbox-pos-center-bottom",
  center: "cext-box cextbox-pos-center"
}

const Helper = {
  frame: function(el,pos){
    el.setAttribute("class",pos);
  }
}

Helper.frame(cextBox,cextBoxPos.rightExpand);
Helper.frame(cextInnerBox,"inner-box")