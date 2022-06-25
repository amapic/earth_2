const withTM = require("next-transpile-modules")([
  "@react-three/cannon",
  "@react-three/fiber",
  "@react-three/drei",
]);

module.exports = withTM({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
      },
    });

    return config;
  },
});
