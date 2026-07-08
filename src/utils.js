export const accentNames = {
  'en-US': 'American English',
  'en-GB': 'British English',
  'en-AU': 'Australian English',
  'en-IN': 'Indian English'
};

export function getAccentLabel(locale) {
  return accentNames[locale] || accentNames['en-US'];
}
