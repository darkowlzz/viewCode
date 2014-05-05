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
  let panel = Panel({
    width: sp.prefs['width'],
    height: sp.prefs['height'],
    contentURL: data.url(content),
    contentScriptFile: data.url(script)
  });

  let setWidth = (width) => {
    panel.width = width;
  }

  let setHeight = (height) => {
    panel.height = height;
  }

  let onWidthChange = () => {
    setWidth(sp.prefs['width']);
  }

  let onHeightChange = () => {
    setHeight(sp.prefs['height']);
  }

  // public methods

  let publicGetWidth = () => {
    return panel.width;
  }

  let publicGetHeight = () => {
    return panel.height;
  }

  let publicGetPanel = () => {
    return panel;
  }

  // listeners on the prefs change
  sp.on('width', onWidthChange);
  sp.on('height', onHeightChange);

  return {
    getWidth: publicGetWidth,
    getHeight: publicGetHeight,
    getPanel: publicGetPanel
  };
}

exports.ViewPanel = ViewPanel;
