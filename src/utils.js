export const accentNames = {
  'en-US': 'American English',
  'en-GB': 'British English',
  'en-AU': 'Australian English',
  'en-IN': 'Indian English'
};

export function getAccentLabel(locale) {
  return accentNames[locale] || accentNames['en-US'];
}

export function submitText(text) {
  const trimmed = text?.trim();
  if (!trimmed) {
    return {
      status: 'Enter text before sending.',
      submitted: false,
      text: ''
    };
  }

  return {
    status: 'Text submitted successfully.',
    submitted: true,
    text: trimmed
  };
}
