const onLibraries = window.location.pathname.includes('libraries');

function changeLanguage(idx) {
  const tabInputs = document.querySelectorAll('.tabbed-set input:nth-of-type(' + ++idx + ')');

  for (const tabInput of tabInputs) {
    tabInput.checked = true;
  }
}

if (onLibraries) {
  const languageBlocks = document.querySelectorAll('.tabbed-set');

  for (const languageBlock of languageBlocks) {
    const languageTabs = languageBlock.querySelectorAll('label');

    for (const [idx, languageTab] of languageTabs.entries()) {
      languageTab.addEventListener('click', changeLanguage.bind(this, idx));
    }
  }
}
