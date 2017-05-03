import { test, module } from 'qunit';
import { persistStore } from 'redux-persist';

module('redux persist export tests');

test('exports function', function(assert) {
  assert.equal(typeof persistStore, 'function');
});
