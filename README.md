# typing-practice

## justification

Why another typing website?

1. No ads.
1. Values _accuracy_ first, then speed.

When you have to go back to the beginning every time you type the wrong key, the session becomes more like trying to land a trick on a skateboard, and less like grinding along on a treadmill.

It trains you to prioritize accuracy - nobody cares how fast you can run into a brick wall.

## how might I change this thing?

### choose-able text

### choose-able fonts

How would this work? Would the user paste in a google-fonts URL (would this even work)? Would you present a limited menu of options?

### "heat-map" of typing speed per character

Calculate time to stroke each key - use that duration to color in the typed characters.

This would (?) let the user look back and have a quick impression of where they sped up or slowed down.

### Avatar

Have like a little fighter avatar who kicks and punches the letters away as you chew through text.

When you type a wrong letter, the avatar gets knocked out.

## but before I try any of that...

Get all game logic out of the presentation layer.

- Smarts to know whether the right or wrong key was typed should reside in game reducer/fsm, not in Game component
- Presentation layer should say only as much as it knows (e.g. 'a key was pressed while the typing test was in focus', 'the reset button was pressed')
- Presentation layer should only know as much as it needs to. What does it need to know?
  1. The Game component should know the state of the FSM, because it will conditionally render things based on that info.
  1. ...
