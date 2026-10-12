const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 5174, // Ubah ke port baru yang diinginkan
  },
});
