import { defineConfig, presetAttributify, presetUno, presetMini } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetRemToPx({
      baseFontSize: 16,
    }),
    presetAttributify(),
    presetUno(),
    presetMini(),
  ],
  rules: [
    [
      'scroll-bar-base',
      {
        'scrollbar-width': 'thin',
        'scrollbar-color': 'transparent transparent',
      },
    ],
    [
      /^contain-intrinsic-size-(\d+)(.*)$/,
      (match) => ({
        'contain-intrinsic-size': `${match[1]}${match[2] || 'px'}`,
      }),
    ],
    [
      /^btg-(.+)\/(\d+)$/,
      ([_, color, opacity]) => ({
        'background-color': `rgb(var(--${color}) / ${parseInt(opacity) / 100})`,
      }),
    ],
    ['wrap-balance', { 'text-wrap': 'balance' }],
    [
      /^fz-(\d+)(.*)$/,
      (match) => ({
        'font-size': `${match[1]}${match[2] || 'px'}`,
      }),
    ],
    [
      /^grid-area-(.*)$/,
      (match) => ({
        'grid-area': match[1],
      }),
    ],
  ],
  safelist: ['underline'],
  shortcuts: [
    ['flex-c-c', 'flex items-center justify-center '],
    ['flex-c', 'flex items-center'],
    ['flex-c-sb', 'flex items-center justify-between '],
    ['flex-col-c', 'flex flex-col items-center'],
    ['flex-col-c-c', 'flex flex-col items-center justify-center'],
    ['flex-col-c-sb', 'flex flex-col items-center justify-between'],
    [
      /otext-(\d*)/,

      ([_, num]) => `overflow-hidden text-ellipsis line-clamp-${num} break-all`,
    ],
    [
      'seo-visible',
      'invisible w-0 h-0 overflow-hidden absolute select-none text-0',
    ],
    ['full-screen', 'w-100vw h-100vh w-100dvw h-100dvh'],

    // border
    [/^b-(\d+)-(.+)$/, ([_, size, color]) => `b-${size} b-${color} b-solid`],

    // size:
    ['ta-title-20', 'text-16 lh-24 fw-600 sm:text-20 sm:lh-28'],
    ['ta-title-16', 'text-14 lh-20 fw-600 sm:text-16 sm:lh-24'],
    ['ta-title-14', 'text-12 lh-16 fw-600 sm:text-14 sm:lh-20'],
    ['ta-title-12', 'text-11 lh-14 sm:text-12 sm:lh-16 fw-600'],
    ['ta-text-14', 'text-12 lh-16 fw-400 sm:text-14 sm:lh-20'],

    // animation
    ['animate-hourglass', 'animate-[hourglass_2s_ease-in-out_infinite]'],
  ],
  theme: {
    animation: {
      keyframes: {
        hourglass:
          '{0%{transform:rotate(0deg)}25%{transform:rotate(180deg)}50%{transform:rotate(180deg)}75%{transform:rotate(360deg)}100%{transform:rotate(360deg)}}',
      },
    },
    colors: {
      // new
      main: 'var(--color-main)',
      container: 'var(--color-container)',
      green: 'var(--color-green)',
      red: 'var(--color-red)',
      yellow: 'var(--color-yellow)',
      'yellow-container': 'var(--color-yellow-container)',
      vip: 'var(--color-vip)',
      'vip-container': 'var(--color-vip-container)',
      error: 'var(--color-error)',
      success: 'var(--color-success)',

      // text
      'text-primary': 'var(--text-primary)',
      'text-primary-reverse': 'var(--text-primary-reverse)',
      'text-secondary': 'var(--text-secondary)',
      'text-tertiary': 'var(--text-tertiary)',
      'text-disabled': 'var(--text-disabled)',
      'text-anti': 'var(--text-anti)',
      'text-link': 'var(--text-link)',
      'text-on-error': 'var(--brand-error)',
      'text-yellow': 'var(--brand-yellow)',

      // bg
      'bg-primary': 'var(--background-primary)',
      'bg-container': 'var(--color-container)',
      'bg-mask-primary': 'var(--mask-primary)',
      'bg-on-primary': 'var(--background-on-primary)',
      'bg-secondary': 'var(--background-secondary)',
      'bg-on-secondary': 'var(--background-on-secondary)',
      'bg-tertiary': 'var(--background-tertiary)',
      'bg-on-tertiary': 'var(--background-on-tertiary)',
      'bg-brand-container': 'var(--brand-container)',
      'bg-brand-error': 'var(--color-error-container)',

      // stroke
      'stroke-main': 'var(--color-main)',
      'stroke-primary': 'var(--stroke-primary)',
      'stroke-secondary': 'var(--stroke-secondary)',

      // mask
      'mask-button': 'var(--mask-button)',
      'mask-default': 'var(--mask-default)',
      'mask-pressed': 'var(--mask-pressed)',

      // fill
      'fill-default': 'var(--fill-default)',
      'fill-tooltip': 'var(--fill-tooltip)',
      'fill-light': 'var(--fill-light)',
      'brand-container': 'var(--brand-container)',

      //
      wechat: '#0FCE69',
      discord: '#5765F',
    },
  },
  blocklist: [/-?\[-?\d{1,}px\]$/, /font-(medium|semibold)$/],
})
