module.exports = {
  darkMode: 'class', // Enable dark mode via class strategy
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind colors
        primary: 'var(--primary)',
        'bg-main': 'var(--bg-primary)',
        'bg-card': 'var(--card-bg)',
        'border-main': 'var(--border-color)',
      }
    },
  },
}
