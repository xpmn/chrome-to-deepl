function renderOptions() {
  return chrome.storage.local.get(['settings'], (store) => {
    const defaultLang = (store.settings && store.settings.defaultLang) ? store.settings.defaultLang : 'en';
    document.getElementById('defaultLang').value = defaultLang;
  });
}

document.getElementById('defaultLang').addEventListener('click', (e) => {
  if (['en', 'de', 'fr', 'es', 'ja', 'pt-PT', 'pt-BR', 'it', 'nl', 'pl', 'ru', 'zh'].indexOf(e.target.value) !== -1) {
    chrome.storage.local.set({
      settings: {
        defaultLang: e.target.value
      }
    });
  }
});

renderOptions();