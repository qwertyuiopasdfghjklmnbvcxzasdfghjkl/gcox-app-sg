/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/)
let modules = []

files.keys().forEach(key => {
  if (key === './index.js') return
  modules = modules.concat(files(key).default)
})
// console.log(modules);
export default modules
