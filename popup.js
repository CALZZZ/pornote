// Initialize button with user's preferred color
// Initialize button with user's preferred color
let switchTheme = document.getElementById("switchTheme");

// When the button is clicked, inject setPageBackgroundColor into current page
switchTheme.addEventListener("change", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (switchTheme.checked) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: modifier
    });
  }
});

// The body of this function will be executed as a content script inside the
// current page
function modifier() {
  // On récupère les variable de background.js
  chrome.storage.sync.get([
      'customLogo',
      'customColorPrimary',
      'customColorSecondary',
      'customColorTerciary'
    ], function(param) {

      // Logo en haut à droite
      const imgTop = document.getElementsByClassName('Image_Logo_PronoteBarreHaut')[0]
      imgTop.style.backgroundImage = param.customLogo

      // Element principal de la page
      const div = document.getElementById('div')

      // Image au milieu sur la page de connexion
      const imgMid = div.children[1].children[1] // Cibler l'image au milieu sur le vrai site
      //const imgMid = div.children[1].children[4] // Cibler l'image au milieu sur le site de test
      if (typeof(imgMid) != 'undefined' && imgMid != null) {
        imgMid.style.display = "none"
      }

      // Fond sur la page de connexion
      const imageFond = document.getElementsByClassName('ImageFond')[0]
      if (typeof(imageFond) != 'undefined' && imageFond != null) {
        imageFond.style.backgroundImage = '';
        imageFond.style.backgroundColor = param.customColorPrimary
      }

      // Changer le fond sur la page principale
      var bgMain = document.getElementById('GInterface.Instances[2]_defaut_')
      bgMain.style.backgroundImage = ''
      bgMain.style.backgroundColor = param.customColorPrimary

        var x = document.getElementsByTagName('article')
        for (var i=0, max=x.length; i < max; i++) {
          // Do something with the element here
          x[i].style.backgroundColor = param.customColorSecondary;
        }

        //rgb(242, 242, 242)
        //console.log(all[i].style.backgroundColor)

  });
}




// /pronote/eleve.html
// https://demo.index-education.net/pronote/parent.html
// https://demo.index-education.net/pronote/professeur.html

// https://codepen.io/dariocorsi/embed/YyeNRE?default-tab=html%2Cresult