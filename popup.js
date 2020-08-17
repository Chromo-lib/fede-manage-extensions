let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

function getAll (extensionsList) {

  console.log(extensionsList);

  let isUninstallSupported = !!chrome.management.uninstall;

  const filterInput = document.getElementById('filter');

  filterInput.addEventListener('keyup', (e) => {
    let newResult = extensionsList.filter(r => r.name.toLowerCase().includes((e.target.value).toLowerCase()))
    createList(newResult && newResult.length > 0 ? newResult : extensionsList, isUninstallSupported);
    enableDisableExt(getCheckInputs(), extensionsList);
  }, false);

  createList(extensionsList, isUninstallSupported);
  enableDisableExt(getCheckInputs());

  // safe uninstall extension
  isUninstallSupported && document.querySelectorAll('.btn-danger').forEach(b => {
    b.addEventListener('click', () => {
      const extensionId = b.getAttribute('data-id');
      chrome.management.uninstall(extensionId, { showConfirmDialog: true }, () => {
        void chrome.runtime.lastError;
      });
    }, false);
  });

  document.getElementById('btn-manage-extensions').addEventListener('click', () => {
    chrome.tabs.update({ url: "chrome://extensions" });
   // chrome.tabs.create({ url: "chrome://extensions", active:false });
  }, false);
}; // end getAll

// id, name, icons, enabled, isApp, description
chrome.management.getAll(getAll);
