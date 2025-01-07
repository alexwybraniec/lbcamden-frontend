import path from 'node:path'
// import { fileURLToPath } from 'node:url'
import yamlToJson from 'js-yaml'
import fs from 'fs'
import nunjucks from 'nunjucks'

function generateMacroOptions (file) {
  const json = convertYamlToJson({ path: file })
  let paramsJson

  if (json) {
    paramsJson = json.params // We only want the 'params' data from component yaml

    if (paramsJson) {
      // file.contents = JSON.stringify(paramsJson, null, 4)
      return JSON.stringify(paramsJson, null, 4)
    } else {
      console.error(file.path + ' is missing "params"')
    }
  }
}

function convertYamlToJson (file) {
  // const componentName = path.dirname(file.path).split(path.sep).slice(-1).toString()
  const componentPath = file.path// path.join(configPaths.components, componentName, `${componentName}.yaml`)
  let yaml

  try {
    yaml = fs.readFileSync(componentPath, { encoding: 'utf8', json: true })
  } catch (e) {
    console.error('ENOENT: no such file or directory: ', componentPath)
  }

  if (yaml) {
    return yamlToJson.safeLoad(yaml)
  }

  return false
}

function generateFixtures (file) {
  // console.log('####' + file + '@@@@')
  const json = convertYamlToJson({ path: file })
  const componentName = path.dirname(file).split(path.sep).slice(-1).toString()
  const componentTemplatePath = path.join(path.dirname(file), 'template.njk')

  if (json) {
    // console.log(json)
    const examplesJson = json.examples

    if (examplesJson) {
      const fixtures = {
        component: componentName,
        fixtures: []
      }

      examplesJson.forEach(function (example) {
        const fixture = {
          name: example.name,
          options: example.data,
          html: nunjucks.render(componentTemplatePath, { params: example.data }).trim(),
          hidden: Boolean(example.hidden)
        }

        fixtures.fixtures.push(fixture)
      })

      // file.contents = Buffer.from(JSON.stringify(fixtures, null, 4))
      return JSON.stringify(fixtures, null, 4)
    } else {
      console.error(' is missing "examples" and/or "params"')
    }
  }
}

export default function fixtures () {
  return {
    name: 'lbcamden-fixtures', // this name will show up in logs and errors
    //   resolveId ( source ) {
    //     if (source.endsWith('fixtures.yaml')) {
    //         // this signals that Rollup should not ask other plugins or check
    //         // the file system to find this id
    //         console.log("✅ resolveId:Source " + source)
    //         return source;
    //       }
    //     console.log(this.getFileName)
    //     return null; // other ids should be handled as usually
    //   },
    //   load ( id ) {
    //     // if (id === 'virtual-module') {
    //     //   // the source code for "virtual-module"
    //     //   return 'export default "This is virtual!"';
    //     // }
    //     console.log("🟨 load:ID " + id)
    //     return null; // other ids should be handled as usually
    //   },
    renderChunk: {
      order: 'post',
      handler (code, chunk) {
        // console.log("🟦" + JSON.stringify(chunk, null, 4));
        // console.log("AW: CHUNK: " + chunk.name);
        if (chunk.name.endsWith('fixtures.yaml')) {
          // this signals that Rollup should not ask other plugins or check
          // the file system to find this id
          this.emitFile({
            name: chunk.name + '-options',
            fileName: path.dirname(chunk.name) + '/macro-options.json',
            code: generateMacroOptions(chunk.facadeModuleId),
            type: 'prebuilt-chunk'
          })

          this.emitFile({
            name: chunk.name + '-fixture',
            fileName: path.dirname(chunk.name) + '/fixtures.json',
            code: generateFixtures(chunk.facadeModuleId),
            type: 'prebuilt-chunk'
          })

          // console.log("🟦" + JSON.stringify(chunk, null, 4));
          // code = generateFixtures(chunk.facadeModuleId);
          return null
        }
      }

    }
    // transform(code, id) {
    //   // console.log("🔴 CODE" + code)
    //   console.log("🔴 transform:ID " + id)

    //   return null;
    // },
    //   moduleParsed(moduleInfo) {
    //     console.log(moduleInfo)
    //   }
  }
}
