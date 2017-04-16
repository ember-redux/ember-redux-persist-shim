/* eslint-env node */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const path = require('path');
const esTranspiler = require('broccoli-babel-transpiler');

module.exports = {
  name: 'redux-persist',
  treeForAddon (tree) {
    const persistPath = path.dirname(require.resolve('redux-persist/src/index.js'));
    var persistTree = esTranspiler(persistPath, {
      presets: [
          ['stage-2']
      ]
    });

    if (!tree) {
      return this._super.treeForAddon.call(this, persistTree);
    }

    const trees = mergeTrees([persistTree, tree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
  }
}
