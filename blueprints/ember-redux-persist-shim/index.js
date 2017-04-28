module.exports = {
  afterInstall: function () {
    return this.addPackagesToProject([
      {name: 'redux-persist', target: '4.7.1'},
      {name: 'babel-preset-stage-2', target: '6.24.1'}
    ])
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
}
