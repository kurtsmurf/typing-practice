# typing-practice

## Motivation

1. No ads.
1. Values _accuracy_ first, then speed.

When you have to go back to the beginning every time you type the wrong key, the session becomes more like trying to land a trick on a skateboard, and less like grinding along on a treadmill.

It trains you to prioritize accuracy - nobody cares how fast you can run into a brick wall.

## fix me

1. caps-lock indicator
1. "press any key to start": disabled mode for when returning from offline or starting from scratch.
1. focus reset button on game over (make focus transitions more intuitive in general)
1. special highlight when cursor reaches end of line (right now shows nothing)
1. show mis-typed key on failure
1. test contrast
1. handle text too large for screen

## wierd ideas

### choose-able fonts

serif vs. sans, monospace vs. variable-width

### "heat-map" of typing speed per character

Calculate time to stroke each key - use that duration to color in the typed characters.

This would (?) let the user look back and have a quick impression of where they sped up or slowed down.

how would the first character work? If heat = end_time - start_time, what is start time for the first character typed?

### avatar

Have like a little fighter avatar who kicks and punches the letters away as you chew through text (letters go flying).

When you type a wrong letter, the avatar gets knocked out.
