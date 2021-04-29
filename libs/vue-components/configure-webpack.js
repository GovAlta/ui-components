// This is a magic file used as configureWebpack in the Vue cli options by
// @nx-plus/vue
//
// Note that it is picked up by both build-lib and build-experimental targets
// in the vue-components project since the plugin simply looks at the root of
// the project.
//
// This file cannot override entry or output webpack configuration since vue
// cli will directly set those based on options provided to it.

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (config) => {

  // For the 'experimental' target, replace the copy plugin to copy a different
  // package.json file into the submodule.
  if (config.output.path.endsWith('experimental')) {
    const pluginIndex = config.plugins.findIndex(
      plugin => plugin.constructor.name === 'CopyPlugin'
    );
    if (pluginIndex >= 0) {
      const plugin = config.plugins[pluginIndex];
      config.plugins.splice(
        pluginIndex,
        1,
        new CopyPlugin({
          patterns: [{
            from: plugin.patterns[0].from.replace('package.json', 'package.exp.json'),
            to: path.join(plugin.patterns[0].to, 'package.json')
          }]
        })
      )
    }
  }
}
