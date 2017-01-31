import Promise from 'es6-promise'; // for regenerator
import 'regenerator-runtime/runtime'; // only for tests, because async/await needs it

import BroccoliYamlToJson from '../';
import broccoli from 'broccoli';
import chai from 'chai';
import chaiFiles from 'chai-files';
import fixture from 'fixturify';
import fs from 'fs-extra';
import walkSync from 'walk-sync';

const { expect } = chai;
const { dir } = chaiFiles;

chai.config.truncateThreshold = 1000;
chai.use(chaiFiles);

describe('BroccoliYamlToJson', function() {
  const input = 'tmp/fixture-input';
  let node, pipeline;

  beforeEach(function() {
    fs.mkdirpSync(input);
    fixture.writeSync(input, {
      'foo.txt': 'foo.txt contents',
      'subdir': {
        'bar.txt': 'bar.txt contents'
      }
    });

    node = new BroccoliYamlToJson(input, {
      // Options
      include: ['**/*.yml']
    });

    pipeline = new broccoli.Builder(node);
  });

  afterEach(function() {
    fs.removeSync(input);
    return pipeline.cleanup();
  });

  describe("build", function() {
    it('simple', async function() {
      const { directory } = await pipeline.build();

      // Use expect + walkSync/file to verify the output of your build
      expect(dir(directory)).to.exist;
      expect(walkSync(directory)).to.deep.equal([]);
    });
  });

  describe('rebuild', function() {
    it('is stable on idempotent rebuild', async function() {
      let { directory } = await pipeline.build();

      let beforeStat = fs.statSync(directory);

      // Some filesystems dont have lower then 1s mtime resolution
      await new Promise(resolve => setTimeout(resolve, 1000));
      await pipeline.build();

      let afterStat = fs.statSync(directory);

      expect(beforeStat).to.deep.equal(afterStat);
    });
  });
});
