const StyleDictionary = require("style-dictionary");

function generate(outputPath) {
  // Typography
  StyleDictionary.registerTransform({
    name: "typography/shorthand",
    type: "value",
    transitive: true,
    matcher: function (token) {
      return token.type === "typography";
    },
    transformer: function (token) {
      const { fontWeight, fontSize, lineHeight, fontFamily } =
        token.original.value;
      return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
    },
  });

  // Drop Shadow
  StyleDictionary.registerTransform({
    name: "box-shadow",
    type: "value",
    transitive: true,
    matcher: function (token) {
      return token.type === "boxShadow";
    },
    transformer: function (token) {
      const toPx = (value) => {
        if (value === 0 || value === "0") return "0px";
        if (typeof value === "number") return `${value}px`;
        if (typeof value !== "string") return value;
        if (/^-?\d+(\.\d+)?$/.test(value)) return `${value}px`;
        return value;
      };

      const formatLayer = (layer) => {
        const { x, y, blur, spread, color } = layer;
        return `${toPx(x)} ${toPx(y)} ${toPx(blur)} ${toPx(spread)} ${color}`;
      };

      // If original is themed { light, dark }, value/themed-* has already
      // picked the active mode and stored it on token.value. Read from there.
      let value = token.original.value;
      if (
        value &&
        typeof value === "object" &&
        Object.prototype.hasOwnProperty.call(value, "light") &&
        Object.prototype.hasOwnProperty.call(value, "dark")
      ) {
        value = token.value;
      }

      // Already formatted (transitive re-run on a string result).
      if (typeof value === "string") return value;

      if (Array.isArray(value)) {
        return value.map(formatLayer).join(", ");
      }

      return formatLayer(value);
    },
  });

  // Border
  StyleDictionary.registerTransform({
    name: "border",
    type: "value",
    transitive: true,
    matcher: function (token) {
      return token.type === "border";
    },
    transformer: function (token) {
      // Mirror box-shadow: if the original value is themed { light, dark },
      // value/themed-* has already picked the active mode onto token.value.
      let value = token.original.value;
      if (
        value &&
        typeof value === "object" &&
        Object.prototype.hasOwnProperty.call(value, "light") &&
        Object.prototype.hasOwnProperty.call(value, "dark")
      ) {
        value = token.value;
      }

      // Already formatted (transitive re-run on a string result).
      if (typeof value === "string") return value;

      const { color, width, style } = value;
      return `${width} ${style} ${color}`;
    },
  });

  // Font Variation Settings
  StyleDictionary.registerTransform({
    name: "fontVariationSettings",
    type: "value",
    transitive: true,
    matcher: function (token) {
      return token.type === "fontVariationSettings";
    },
    transformer: function (token) {
      const settings = token.original.value;
      return Object.entries(settings)
        .map(([key, value]) => `${key} ${value}`)
        .join(", ");
    },
  });

  // Themed value: tokens with shape { light, dark } resolve to one mode per build.
  // Two transforms (one per mode) avoids passing mode through SD's platformConfig.
  const isThemed = (token) => {
    const v = token.original.value;
    return (
      v &&
      typeof v === "object" &&
      Object.prototype.hasOwnProperty.call(v, "light") &&
      Object.prototype.hasOwnProperty.call(v, "dark")
    );
  };

  StyleDictionary.registerTransform({
    name: "value/themed-light",
    type: "value",
    transitive: true,
    matcher: isThemed,
    transformer: function (token) {
      return token.original.value.light;
    },
  });

  StyleDictionary.registerTransform({
    name: "value/themed-dark",
    type: "value",
    transitive: true,
    matcher: isThemed,
    transformer: function (token) {
      return token.original.value.dark;
    },
  });

  StyleDictionary.registerFormat({
    name: "css/variables-dark",
    formatter: function ({ dictionary }) {
      const lines = [];
      dictionary.allTokens.forEach(function (token) {
        const v = token.original.value;
        const isThemed =
          v &&
          typeof v === "object" &&
          Object.prototype.hasOwnProperty.call(v, "light") &&
          Object.prototype.hasOwnProperty.call(v, "dark");

        if (isThemed && v.light !== v.dark) {
          lines.push(`  --${token.name}: ${token.value};`);
          return;
        }

        if (Object.prototype.hasOwnProperty.call(token.original, "dark")) {
          // dark field is emitted verbatim; use literal hex or raw CSS
          // (e.g. "var(--goa-color-surface-input)") since SD's reference
          // resolver does not walk custom fields.
          lines.push(`  --${token.name}: ${token.original.dark};`);
        }
      });

      return [
        "/**",
        " * Do not edit directly",
        " * Generated dark theme overrides",
        " */",
        "",
        ':root[data-theme="dark"] {',
        "  color-scheme: dark;",
        ...lines,
        "}",
        "",
      ].join("\n");
    },
  });

  try {
    StyleDictionary.extend({
      source: [`./data/**/*.json`],
      platforms: {
        scss: {
          prefix: "goa",
          transforms: [
            "value/themed-light",
            ...StyleDictionary.transformGroup.scss,
            "typography/shorthand",
            "box-shadow",
            "border",
            "fontVariationSettings",
          ],
          buildPath: `${outputPath}/dist/`,
          files: [
            {
              destination: "tokens.scss",
              format: "scss/variables",
            },
          ],
        },
        css: {
          prefix: "goa",
          transforms: [
            "value/themed-light",
            ...StyleDictionary.transformGroup.css,
            "typography/shorthand",
            "box-shadow",
            "border",
            "fontVariationSettings",
          ],
          buildPath: `${outputPath}/dist/`,
          files: [
            {
              destination: "tokens.css",
              format: "css/variables",
              options: {
                outputReferences: true,
              },
            },
          ],
        },
        "css-dark": {
          prefix: "goa",
          transforms: [
            "value/themed-dark",
            ...StyleDictionary.transformGroup.css,
            "typography/shorthand",
            "box-shadow",
            "border",
            "fontVariationSettings",
          ],
          buildPath: `${outputPath}/dist/`,
          files: [
            {
              destination: "dark-theme.css",
              format: "css/variables-dark",
            },
          ],
        },
      },
    }).buildAllPlatforms();
  } catch (e) {
    console.error("ERROR", e.message);
  }
}

module.exports = {
  generate: generate,
};
