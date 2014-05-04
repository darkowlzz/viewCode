/**
 * codeViewNS namespace.
 */
if (typeof codeViewNS == 'undefined') {
  let codeViewNS = {
    /**
     * Initializes the namespace.
     */
    init: function() {
      this.prefs = Components.classes['@mozilla.org/preferences-service;1']
                   .getService(Components.interfaces.nsIPrefService)
                   .getBranch('extensions.viewcode@darkowlzz.');

      this.getWidth = this.prefs.getIntPref('width');
    }
  };
};
