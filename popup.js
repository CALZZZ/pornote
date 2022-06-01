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
        activePornote();
    } else {
        deactivePornote();
    }
});

var scripts = [{
    id: "145",
    matches: ['https://*.index-education.net/pronote/*'],
    js: ['pronote.js'],
    css: ['style-pronote.css'],
    runAt: 'document_start'
}];



function activePornote() {
    console.log("pornote activated");
    chrome.storage.sync.set({ isPornoteActivated: true });
    chrome.scripting.registerContentScripts(scripts);

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
}


function deactivePornote() {
    console.log("pornote deactivated");
    chrome.storage.sync.set({ isPornoteActivated: false });
    chrome.scripting.unregisterContentScripts(scripts);

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
}




// /pronote/eleve.html
// https://demo.index-education.net/pronote/parent.html
// https://demo.index-education.net/pronote/professeur.html

// https://codepen.io/dariocorsi/embed/YyeNRE?default-tab=html%2Cresult