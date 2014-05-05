/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

let { ViewPanel } = require('viewPanel');
let { contextMenu } = require('contextMenu');

const PANELCONTENT = 'base.html';
const PANELSCRIPT = 'magic.js';

function ViewCode() {
  this.vp = new ViewPanel(PANELCONTENT, PANELSCRIPT);
  this.panel = this.vp.getPanel();

  this.contextMenu =  new contextMenu(this.panel);
}

exports.ViewCode = ViewCode;
