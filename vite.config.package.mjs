import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig } from 'vite'
import glob from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import del from 'rollup-plugin-delete'
import yaml from '@rollup/plugin-yaml'

import fixtures from './rollup-plugin-fixtures'

const { GlobSync: globSync } = glob

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  plugins: [
    yaml({
      safe:true,
      }),
      del({
        targets: ['package-vite/to-be-deleted'],
        hook: 'closeBundle',
        verbose: true
      }),
    fixtures(),
    viteStaticCopy({
      targets: [
        {
          src: 'package.json',
          dest: './'
        },
        {
          src: '../../dist/*',
          dest: './'
        },
        {
          src: '**/*.woff',
          dest: './lbcamden/'
        },
        {
          src: '**/*.woff2',
          dest: './lbcamden/'
        },
        {
          src: '**/*.jpg',
          dest: './lbcamden/'
        },
        {
          src: '**/*.png',
          dest: './lbcamden/'
        },
        {
          src: '**/*.webp',
          dest: './lbcamden/'
        },
        {
          src: '**/*.scss',
          dest: './lbcamden/'
        },
        {
          src: '**/*.xml',
          dest: './lbcamden/'
        },
        {
          src: '**/*.ico',
          dest: './lbcamden/'
        },
        {
          src: '**/manifest.json',
          dest: './lbcamden/'
        },
        {
          src: '**/*.njk',
          dest: './lbcamden/'
        },
        {
          src: ['**/*.js', '!**/*.test.js'],
          dest: './lbcamden/'
        },
        {
          src: ['**/*.map'],
          dest: './lbcamden/'
        },
        {
          src: 'README.md',
          dest: './'
        },
        {
          src: '**/components/**/README.md',
          dest: './lbcamden'
        }
      ],
      structured: true
    })
  ],
  root: 'src/lbcamden',
  emitIndex: false,
  build: {
    outDir: '../../package-vite',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      
      treeshake: false,
      input: {
        ...Object.fromEntries(
          globSync('./src/lbcamden/components/**/*.yaml').found.map(file => [
            // This remove `src/` as well as the file extension from each
            // file, so e.g. src/nested/foo.js becomes nested/foo
            path.relative(
              'src',
              file.slice(0, file.length - path.extname(file).length) + '-fixtures' + path.extname(file)
            ),
            // This expands the relative paths to absolute paths, so e.g.
            // src/nested/foo becomes /project/src/nested/foo.js
            fileURLToPath(new URL(file, import.meta.url))
          ])
        )
      },
      output: {
        manualChunks: false,
        inlineDynamicImports: false,
        // generatedCode: "es2015",
        entryFileNames: function (file) {

          //AW: Haven't found a way to not output these files once parsed, so putting them in a dir and then deleting after build
          if (file.name.endsWith('yaml')) {
            return 'to-be-deleted/' + path.dirname(file.name) + '.yaml'
          }
          return 'to-be-deleted/[name].js'
        },
        // assetFileNames: function (file) {

        //   return 'to-be-deleted/[name].[ext]'
        // }

      }
    }
  }

})
