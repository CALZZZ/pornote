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
        console.log("button activated");
        chrome.storage.sync.set({ isPornoteActivated: true });

        // inject setPageBackgroundColor into current page
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: activePornote,
        });

    } else {
        console.log("button deactivated");
        chrome.storage.sync.set({ isPornoteActivated: false });

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
    console.log("active pornote");

    // change image banner
    const imgTop = document.getElementsByClassName('Image_Logo_PronoteBarreHaut')[0];

    url = chrome.runtime.getURL("img/logo_pornote_long.png");
    imgTop.style.backgroundImage = `url(${url})`;


    // change background color
    const background = document.getElementsByClassName('ImageFond')[0];

    chrome.storage.sync.get("backgroundColor", (data) => {
        console.log(`backgroundColor: ${data.backgroundColor}`);
        background.style.backgroundColor = data.backgroundColor;
        background.style.backgroundImage = 'none';
    });

    // change the gif

    gif_element_ids = ["id_16", "id_8_image"]
    const gif = document.querySelectorAll(gif_element_ids.map(id => `#${id}`).join(', '))[0];
    if (gif) { // if gif exists
        const width = gif.clientWidth;
        gif.src = "https://attraptemps.fr/wp-content/uploads/2017/12/poste-developpeur-integrateur.gif";
        // change the gif size with the real width and no height
        gif.style.width = `${width}px`;
        gif.style.height = 'auto';
    }

    // change name in header
    const name = document.querySelector('.ibe_util_texte.ibe_actif');
    if (name) {
        console.log(name);
        name.innerHTML = "Espace Professeurs - LE BOSS";
    }
}

function deactivePornote() {
    console.log("deactivate pornote");

    // change image banner
    const imgTop = document.getElementsByClassName('Image_Logo_PronoteBarreHaut')[0];

    url = "	https://0451462v.index-education.net/pronote/FichiersRessource/LogoPronoteBarreHaut.png"
    imgTop.style.backgroundImage = `url(${url})`;
}




// /pronote/eleve.html
// https://demo.index-education.net/pronote/parent.html
// https://demo.index-education.net/pronote/professeur.html

// https://codepen.io/dariocorsi/embed/YyeNRE?default-tab=html%2Cresult