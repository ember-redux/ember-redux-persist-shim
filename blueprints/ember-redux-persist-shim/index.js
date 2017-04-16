module.exports = {
  afterInstall: function () {
    return this.addPackagesToProject([
      {name: 'redux-persist', target: '4.6.0'}
    ])
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
}
