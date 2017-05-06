module.exports = {
  afterInstall: function () {
    return this.addPackagesToProject([
      {name: 'redux-persist', target: '4.8.0'}
    ])
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
}
