export function isValidKeyEvent(e) {
  const modifierPressed = (e) => e.altkey || e.ctrlKey || e.metaKey;
  const isPrintableCharacter = ({ keyCode }) =>
    (keyCode > 47 && keyCode < 58) || // numbers
    keyCode == 32 || // spacebar
    keyCode == 13 || // return
    (keyCode > 64 && keyCode < 91) || // letters
    (keyCode > 95 && keyCode < 112) || // numpad numbers
    (keyCode > 185 && keyCode < 193) || // ;=,-./`
    (keyCode > 218 && keyCode < 223); // [\]'

  return !modifierPressed(e) && isPrintableCharacter(e);
}
