const defaults = {
  pattern: /{{\s?([^\s]+?)\s?}}/gi,
  replaceWith: "",
};

export function postcssReplace(opts = defaults) {
  const options = Object.assign({}, defaults, opts);
  const replacementArgs = [options.pattern, options.replaceWith];

  // @see http://api.postcss.org/
  return {
    postcssPlugin: 'postcss-replace',
    OnceExit(root) {
      root["walk"]((node) => {
        switch (node.constructor.name) {
          case 'Comment':
            node.text = node.text.replace(...replacementArgs);
            break;
          case 'Declaration':
            node.prop = node.prop.replace(...replacementArgs);
            node.value = node.value.replace(...replacementArgs);
            break;
          case 'AtRule':
            node.params = node.params.replace(...replacementArgs);
            break;
          case 'Rule':
            node.selector = node.selector.replace(...replacementArgs);
            break;
        }
      });
    }
  }
}

postcssReplace.postcss = true;
