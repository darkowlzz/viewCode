// Select the elemenet where code would be inserted.
var code = document.getElementById('here');

// Receive the code and insert in the above element.
self.port.on('code', function (text) {
  code.innerHTML = text;
});
