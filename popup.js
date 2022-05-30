// Initialize button with user's preferred color
// Initialize button with user's preferred color
let switchTheme = document.getElementById("switchTheme");

// When the button is clicked, inject setPageBackgroundColor into current page
switchTheme.addEventListener("change", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (switchTheme.checked) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  }
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("imageTop", ({ imageTop }) => {
    let imgTop = document.getElementsByClassName('Image_Logo_PronoteBarreHaut')[0]
    imgTop.style.backgroundImage = "url("+chrome.runtime.getURL('img/logo_pornote_long.png')+")";
    document.getElementsByClassName('ImageFond')[0].style.backgroundImage = '';
    document.getElementsByClassName('ImageFond')[0].style.backgroundColor = 'rgb(35,35,35)';
    let avecMain = document.getElementsByClassName('AvecMain');
    for (var i = 0; i < avecMain.length; i++) {
      avecMain[i].style.display = "none";
    }
  });
}




// /pronote/eleve.html
// https://demo.index-education.net/pronote/parent.html
// https://demo.index-education.net/pronote/professeur.html

// https://codepen.io/dariocorsi/embed/YyeNRE?default-tab=html%2Cresult