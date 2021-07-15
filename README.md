# typing-practice

## motivation

1. No ads.
1. Values _accuracy_ first, then speed.

When you have to go back to the beginning every time you type the wrong key, the session becomes more like trying to land a trick on a skateboard, and less like grinding along on a treadmill.

It trains you to prioritize accuracy - nobody cares how fast you can run into a brick wall.

## to do 

1. make game surface focusable, only accept input when it has focus
1. ~~when cursor reaches space at end of line, highlight from end-of-current-line to offscreen-right, and from offscreen-left to beginning-of-next-line~~ used ::after pseudo-class for cursor on space instead
1. handle text too large for screen
1. ~~focus reset button on game over (make focus transitions more intuitive in general)~~
1. ~~show mis-typed key on lose~~
1. show streak count
1. remember custom text from the last session
1. show spinner while loading
1. ?? apply color to percent and cursor based on progress
1. ~~caps-lock indicator~~
1. ~~"press any key to start": disabled mode for when returning from offline or starting from scratch.~~

## ideas

### choose-able fonts

serif vs. sans, monospace vs. variable-width

### "heat-map" of typing speed per character

Calculate time to stroke each key - use that duration to color in the typed characters.

Lets the user look back and have a quick impression of where they sped up or slowed down.

### avatar

Have like a little fighter avatar who kicks and punches the letters away as you chew through text (letters go flying).

When you type a wrong letter, the avatar gets knocked out.
