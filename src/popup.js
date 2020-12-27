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
};

chrome.management.getAll(getAll);
