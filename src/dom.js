let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

// get all check inputs elements
function getCheckInputs () {
  let checkInput = document.querySelectorAll('#mainToggle');
  return checkInput;
}

function createSwitchElement (extension) {
  return `<div class="sc-dxgOiQ cmgOtW ml-10">
  
  <input class="sc-kpOJdX eFIxha" type="checkbox" id="mainToggle" data-id="${extension.id}">
  
  <div class="sc-ckVGcZ gcyAeL">  
    <label class="sc-jKJlTe eznuVJ" for="mainToggle"></label>  
    ${extension.enabled
      ? `<label class="sc-eNQAEJ dTRKfN" for="mainToggle" data-st="${extension.id}"></label>`
      : `<label class="sc-eNQAEJ hzkbkt" for="mainToggle" data-st="${extension.id}"></label>`
    }
  </div>
</div>`;
}

// create list of extensions
function createList (extensions, isUninstallSupported = true) {

  let ulList = document.getElementById('list');

  ulList.innerHTML = '';
  extensions.forEach(extension => {
    let icons = extension.icons;
    let icon = icons ? icons[icons.length - 1].url : '../assets/icon64.png';
    ulList.innerHTML += `<li id="${extension.id}">
  ${isUninstallSupported ? `<button class="btn btn-danger" data-id="${extension.id}">RM</button>` : ''}
  <div class="ext-d">
    <div>
      <img src="${icon}" alt="${extension.name}" class="mr-5" />
      <span class="truncate">${extension.name}</span>
    </div>   
    <span class="badge ${extension.isApp ? 'bg-g' : ''}" title="${extension.isApp ? 'Application' : 'Extension'}">${extension.isApp ? 'a' : 'e'}</span>
  </div>
  ${createSwitchElement(extension)}
</li>`});
}

// on click check input : enable or disable extension
function enableDisableExt (checkInput) {
  Object.keys(checkInput).forEach((v, i) => {

    checkInput[v].addEventListener('change', (e) => {

      const extensionId = e.target.dataset.id;
      const status = e.target.checked;

      chrome.management.setEnabled(extensionId, status);

      const extLi = document.getElementById(extensionId);
      const switchElement = document.querySelector(`[data-st='${extensionId}']`);
      if (status) {
        switchElement.classList.remove('hzkbkt');
        switchElement.classList.add('dTRKfN');
        extLi.classList.add('bg-rose');
      }
      else {
        switchElement.classList.remove('dTRKfN');
        switchElement.classList.add('hzkbkt');
        extLi.classList.remove('bg-rose');
      }
    });
  }); // object loop
}
