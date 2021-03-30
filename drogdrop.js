const dropSpace = document.querySelector('.drag-space');
const div = document.querySelector('.info-title');
const imgNAme = document.querySelector('#info-title-text');
const formUpload = document.querySelector('.progress__inner__btn-form');
const divInfoAboutSize = document.querySelector('.info-text');
const imgSize = document.querySelector('#info-text-size');
const btnSave = document.querySelector('.drag-space-save');
const input = document.querySelector('#fileElem');
const progress = document.querySelector('.progress__inner-loaded');
const progressBar = progress.querySelector('progress');
let file;

const availableFileTypes = {
  'image/png': true,
  'image/jpg': true,
  'image/jpeg': true,
}

input.addEventListener('change', function() {
  file = this.files[0];
  toggleDropSpaceClass();
  showFileInfo();
  progress.classList.add('active');
  // if(progressBar.value = 100){
  //   progressBar.innerHTML = '';
  // }
  console.log(file.name);
});
input.addEventListener('click', e => {
  progressBar.innerHTML = " ";
})

function toggleDropSpaceClass(){
  dropSpace.classList.toggle('active');
}

dropSpace.addEventListener('dragover' ,(e) => {
  e.preventDefault();
});

dropSpace.addEventListener('dragenter' ,(e) => {
  toggleDropSpaceClass();
});

dropSpace.addEventListener('dragleave', (e) => {
  toggleDropSpaceClass();
})

dropSpace.addEventListener('drop', (e) => {
  e.preventDefault();
  if( e.dataTransfer.files.length > 1){
    alert(' You can drop only one file');
    toggleDropSpaceClass();
    return;
  }
  [file] = e.dataTransfer.files;
  showFileInfo();
  progress.classList.add('active');
});

function showFileInfo(){
  const fileType = file.type;
  const fileName = file.name;
  const fileSize = file.size;
  toggleDropSpaceClass();
  if (availableFileTypes[fileType] === undefined) {
    alert(' You can drop only file with type: png,jpg,jpeg!');
    return
  }
  imgNAme.classList.add('info-title');
  imgNAme.textContent = fileName;
  imgSize.classList.add('info-text');
  imgSize.textContent = `${Math.floor(fileSize / 1000)}kb`;
}

formUpload.addEventListener('submit', uploadFileToServer);

function uploadFileToServer(e){
  e.preventDefault();
  sendImg();
};

 const btnShowFile = document.querySelector('.drag-space-show');
 btnShowFile.addEventListener('click', e => {
  //  serverResponse(renderFile);
  serverResponse(file).then(renderFile).catch(err => alert('Ooops, error!'));
})

function sendImg(){
  const url = 'http://localhost:2121/upload';
  const formData = new FormData();
  formData.append('files', file)
  fetch(url, {
    method: 'POST',
    body: formData,
  })
  .then(e => { progressBar.value = 0;
      const loaded = e.loaded;
      const total = e.total;
      const percent = (loaded / total) * 100;
      progressBar.setAttribute('style', `width: ${percent.toFixed(2)}%` );
      progressBar.value = Math.floor(percent); })
  .catch((err) => { console.log('error');})
}

function serverResponse(cb){
  return Promise.resolve().then(() => {
    return fetch('http://localhost:2121/files')
    .then(response => response.json())
    .catch((err) => { console.log('error');});
   })
};

const container = document.querySelector('.container__img');
const section = document.querySelector('.server__response__img');

function renderFile(response) {
  const fragment = document.createDocumentFragment();
  response.forEach(file => { 
    // file = file[file.length-1];
    const img = document.createElement('img');
    img.src = `${file}`;
    img.style.width = '90%';
    img.style.marginTop = '20px';
    const div = document.createElement('div');
    div.classList.add('inner__server__response__img');
    div.classList.add('active');
    div.appendChild(img);
    fragment.appendChild(div);
    container.appendChild(fragment);
  });
  section.appendChild(container);
}

