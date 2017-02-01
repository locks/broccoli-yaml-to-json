import Plugin from 'broccoli-plugin';
import FSTree from 'fs-tree-diff'; // eslint-disable-line no-unused-vars
import heimdall from 'heimdalljs'; // eslint-disable-line no-unused-vars
import { default as _logger } from 'heimdalljs-logger';

const logger = _logger('broccoli-yaml-to-json'); // eslint-disable-line no-unused-vars
const yaml = require('js-yaml');

function yamlDirtoJson(inputDir, outputDir) {
  var fs = require('fs');
  var path = require('path');
  var files = fs.readdirSync(inputDir);

  for (var i in files) {
    if (path.extname(files[i]) === ".yml") {
      var inputPath = path.join(inputDir, files[i]);
      var outputPath = path.join(outputDir, path.basename(files[i], '.yml')) + '.json';

      var convertedFile = yaml.safeLoad(fs.readFileSync(inputPath,'utf8'));
      fs.writeFileSync(outputPath, JSON.stringify(convertedFile, null, '\t'));
    }
  }
}

export default class BroccoliYamlToJson extends Plugin {
  constructor(node, options = {}) {
    super([node], {
      name: options.name,
      annotation: options.annotation,
      persistentOutput: true
    });

    // Save references to options you may need later
  }

  build() {
    yamlDirtoJson(this.inputPaths[0], this.outputPath);
  }
}
