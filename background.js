// background.js

const customLogo = "url("+chrome.runtime.getURL('img/logo_pornote_long.png')+")";
const customColorPrimary = 'rgb(35,35,35)'
const customColorSecondary = 'rgb(50,50,50)'
const customColorTerciary = 'rgb(255,127,0)'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ customLogo });
  chrome.storage.sync.set({ customColorPrimary });
  chrome.storage.sync.set({ customColorSecondary });
  chrome.storage.sync.set({ customColorTerciary });
});