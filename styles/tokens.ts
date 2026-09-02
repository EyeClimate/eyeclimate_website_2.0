// EyeClimate Design Tokens
// Extracted from Style Guide · EyeClimate Handoff.png

export const colors = {
  // Backgrounds
  bgPage: '#0A0A0D',
  bgSectionAlt: '#0B0B09',
  bgCard: '#121417',
  bgCardInset: '#0F1214',

  // Text
  textPrimary: '#F2F7FA',
  textMuted: '#A6ADB3',
  textDim: '#6B7378',
  textInverse: '#0A0A0D',

  // Accent Green
  accentGreen: '#A5FD52',
  accentGreen14: 'rgba(165, 253, 82, 0.14)',
  accentGreen10: 'rgba(165, 253, 82, 0.10)',
  accentGreen06: 'rgba(165, 253, 82, 0.06)',

  // Semantic
  statusSuccess: '#A5FD52',
  statusWarning: '#F6B26B',
  statusAlert: '#FF7070',
  statusNeutral: '#6B7378',

  // Borders & Strokes
  borderSubtle: 'rgba(255, 255, 255, 0.06)',
  borderStrong: 'rgba(255, 255, 255, 0.10)',
  borderAccent: 'rgba(165, 253, 82, 0.50)',
  divider: 'rgba(255, 255, 255, 0.08)',
} as const;

export const typography = {
  fontFamily: 'var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  display: {
    fontSize: '88px',
    lineHeight: '1.0',
    letterSpacing: '-0.03em',
    fontWeight: '600',
  },
  h1: {
    fontSize: '56px',
    lineHeight: '1.1',
    letterSpacing: '-0.03em',
    fontWeight: '600',
  },
  h2: {
    fontSize: '48px',
    lineHeight: '1.15',
    letterSpacing: '-0.03em',
    fontWeight: '600',
  },
  h3: {
    fontSize: '36px',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    fontWeight: '600',
  },
  h4: {
    fontSize: '24px',
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
    fontWeight: '600',
  },
  h5: {
    fontSize: '20px',
    lineHeight: '1.35',
    letterSpacing: '0',
    fontWeight: '600',
  },
  bodyLg: {
    fontSize: '18px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
  },
  body: {
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
  },
  bodySm: {
    fontSize: '14px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
  },
  bodyXs: {
    fontSize: '13px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
  },
  caption: {
    fontSize: '12px',
    lineHeight: '1.4',
    letterSpacing: '0.02em',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
  },
  label: {
    fontSize: '11px',
    lineHeight: '1.4',
    letterSpacing: '1.5px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
  },
  micro: {
    fontSize: '10px',
    lineHeight: '1.4',
    letterSpacing: '1.5px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
  },
  tiny: {
    fontSize: '9px',
    lineHeight: '1.4',
    letterSpacing: '1px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
  },
} as const;

export const spacing = {
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  32: '32px',
  40: '40px',
  60: '60px',
  80: '80px',
  100: '100px',
  132: '132px',
} as const;

export const radii = {
  xs: '4px',    // chips, badges, dividers
  sm: '6px',    // buttons, pill controls
  md: '8px',    // illustration panels
  lg: '12px',   // cards, content containers
  xl: '16px',   // feature cards, hero panels
  full: '9999px',
} as const;

export const layout = {
  canvasWidth: '1440px',
  contentWidth: '1176px',
  gutterWidth: '132px',
} as const;
