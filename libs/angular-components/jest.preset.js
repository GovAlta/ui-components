const basePreset = require('../../jest.preset.js');
const angularPreset = require('jest-preset-angular');

module.exports = { ...basePreset, ...angularPreset }
