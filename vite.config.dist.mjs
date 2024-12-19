import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig } from 'vite'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

// import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  plugins: [
    // libAssetsPlugin({ 
    //   limit:0,
    //   name: '[name].[ext]'
    // }),
    viteCommonjs(),
    viteStaticCopy({
      targets: [
        {
          src: 'assets/images/*',
          dest: ''
        }
      ],
      structured: true
    }),
    viteStaticCopy({
      targets: [
        {
          src: '../../node_modules/govuk-frontend/govuk/all.js',
          dest: '',
          rename: 'govuk-frontend-4.7.0.min.js'
        }
      ],
      structured: false

    })
  ],
  root: 'src/lbcamden',
  emitIndex: false,
  build: {
    outDir: '../../dist',
    // minify: true,
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
    // publicDir: 'assets',
    // emitAssets:true,
    // assetsInlineLimit: 0,
    lib:{
      entry: {
        // govuk_js: '../../node_modules/govuk-frontend/govuk/all.js',
        lbcamden_js: './all.js',
        // lbcamden_css: './all.scss',
      },
      formats: ['es'],

      fileName: (format, entryName) => {

          

          if (entryName === 'lbcamden_js') {
            return 'lbcamden-frontend-' + (process.env.npm_package_version) + '.min.js'
          }

          // if (entryName === 'govuk_js') {
          //   return 'govuk-frontend-4.7.0.min.js' // AW: MUST FIX: MAGIC STRING
          // }

          // if (entryName === 'lbcamden_css') {
          //   console.log("AAA" + entryName)
          //   return 'lbcamden-frontend-' + (process.env.npm_package_version) + '.min.css'
          // }

        return 'lbcamden-frontend-' + (process.env.npm_package_version) + '.min.js'
      },
      // cssFileName: 'lbcamden-frontend-' + (process.env.npm_package_version),
    },
    // rollupOptions: {
    //   output: {
    //     assetFileNames: 'lbcamden-frontend-' + (process.env.npm_package_version) + '.min.[ext]'
    //   },
    // },
    // rollupOptions: {
      
    //   treeshake: false,
    //   input: {
    //     // govuk_js: './node_modules/govuk-frontend/govuk/all.js',
    //     // lbcamden_js: './src/lbcamden/all.js',
    //     lbcamden_css: './src/lbcamden/all.scss',
    //   },
    //   output: {
    //     manualChunks: false,
    //     // generatedCode: 'es2015',
    //     // format: 'es',
    //     entryFileNames: function (file) {

    //       if (file.name === 'lbcamden_js') {
    //         return 'lbcamden-frontend-' + (process.env.npm_package_version) + '.min.js'
    //       }

    //       if (file.name === 'govuk_js') {
    //         return 'govuk-frontend-4.7.0.min.js' // AW: MUST FIX: MAGIC STRING
    //       }

    //       return 'unknown-entry/[name]'
    //     },
    //     assetFileNames: function (file) {

    //       // Rename CSS output
    //       if (file.name === 'lbcamden_css.css') {
    //         return 'lbcamden-frontend-' + (process.env.npm_package_version) + '.min.css'
    //       }

    //       // Handle fonts parsed by scss
    //       if (file.name.endsWith('woff') || file.name.endsWith('woff2')) {
    //         return 'assets/fonts/[name].[ext]'
    //       }

    //       return 'assets/[name].[ext]'
    //     }

    //   }
    // }
  }

})
