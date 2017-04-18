/* eslint-env node */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const path = require('path');
const esTranspiler = require('broccoli-babel-transpiler');
const replace = require('broccoli-string-replace');

module.exports = {
  name: 'redux-persist',
  treeForAddon (tree) {
    const persistPath = path.dirname(require.resolve('redux-persist/src/index.js'));

    const denodifiedPersist = replace(persistPath, {
      files: [ '**/*.js' ],
      patterns: [{
        match: /process\.env\.NODE_ENV/g,
        replacement: JSON.stringify(process.env.EMBER_ENV)
      }, {
        match: /global\.setImmediate/g,
        replacement: '(fn) => setTimeout(fn, 0)'
      }]
    });

    const persistTree = esTranspiler(denodifiedPersist, {
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
