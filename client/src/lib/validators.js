export const isEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

export const isUrl = url =>
  new RegExp(
    '(https?://(?:www.|(?!www))[^s.]+.[^s]{2,}|www.[^s]+.[^s]{2,})'
  ).test(url);
