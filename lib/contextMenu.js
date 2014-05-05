/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const cm = require('sdk/context-menu');
const { Cc, Ci } = require('chrome');

let ww = Cc['@mozilla.org/embedcomp/window-watcher;1'].
         getService(Ci.nsIWindowWatcher);


function contextMenu(panel) {
  this.panel = panel;

  // Context menu item to view code with <code> as the selector context.
  // The click on DOM is listened and the clicked node's inner HTML,
  // which is the code, is sent to the panel to display.
  this.cmCode = cm.Item({
    label: 'View Code',
    context: cm.SelectorContext('code'),
    contentScript: 'self.on("click", function(node, data) {' +
                   'self.postMessage(node.innerHTML);' +
                   '});',
    onMessage: (code) => {
      this.panel.port.emit('code', code);
      this.panel.show();
    }
  });

  // Context menu item to view code when the code is under a selector
  // with class as `code`.
  this.cmDiv = cm.Item({
    label: 'View Code',
    contentScript: 'self.on("context", function (node) {' +
                   '  console.log("starting context");' +
                   '  try {' +
                   '    if(node.getAttribute("class").contains("code")) {' +
                   '      console.log("Its class based");' +
                   '      self.postMessage(node.innerHTML);' +
                   '    }' +
                   '  } catch(e) {}' +
                   '});',
    onMessage: (code) => {
      this.panel.port.emit('code', code);
      this.panel.show();
    }
  });

  // Context menu item to open view code options, a.k.a prefs
  this.cmOpt = cm.Item({
    label: 'View Code Options',
    contentScript: 'self.on("context", function (node) {' +
                   '  return true;' +
                   '});' +
                   'self.on("click", function (node, data) {' +
                   '  self.postMessage("yolo");' +
                   '})',
    onMessage: (msg) => {
      console.log('opening a window');
      ww.openWindow(null, 'chrome://codeview/content/pref.xul', 'pref', 'chrome', null);
    }
  });
}

exports.contextMenu = contextMenu;
