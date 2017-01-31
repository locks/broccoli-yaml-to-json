import Plugin from 'broccoli-plugin';
import FSTree from 'fs-tree-diff'; // eslint-disable-line no-unused-vars
import heimdall from 'heimdalljs'; // eslint-disable-line no-unused-vars
import { default as _logger } from 'heimdalljs-logger';

const logger = _logger('broccoli-yaml-to-json'); // eslint-disable-line no-unused-vars
// const yaml = require('js-yaml');

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
    // The build logic of your plugin goes here
    // Read files from this.inputPaths, and write files to this.outputPath.
    // Silly example:

    this.inputPaths.forEach(a => console.log("->>> " + a + "\n"));
    // var doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
// yaml.safeLoadAll(data, function (doc) {
// });


    // // Read 'foo.txt' from the third input node
    // var inputBuffer = fs.readFileSync(path.join(this.inputPaths[2], 'foo.txt'));
    // var outputBuffer = someCompiler(inputBuffer);
    // // Write to 'bar.txt' in this node's output
    // fs.writeFileSync(path.join(this.outputPath, 'bar.txt'), outputBuffer);

    // yaml2json(inputBuffer);
  }
}
