import { describe, expect, it } from 'vitest';
import { getAccentLabel } from './utils.js';

describe('getAccentLabel', () => {
  it('returns the correct label for supported locales', () => {
    expect(getAccentLabel('en-GB')).toBe('British English');
    expect(getAccentLabel('en-AU')).toBe('Australian English');
  });

  it('falls back to American English for unknown locale', () => {
    expect(getAccentLabel('fr-FR')).toBe('American English');
  });
});
