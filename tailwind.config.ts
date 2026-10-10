import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2.5rem' }, screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        success: { DEFAULT: 'hsl(var(--success))', foreground: 'hsl(var(--success-foreground))' },
        warning: { DEFAULT: 'hsl(var(--warning))', foreground: 'hsl(var(--warning-foreground))' },
        info: { DEFAULT: 'hsl(var(--info))', foreground: 'hsl(var(--info-foreground))' },
        madeira: 'hsl(var(--madeira))',
        'madeira-forte': 'hsl(var(--madeira-forte))',
        couro: 'hsl(var(--couro))',
        deep: 'hsl(var(--deep))',
      },
      borderRadius: { card: 'var(--radius-card)', modal: 'var(--radius-modal)' },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Hanken Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        data: ['Martian Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-lg': ['clamp(2.5rem, 6.4vw, 5.25rem)', { lineHeight: '0.94', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 5.2vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 3.2vw, 2.125rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
      },
      transitionTimingFunction: { entering: 'var(--ease-entering)', exiting: 'var(--ease-exiting)' },
      keyframes: { 'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } } },
      animation: { 'fade-in': 'fade-in 0.4s var(--ease-entering) both' },
    },
  },
  plugins: [],
} satisfies Config
