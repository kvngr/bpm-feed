module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // `jsxImportSource: "nativewind"` lets us use `className` on RN components.
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Reanimated 4 ships its Babel plugin from `react-native-worklets`.
    // It powers Reanimated *and* Moti, and must stay LAST in the list.
    plugins: ["react-native-worklets/plugin"],
  };
};
