// background.js

let imageTop = chrome.runtime.getURL("img/logo_pornote_long.png");

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ imageTop });
  console.log('Default background color set to %cgreen color:'+imageTop );
});