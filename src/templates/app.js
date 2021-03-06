module.exports = function(data) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=E6jlE9ANzK">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=E6jlE9ANzK">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=E6jlE9ANzK">
    <link rel="manifest" href="/site.webmanifest?v=E6jlE9ANzK">
    <link rel="mask-icon" href="/safari-pinned-tab.svg?v=E6jlE9ANzK" color="#2b5797">
    <link rel="shortcut icon" href="/favicon.ico?v=E6jlE9ANzK">
    <meta name="msapplication-TileColor" content="#2b5797">
    <meta name="theme-color" content="#ffffff">

    ${data.title}
    ${data.css}
  </head>
  <body>
    <div id="react-app">${data.content}</div>
    <script type="application/javascript" src="/scripts.js"></script>
  </body>
</html>
`;
};
