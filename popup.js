// Initialize button with user's preferred color
let switchButton = document.getElementById("switchTheme");

chrome.storage.sync.get("isPornoteActivated", (data) => {
    if (data.isPornoteActivated) {
        switchButton.checked = true;
    }
});

// When the button is clicked
switchButton.addEventListener("change", async() => {
    if (switchButton.checked) {
        // inject setPageBackgroundColor into current page
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: activePornote,
        });

    } else {
        // inject setPageBackgroundColor into current page
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: deactivePornote,
        });
    }
});

// The body of this function will be executed as a content script inside the current page
function activePornote() {
  chrome.storage.sync.set({ isPornoteActivated: true });
  console.log("button activated");

    chrome.storage.sync.get([
        'customLogo',
        'customColorPrimary',
        'customColorSecondary',
        'customColorTerciary'
    ], function(param) {

        // Logo en haut à droite
        const imgTop = document.getElementsByClassName('Image_Logo_PronoteBarreHaut')[0]
        imgTop.style.backgroundImage = param.customLogo

        // changer le gif
        gif_element_ids = ["id_16", "id_8_image"] // id des gifs sur les différentes pages
        const gif = document.querySelectorAll(gif_element_ids.map(id => `#${id}`).join(', '))[0];
        if (gif) {
            const width = gif.clientWidth;
            gif.src = "https://attraptemps.fr/wp-content/uploads/2017/12/poste-developpeur-integrateur.gif"; // TODO : a stocker en local
            gif.style.width = `${width}px`;
            gif.style.height = 'auto';
        }

        // Fond sur la page de connexion
        const imageFond = document.getElementsByClassName('ImageFond')[0]
        if (imageFond) {
            imageFond.style.backgroundImage = 'none';
            imageFond.style.backgroundColor = param.customColorPrimary;
        }

        // Changer le fond sur la page principale
        var bgMain = document.getElementById('GInterface.Instances[2]_defaut_')
        if (bgMain) {
            bgMain.style.backgroundImage = 'none';
            bgMain.style.backgroundColor = param.customColorPrimary;
        }

        // card
        var x = document.querySelectorAll('.widget')
        for (var i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = param.customColorSecondary;
            // text color
            x[i].style.color = "white";
        }

        // changer le titre de la page
        const name = document.querySelector('.ibe_util_texte.ibe_actif');
        if (name) {
            console.log(name);
            name.innerHTML = "Espace Professeurs - LE BOSS";
        }
    });
}


function deactivePornote() {
    chrome.storage.sync.set({ isPornoteActivated: false });
    console.log("button deactivated");

    // image logo
    const imgTop = document.getElementsByClassName('Image_Logo_PronoteBarreHaut')[0];
    url = "	https://0451462v.index-education.net/pronote/FichiersRessource/LogoPronoteBarreHaut.png"
    imgTop.style.backgroundImage = `url(${url})`;
}




// /pronote/eleve.html
// https://demo.index-education.net/pronote/parent.html
// https://demo.index-education.net/pronote/professeur.html

// https://codepen.io/dariocorsi/embed/YyeNRE?default-tab=html%2Cresult