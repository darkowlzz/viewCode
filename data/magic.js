var code = document.getElementById('codehere');
self.port.on('code', function (text) {
  console.log('code received');
  code.innerHTML = text;
});
