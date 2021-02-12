/* eslint-env mocha, es6 */

import path from 'path';
import fs from 'fs';
import assert from 'assert';

import markdownit from '@gerhobbelt/markdown-it';
import generate from '@gerhobbelt/markdown-it-testgen';

import { fileURLToPath } from 'url';

// see https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_no_require_exports_module_exports_filename_dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import plugin from '../index.js';


function normalize(text) {
  return text.replace(/<blockquote>\n<\/blockquote>/g, '<blockquote></blockquote>');
}

function altGenerate(p, md) {
  generate.load(p, function (data) {
    let desc;
    data.meta = data.meta || {};
    desc = data.meta.desc || path.relative(p, data.file);
    (data.meta.skip ? describe.skip : describe)(desc, function () {
      data.fixtures.forEach(function (fixture) {
        it(fixture.header ? fixture.header : 'line ' + (fixture.first.range[0] - 1), function () {
          assert.strictEqual(md.render(fixture.first.text), normalize(fixture.second.text));
        });
      });
    });
  });
}

describe('CommonMark', function () {
  const md = new markdownit('commonmark');
  md.use(plugin);
  altGenerate(path.join(__dirname, 'fixtures/vendor/commonmark/good.txt'), md);
});
