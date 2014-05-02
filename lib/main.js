/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

'use strict';

let cm = require('sdk/context-menu');
let { Panel } = require('sdk/panel');
let { data } = require('sdk/self');

// Create a panel to display the code.
let panel = Panel({
  width: 700,
  height: 500,
  contentURL: data.url('base.html'),
  contentScriptFile: data.url('magic.js')
});

// Context menu item to view code with <code> as the selector context.
// The click on DOM is listened and the clicked node's inner HTML,
// which is the code, is sent to the panel to display.
cm.Item({
  label: 'View Code',
  context: cm.SelectorContext('code'),
  contentScript: 'self.on("click", function(node, data) {' +
                 'self.postMessage(node.innerHTML);' +
                 '});',
  onMessage: function (code) {
    panel.port.emit('code', code);
    panel.show();
  }
});

// Context menu item to view code when the code is under a selector
// with class as `code`.
cm.Item({
  label: 'View Code',
  contentScript: 'self.on("context", function (node) {' +
                 '  if(node.getAttribute("class").contains("code")) {' +
                 '    self.postMessage(node.innerHTML);' +
                 '}});',
  onMessage: function (code) {
    panel.port.emit('code', code);
    panel.show();
  }
});
