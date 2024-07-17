const video = document.getElementById('video');
const captureButton = document.getElementById('capture-button');
const results = document.getElementById('results');
const socket = io();

// Get access to the camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error('Error accessing the camera', error);
  });

captureButton.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/png');
  
  fetch('/capture', {
    method: 'POST',
    body: JSON.stringify({ image: dataUrl }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  socket.emit('capture');
});

socket.on('detection-result', (data) => {
  results.innerHTML = `<pre>${data}</pre>`;
});
