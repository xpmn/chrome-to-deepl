const deeplURL = "https://www.deepl.com/translator#en/"
let defaultLang = "en"

function getDefaultLang() {
  chrome.storage.local.get(['settings'], (store) => {
    if (store.settings && store.settings.defaultLang) {
      defaultLang = store.settings.defaultLang
    }
  });
}

chrome.contextMenus.create({
  id: "translate-text",
  title: "To DeepL",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'translate-text':
      const translateURL = `${deeplURL + defaultLang}/${encodeURIComponent(info.selectionText)}`;
      chrome.tabs.query({ currentWindow: true, active: true }, (current) => {
        if (current.length) {
          chrome.tabs.create({
            url: translateURL,
            active: true,
            index: current[0].index + 1,
            openerTabId: current[0].id
          });
        } else {
          chrome.tabs.create({
            url: translateURL
          });
        }
      });
  }
});

getDefaultLang();

chrome.storage.onChanged.addListener(getDefaultLang);