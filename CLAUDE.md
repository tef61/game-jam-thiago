<!-- Claude Code reads this file. It is the same as AGENTS.md. If you change one, change both. -->

# AGENTS.md: rules for the AI agent building this game

You are helping a University of Miami architecture student build a small
multiplayer party game in about 60 minutes. Players use their phones as
controllers. One laptop shows the game on a projector. The student is
not a programmer: explain things in plain language, keep steps short,
and keep moving. Speed matters more than perfection.

## Read first
1. `GAME_BRIEF.md` is the client's brief. Build what it says. If something
   important is missing, make a sensible choice and say what you chose.
   If the brief asks for name suggestions, give 5.
2. Build the **"V1 must have"** answer first. Get it working end to end
   before adding anything else.
3. The top comment of `engine.js` explains the API. The global object is
   **`Jam`**: `Jam.host`, `Jam.join`, `room.send`, `room.sendTo`,
   `me.send`, `Jam.sound`. The Dot Race demo in `screen-game.js` and
   `play-game.js` shows every piece in use.

## Files you may change
- `screen-game.js`: the big screen. The game state and rules live here.
- `play-game.js`: the phone controller.
- `game.css`: the look of both pages.
- `screen.html` and `play.html`: you may add markup and add `<script>`
  tags for files in `lib/`, placed BEFORE `screen-game.js` /
  `play-game.js`. Keep the elements `#join-panel`, `#stage`, `#join-form`,
  `#phone`, `#me-tag`, `#controls`, and keep the existing script tags in
  their order.
- You may add new `.js` or `.css` files in this folder (link them with
  plain `<script src>` / `<link>` tags) and simple SVG drawn in code.

## Never change
- `engine.js`, `engine.css`, anything in `lib/`. They handle joining,
  room codes, the QR code and the connection. If you think the engine has
  a bug, tell the student instead of editing it.
- `config.js`, except to paste the Supabase Project URL and publishable key
  when the student asks. Never print the key back in full.
- Never put a secret key (`sb_secret_...`) or `service_role` key anywhere.
- Don't create database tables. This game uses live messages only.
- Don't rename or move files, and don't create subfolders for code.

## It must work by double-clicking screen.html
Students open the pages straight from the folder (a `file://` address),
not through a web server. So:
- **No ES modules:** no `import` / `export`, no `<script type="module">`.
  Use plain `<script src="...">` tags and plain functions.
- **No `fetch()` of local files** (JSON, text, models). Put data directly
  in the JavaScript, e.g. `var QUESTIONS = [ ... ];`.
- **No CDNs or outside libraries.** Already in `lib/`, ready to use:
  - `lib/three.min.js` (three.js r149, global `THREE`) for 3D
  - `lib/matter.min.js` (Matter.js 0.20, global `Matter`) for 2D physics
  Add the script tag to the page that needs it, before the game script.
- No npm, no build step, no frameworks, no TypeScript.
- Don't start a web server and don't ask the student to. To test, they
  double-click `screen.html`.
- No API keys, no logins, no AI calls, no outside services.

## How the game must work
- **The screen is the referee.** It holds the score, the turn, the timer
  and decides who wins. Phones only send moves (`me.send`) and show what
  the screen tells them (`onMessage`).
- **Speed limit.** At most 5 messages per second per message TYPE from each
  phone, 10 from the screen. If one type is sent again too fast, only the
  LATEST is delivered. So:
  - each type means "the latest value of X": send a running total
    (taps), the current value (slider), or the whole current state;
  - never send two different events with the same type back to back:
    use different types (e.g. "phase", "result", "question");
  - send when something changes, never every animation frame;
  - animate smoothly on the screen between updates.
- **Rounds.** Put a round number in your phase messages and ignore moves
  from an earlier round (see the Dot Race demo).
- **2 to 4 players.** `maxPlayers` in `Jam.host` sets the seats. Extra
  people join as spectators (`player.role === "spectator"`).
- **Late joiners and reloads.** A phone that reloads or rejoins triggers
  `onPlayerReturn`: send it the current phase/state again, as the demo does.
- **Start button on the screen** that also calls `Jam.sound.unlock()`
  (browsers block sound until a click). Hide the join panel during play
  with `room.showJoin(false)` and bring it back afterwards.
- **Play again** without reloading the page.

## Design rules
- Projector: big text, strong contrast, readable from the back row.
- Phone: portrait, big touch targets (at least 64 px tall), one thumb,
  no hover effects, no tiny text. Use `pointerdown` for fast buttons.
- Each player's color is `player.color`. Don't rely on color alone:
  also show the player number or name.
- Use the brief's colors, mood words and references. Images: draw with
  CSS, SVG or canvas, or use emoji. Don't link images from the internet.

## Testing and working style
- The student tests like this: double-click `screen.html` (opens in the
  browser), then click **+ Add a test phone** on the screen once per
  player. Each test phone opens in a new tab. After you change files, they
  reload the screen tab and the test phone tabs.
- If Supabase isn't working, they add `?practice=1` to the end of the
  screen address: tabs on this computer then talk without Supabase.
- Work in small steps. After each step say exactly what to click to check
  it. Don't make git commits; the student saves versions in GitHub Desktop.
- If an error shows in a red or yellow box, fix it in the game files.
- After two failed attempts at the same fix, stop and summarize what you
  tried and what is still broken, in five lines.
