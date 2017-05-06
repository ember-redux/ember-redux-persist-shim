/* eslint-env node */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const path = require('path');
const replace = require('broccoli-string-replace');

module.exports = {
  name: 'redux-persist',
  treeForAddon (tree) {
    const persistPath = path.dirname(require.resolve('redux-persist/src/index.js'));

    const denodifiedPersist = replace(persistPath, {
      files: [ '**/*.js' ],
      patterns: [
        {
          match: /process\.env\.NODE_ENV/g,
          replacement: JSON.stringify(process.env.EMBER_ENV)
        },
        {
          match: /import isPlainObject from 'lodash\/isPlainObject'/g,
          replacement: "import lodash from 'lodash'\nconst isPlainObject = lodash.isPlainObject"
        }
      ]
    });


    let addon = this.addons.find(addon => addon.name === 'ember-cli-babel');
    let persistTree = addon.transpileTree(denodifiedPersist, {
      babel: {
        plugins: ['transform-object-rest-spread'],
        presets: ['stage-2']
      },
      'ember-cli-babel': {
        compileModules: false
      }
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
