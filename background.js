chrome.runtime.onInstalled.addListener(() => {
    console.log("The extension was installed");

    // store the default background color
    chrome.storage.sync.set({ backgroundColor: "#222222" });
    console.log("The default background color was set");

    // is pornote activated
    chrome.storage.sync.set({ isPornoteActivated: false });
    console.log("The default pornote activation was set");
});