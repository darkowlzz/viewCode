var code = document.getElementById('here');
self.port.on('code', function (text) {
  console.log('code received');
  code.innerHTML = text;
});
