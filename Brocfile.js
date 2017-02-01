var babel = require('broccoli-babel-transpiler');
var merge = require('broccoli-merge-trees');
var lint = require('broccoli-lint-eslint');
var stew = require('broccoli-stew');
var Funnel = require('broccoli-funnel');
var mv = stew.mv;

// module.exports = merge([
//   mv(babel(lint('tests')), 'tests'),
//   babel(lint('src')),
// ]);
var YAML = require('.');
var yamls = stew.log(new Funnel('fixtures'));
var jsons = stew.log(new YAML('fixtures'));
module.exports = jsons;