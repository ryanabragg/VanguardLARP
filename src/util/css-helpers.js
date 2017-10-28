import Color from 'color';

export function colorOnBackground (background, alphaLight, alphaDark) {
  let backgroundColor = Color(background);
  let base = Color(backgroundColor.dark() ? 'white' : 'black');
  let alpha = backgroundColor.light() ? alphaDark : alphaLight;
  return base.mix(backgroundColor, alpha).hex();
}