module.exports = {
  '*.{ts,tsx}': [
    'eslint --fix',
    () => 'tsc --noEmit',
    'vitest related --run',
  ],
}
