// St. Mary's School, Jorhat — Official Design Token System
// Grounded in academic heritage, architectural warmth, and disciplined color proportion.

export const COLOR_TOKENS = {
  light: {
    primary: '#513047',        // Heritage Plum
    primaryHover: '#412338',   // Deep Plum
    secondary: '#B87882',      // Dusted Rose
    background: '#F7F3EA',     // Warm Ivory
    surface: '#FFFFFF',        // Pure White
    surfaceAlt: '#E9DFCF',     // Parchment
    textPrimary: '#30252A',    // Deep Espresso
    textSecondary: '#68646A',  // Muted Slate
    textMuted: '#8C868E',      // Soft Slate
    accent: '#B89458',         // Antique Brass
    border: '#D8CCBC',         // Subtle Parchment Border
    borderHairline: 'rgba(48, 37, 42, 0.10)',
    borderStrong: 'rgba(48, 37, 42, 0.22)',
    success: '#557A61',
    warning: '#A77A42',
    error: '#A34F55',
  },
  dark: {
    primary: '#B87882',        // Dusted Rose
    primaryHover: '#CA8993',
    secondary: '#513047',      // Heritage Plum
    background: '#21191E',     // Deep Plum Obsidian
    surface: '#30252A',        // Deep Espresso Surface
    secondarySurface: '#3C2934', // Secondary Plum Surface
    textPrimary: '#F7F3EA',    // Warm Ivory
    textSecondary: '#D1C7C5',  // Soft Ash Rose
    textMuted: '#9B9093',
    accent: '#C7A76B',         // Antique Brass Warm
    border: '#453840',         // Subdued Plum Border
    borderHairline: 'rgba(247, 243, 234, 0.12)',
    borderStrong: 'rgba(247, 243, 234, 0.22)',
    success: '#6C967A',
    warning: '#C49655',
    error: '#BA6269',
  },
} as const;
