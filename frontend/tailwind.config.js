/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Material Design 3 - FUNSAMEZ Brand Colors
                primary: {
                    DEFAULT: '#C5A059',
                    light: '#D9BC7F',
                    dark: '#A68540',
                    container: '#FFEFD4',
                    'on-container': '#2B1700',
                },
                secondary: {
                    DEFAULT: '#2E5A88',
                    light: '#5A82AD',
                    dark: '#1E3D5C',
                    container: '#D3E4FF',
                    'on-container': '#001C38',
                },
                surface: {
                    DEFAULT: '#FFFBFF',
                    dark: '#1F1B16',
                    container: '#F3EDE7',
                    'container-high': '#EDE7E1',
                    'container-highest': '#E7E1DB',
                },
                error: {
                    DEFAULT: '#BA1A1A',
                    container: '#FFDAD6',
                    'on-container': '#410002',
                },
                success: {
                    DEFAULT: '#386A20',
                    container: '#B8F397',
                },
                warning: {
                    DEFAULT: '#7E5700',
                    container: '#FFDEA6',
                },
                outline: '#7D7667',
                'outline-variant': '#CEC5B4',
                'on-surface': '#1F1B16',
                'on-surface-variant': '#4D4639',
            },
            fontFamily: {
                sans: ['Roboto', 'system-ui', '-apple-system', 'sans-serif'],
            },
            fontSize: {
                // Material 3 Type Scale
                'display-large': ['57px', { lineHeight: '64px', letterSpacing: '-0.25px' }],
                'display-medium': ['45px', { lineHeight: '52px', letterSpacing: '0px' }],
                'display-small': ['36px', { lineHeight: '44px', letterSpacing: '0px' }],
                'headline-large': ['32px', { lineHeight: '40px', letterSpacing: '0px' }],
                'headline-medium': ['28px', { lineHeight: '36px', letterSpacing: '0px' }],
                'headline-small': ['24px', { lineHeight: '32px', letterSpacing: '0px' }],
                'title-large': ['22px', { lineHeight: '28px', letterSpacing: '0px' }],
                'title-medium': ['16px', { lineHeight: '24px', letterSpacing: '0.15px', fontWeight: '500' }],
                'title-small': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
                'label-large': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
                'label-medium': ['12px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
                'label-small': ['11px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
                'body-large': ['16px', { lineHeight: '24px', letterSpacing: '0.5px' }],
                'body-medium': ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
                'body-small': ['12px', { lineHeight: '16px', letterSpacing: '0.4px' }],
            },
            borderRadius: {
                'none': '0',
                'sm': '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '20px',
                '2xl': '24px',
                '3xl': '28px',
                'full': '9999px',
            },
            boxShadow: {
                'elevation-1': '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
                'elevation-2': '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
                'elevation-3': '0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
                'elevation-4': '0px 2px 3px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
                'elevation-5': '0px 4px 4px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },
        },
    },
    plugins: [],
}
