/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const { Panel } = require('sdk/panel');
const { data } = require('sdk/self');
const sp = require('sdk/simple-prefs');

/**
 * ViewPanel class
 * @param {String, String} (content, script)
 *    `content` is the contentURL of the panel.
 *    `script` is the contentScriptFile of the panel.
 */
function ViewPanel(content, script) {
  this.panel = Panel({
    width: sp.prefs['width'],
    height: sp.prefs['height'],
    contentURL: data.url(content),
    contentScriptFile: data.url(script)
  });

  let onWidthChange = () => {
    this.panel.width = sp.prefs['width'];
  }

  let onHeightChange = () => {
    this.panel.height = sp.prefs['height'];
  }

  // listeners on the prefs change
  sp.on('width', onWidthChange);
  sp.on('height', onHeightChange);
}

function getWidth() {
  return this.panel.width;
}

function getHeight() {
  return this.panel.height;
}

function setWidth(width) {
  console.log('setting width');
  this.panel.width = width;
}

function setHeight(height) {
  console.log('setting height');
  this.panel.height = height;
}

function getPanel() {
  return this.panel;
}

ViewPanel.prototype.getWidth = getWidth;
ViewPanel.prototype.getHeight = getHeight;
ViewPanel.prototype.setWidth = setWidth;
ViewPanel.prototype.setHeight = setHeight;
ViewPanel.prototype.getPanel = getPanel;

exports.ViewPanel = ViewPanel;
