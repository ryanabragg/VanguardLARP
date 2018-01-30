export default function(data) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${data.title || 'Vanguard LARP - Lenoir NC'}</title>
    ${data.css}
  </head>
  <body>
    <div id="react-app">${data.content}</div>
    <script type="application/javascript" src="/scripts.js"></script>
  </body>
</html>
`
}
