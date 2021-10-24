module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties",
    ["module-resolver", {
      extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js", ".json"],
      alias: {
        "~components": ["./src/components"],
        "~models": ["./src/models"],
        "~stores": ["./src/stores"],
        "~services": ["./src/services"],
        "~styles": ["./src/styles"],
        "~views": ["./src/views"],
      }
    }],
  ],
  "assumptions": {
    "setPublicClassFields": true,
    "privateFieldsAsProperties": true,
  }
};
