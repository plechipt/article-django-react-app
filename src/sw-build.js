const workboxBuild = require("workbox-build");
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  workboxBuild
    .injectManifest({
      globDirectory: "build",
      globPatterns: ["**/*.{png,jpg}"], // Precaching jpg and png files
      swSrc: "src/sw-template.js", // This is your sw template file
      swDest: "build/service-worker.js", // This will be created in the build step
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    })
    .catch(console.error);
};
buildSW();
