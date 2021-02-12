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


describe('markdown-it-hashtag', function () {
  let md;

  beforeEach(function () {
    md = new markdownit({
      html: true,
      langPrefix: '',
      typographer: true,
      linkify: true
    });
  });

  it('applies markup to hashtags', function () {
    md.use(plugin);
    generate(path.join(__dirname, 'fixtures/hashtag/default.txt'), md);
  });

  it('accepts options', function () {
    md.use(plugin, {
      hashtagRegExp: '[\\x0080-\\xFFFF\\w\\-]+|<3',
      preceding: '^|\\s'
    });
    generate(path.join(__dirname, 'fixtures/hashtag/options.txt'), md);
  });
});
