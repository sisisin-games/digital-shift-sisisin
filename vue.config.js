module.exports = {
  chainWebpack: config => {
    config.plugin('preload').tap(options => {
      options[0].include = 'allAssets'
      options[0].fileBlacklist = [/\.(map|mp4)$/]
      options[0].as = entry =>
        entry.startsWith('/css/') ? 'style' : entry.startsWith('/img/') ? 'image' : 'script'
      return options
    })
  },
}
