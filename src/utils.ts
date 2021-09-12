export function isValidKeyEvent(e: KeyboardEvent) {
  if (e.altKey || e.ctrlKey || e.metaKey) return;

  return (e.keyCode > 47 && e.keyCode < 58) || // numbers
    e.keyCode == 32 || // spacebar
    // e.keyCode == 13 || // return
    (e.keyCode > 64 && e.keyCode < 91) || // letters
    (e.keyCode > 95 && e.keyCode < 112) || // numpad numbers
    (e.keyCode > 185 && e.keyCode < 193) || // ;=,-./`
    (e.keyCode > 218 && e.keyCode < 223); // [\]'
}
