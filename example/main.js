import Immerser from '../immerser.js';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import 'normalize.css';
import '../immerser.scss';
// import Prism from 'prismjs';

const scrollbarNodeList = document.querySelectorAll('.scroller-x');
for (let i = 0; i < scrollbarNodeList.length; i++) {
  const scrollbarNode = scrollbarNodeList[i];
  new SimpleBar(scrollbarNode, { autoHide: false });
}

const my = new Immerser({
  stylesInCSS: true,
  synchroHoverPagerLinks: true,
  updateHash: true,
  onInit(immerser) {
    console.log(immerser);
  },
  onActiveLayerChange(activeIndex, immerser) {
    console.log(activeIndex, immerser);
  },
});

const highlighterNodeList = document.querySelectorAll('[data-highlighter]');
const highlighterAnimationClassname = 'highlighter-animation-active';

for (let i = 0; i < highlighterNodeList.length; i++) {
  const highlighterNode = highlighterNodeList[i];
  highlighterNode.addEventListener('mouseover', highlight(highlighterNode));
  highlighterNode.addEventListener('click', highlight(highlighterNode));
  function highlight(highlighterNode) {
    return function() {
      const targetSelector = highlighterNode.dataset.highlighter;
      const targetNodeList = document.querySelectorAll(targetSelector);
      for (let j = 0; j < targetNodeList.length; j++) {
        const targetNode = targetNodeList[j];
        if (!targetNode.isHighlighting) {
          targetNode.isHighlighting = true;
          targetNode.classList.add(highlighterAnimationClassname);
          const timerId = setTimeout(() => {
            targetNode.classList.remove(highlighterAnimationClassname);
            clearTimeout(timerId);
            targetNode.isHighlighting = false;
          }, 1500);
        }
      }
    };
  }
}

const faceNodeList = document.querySelectorAll('[data-face-spinning]');
for (let i = 0; i < faceNodeList.length; i++) {
  const faceNode = faceNodeList[i];
  faceNode.addEventListener('click', function() {
    if (faceNode.dataset.faceSpinning === 'false') {
      faceNode.dataset.faceSpinning = 'true';
      setTimeout(() => {
        faceNode.dataset.faceSpinning = 'false';
      }, 620);
    }
  });
}

window.toggleRulers = function() {
  document.body.classList.toggle('rulers');
}

console.log('welcome here, fella. invoke toggleRulers() to see vertical rhythm');
