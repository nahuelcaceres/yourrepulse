module.exports = {

  pluginOptions: {
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  publicPath: process.env.NODE_ENV === 'production'
  ? '/yourrepulse/'
  : '/'
}

