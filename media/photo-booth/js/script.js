'use strict';
const list = document.getElementsByClassName('list')[0];
const app = document.getElementsByClassName('app')[0];
const controls = app.getElementsByClassName('controls')[0];
const takePhotoBtn = document.getElementById('take-photo');
const errMessageP = document.getElementById('error-message');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const photoListTemplate = (image) => {
  if (image)
    return {
      tag: 'figure',
      content: [{
          tag: 'img',
          atr: {
            src: `${image.src}`
          }
        },
        {
          tag: 'figcaption',
          content: [{
            tag: 'a',
            atr: {
              href: `${image.src}`,
              download: 'snapshot.png'
            },
            content: {
              tag: 'i',
              cls: 'material-icons',
              content: 'file_download'
            }
          }, {
            tag: 'a',
            content: {
              tag: 'i',
              cls: 'material-icons',
              content: 'file_upload'
            }
          }, {
            tag: 'a',
            content: {
              tag: 'i',
              cls: 'material-icons',
              content: 'delete'
            }
          }]
        }
      ]
    };
};

const pars = (template) => {
  if (template) {
    let elem;
    if (typeof template === 'object') {
      if (template.tag) {
        elem = document.createElement(template.tag);
      }
      if (template.cls) {
        elem.classList.add(template.cls);
      }
      if (template.atr) {
        Object.keys(template.atr).forEach(key => elem.setAttribute(key, template.atr[key]));
      }
      list.insertBefore(elem, list.firstChild);
      if (Array.isArray(template.content)) {
        template.content.map((item) => elem.appendChild(pars(item)));
      } else if (typeof template.content === 'object') {
        elem.appendChild(pars(template.content));
      } else if (typeof template.content === 'string' || template.content === '') {
        elem.appendChild(document.createTextNode(template.content));
      }
    }
    return elem;
  }
};

const getVideo = stream => {
  const video = document.createElement('video');
  video.setAttribute('autoplay', 'autoplay');
  video.srcObject = stream;
  app.appendChild(video);
  controls.style.display = 'flex';
  return video;
};

const takePhoto = video => {
  const shutter = document.createElement('audio');
  shutter.src = './audio/click.mp3';

  takePhotoBtn.addEventListener('click', () => {
    shutter.play()
      .catch((e) => e);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    app.appendChild(canvas);
    ctx.drawImage(video, 0, 0);
    let image = document.createElement('img');
    image.src = canvas.toDataURL();
    pars(photoListTemplate(image));

  });
};

document.addEventListener('click', (event) => {
  const parent = event.target.parentElement;
  const element = parent.parentElement.parentElement;
  const text = event.target.innerText;
  const image = element.firstChild;
  if (text === 'delete') {
    list.removeChild(element);
  } else if (text === 'file_download') {
    parent.style.display = 'none';

  } else if (text === 'file_upload') {
    let tmpCanvas = document.createElement('canvas');
    let tmpCtx = tmpCanvas.getContext('2d');
    tmpCanvas.width = image.width;
    tmpCanvas.height = image.height;
    tmpCtx.drawImage(image, 0, 0);
    tmpCanvas.toBlob((blob) => {
      let formData = new FormData();
      formData.append('image', blob);
      fetch('https://neto-api.herokuapp.com/photo-booth', {
          method: 'POST',
          body: formData,
        })
        .then(() => event.target.style.display = 'none')
        .catch(e => console.log(e));
    });


  }
});


const setErrMessage = (message) => {
  if (message) {
    errMessageP.appendChild(document.createTextNode(message));
    errMessageP.style.display = 'block';
  }
};

document.addEventListener('DOMContentLoaded', () => {

  if (navigator.mediaDevices === undefined || navigator.mediaDevices.getUserMedia === undefined) {
    setErrMessage('Ошибка: API не поддерживается!');
    return;
  }
  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    .then(getVideo)
    .then(takePhoto)
    .catch((e) => setErrMessage(e));
});