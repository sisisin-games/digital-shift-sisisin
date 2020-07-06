/** @type {import('purgecss').PurgeCSS['options']} */
const purgecssOptions = {
  whitelist: ['vsc-controller'],
}

module.exports = {
  plugins: {
    tailwindcss: {},
    'vue-cli-plugin-tailwind/purgecss': purgecssOptions,
    autoprefixer: {},
  },
}
