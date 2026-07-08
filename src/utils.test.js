import { describe, expect, it } from 'vitest';
import { getAccentLabel, submitText, validateAssetPath } from './utils.js';

describe('getAccentLabel', () => {
  it('returns the correct label for supported locales', () => {
    expect(getAccentLabel('en-GB')).toBe('British English');
    expect(getAccentLabel('en-AU')).toBe('Australian English');
  });

  it('falls back to American English for unknown locale', () => {
    expect(getAccentLabel('fr-FR')).toBe('American English');
  });
});

describe('submitText', () => {
  it('returns an error status when text is empty', () => {
    expect(submitText('')).toEqual({
      status: 'Enter text before sending.',
      submitted: false,
      text: ''
    });
  });

  it('returns success when text is present', () => {
    expect(submitText('  hello world  ')).toEqual({
      status: 'Text submitted successfully.',
      submitted: true,
      text: 'hello world'
    });
  });
});

describe('validateAssetPath', () => {
  it('accepts relative paths starting with ./', () => {
    expect(validateAssetPath('./sw.js')).toBe(true);
    expect(validateAssetPath('./manifest.webmanifest')).toBe(true);
  });

  it('accepts absolute paths starting with /', () => {
    expect(validateAssetPath('/sw.js')).toBe(true);
  });

  it('rejects invalid paths', () => {
    expect(validateAssetPath('')).toBe(false);
    expect(validateAssetPath(null)).toBe(false);
    expect(validateAssetPath('sw.js')).toBe(false);
  });
});
