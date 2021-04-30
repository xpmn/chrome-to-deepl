function renderOptions() {
  return chrome.storage.local.get(['settings'], (store) => {
    const defaultLang = (store.settings && store.settings.defaultLang) ? store.settings.defaultLang : 'en';
    document.getElementById('defaultLang').value = defaultLang;
  });
}

document.getElementById('defaultLang').addEventListener('click', (e) => {
  if (['en', 'bg', 'da', 'de', 'es', 'et', 'el', 'fr', 'fi', 'hu', 'it', 'ja', 'lv,lt', 'lt', 'nl', 'pl', 'pt-PT', 'pt-BR', 'ro', 'ru', 'sk', 'sl', 'sv', 'zh'].indexOf(e.target.value) !== -1) {
    chrome.storage.local.set({
      settings: {
        defaultLang: e.target.value
      }
    });
  }
});

renderOptions();