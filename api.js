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
    ulList.innerHTML += `
<li id="${extension.id}">
  ${isUninstallSupported ? `<button class="btn btn-danger" data-id="${extension.id}">RM</button>` : ''}
  <div class="ext-d">
    <div class="fs-12 d-flex truncate">
      <img src="${extension.icons[0].url}" alt="${extension.name}" class="mr-5" />
      <span class="truncate">${extension.name}</span>
    </div>    
    <span class="badge ${extension.isApp ? 'bg-g' : ''}">${extension.isApp ? 'a' : 'e'}</span>
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

      let audio = new Audio('assets/close.mp3');
      audio.volume = .2;
      audio.play();
    });
  }); // object loop
}
