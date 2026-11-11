# ARC 585 Game Jam starter

Build a multiplayer party game in 60 minutes. Players join from their
phones by scanning a QR code. The big screen shows the game.

This starter already does the hard part: room codes, the QR code, joining,
Player 1 to 4 with colors, and the live connection between phones and the
screen. You and your agent build the game itself.

Right now it runs an ugly demo, **Dot Race**: tap to move your dot, first
to the finish wins. It's ugly on purpose. You replace it.

## What's in the folder

| File | What it is | Edit it? |
|---|---|---|
| `GAME_BRIEF.md` | Your game brief (same questions as the worksheet) | Yes, you fill it in |
| `screen-game.js` | The big screen: the game, the rules, the score | Yes (your agent) |
| `play-game.js` | The phone controller | Yes (your agent) |
| `game.css` | The look | Yes (your agent) |
| `screen.html`, `play.html` | The two pages | Only small additions |
| `config.js` | Your Supabase Project URL and publishable key | Paste once |
| `engine.js`, `engine.css`, `lib/` | The plumbing (plus 3D and physics libraries) | **Never** |
| `AGENTS.md`, `CLAUDE.md` | Rules your agent follows | No |

## 1. Accounts (before class)

You need three free accounts: **Supabase**, **GitHub** (with the
**GitHub Desktop** app) and **Vercel**. You set them up in BA4, so most of
this is a quick check. Starting from zero? Follow the "Starting fresh" lines.

### Supabase: a NEW project for the game
1. Go to **supabase.com** and sign in.
   - Starting fresh: **Start your project**, sign up, then create an
     organization (any name, type **Personal**, plan **Free**).
2. Click **New project**. Pick your organization. Project name:
   `game-jam`. Database password: click **Generate a password** (you won't
   need it today). Region: any **East US** option. Leave everything
   else as it is. Click **Create new project**.
3. Wait 1 to 2 minutes until the project finishes setting up.
4. **Project URL:** look at your browser's address bar. It reads
   `supabase.com/dashboard/project/abcdefghijklm`. Your Project URL is
   `https://abcdefghijklm.supabase.co` (those letters, then `.supabase.co`).
5. **Publishable key:** click the gear icon (**Project Settings**) at the
   bottom of the left sidebar, then **API Keys**. Copy the key that starts
   with `sb_publishable_`. (The older **anon** key on the same page, under
   the legacy keys, also works.)
6. **Never** copy the secret key (`sb_secret_...`) or `service_role`.

**Already have 2 active Supabase projects?** The free plan allows 2. Don't
pause your BA4 project (your site's log-in would stop working). Instead,
use your BA4 project's URL and publishable key for the game (click
**Resume** first if it's paused): the game only sends live messages and
never touches your site's data or tables.

### GitHub and GitHub Desktop
- Already set up from BA4: open GitHub Desktop and check you're signed in
  (**GitHub Desktop > Settings > Accounts** on Mac, **File > Options >
  Accounts** on Windows).
- Starting fresh: create an account at **github.com**, download GitHub
  Desktop from **desktop.github.com**, open it and click **Sign in to
  GitHub.com**. If it asks for your name and email for commits, accept.

### Vercel
- Already set up from BA4: sign in at **vercel.com**. Nothing else to do.
- Starting fresh: **vercel.com > Sign Up**, choose **Hobby**, then
  **Continue with GitHub**. Signing up with GitHub links the two, which
  you need for deploying.

## 2. Get the folder ready
1. Unzip the starter. **Rename the folder now**, before opening it
   anywhere, e.g. `game-jam-yourname`. (Renaming later confuses your agent
   and GitHub Desktop.) Keep it somewhere easy, like your Desktop.
2. Open the folder in your agent: in Codex, **choose project > add folder**;
   in Claude Code, open the folder.
3. Use a fast model: **Sonnet** in Claude Code. In Codex, **GPT-6.1 Sol**
   with reasoning on **Light** or **Medium**. Not High or above: slower,
   and it burns your usage.
4. Put your keys in `config.js`. Open it in a text editor and paste
   between the quotes, or ask your agent:

   > Put my Supabase Project URL and publishable key into config.js. URL: [paste URL] Key: [paste publishable key]

5. Check it:

   > Read AGENTS.md and README.md first. Then check config.js and tell me whether my Supabase Project URL and publishable key look right (don't print the key). Don't change any files yet.

## 3. See it run (no server needed)
1. In Finder (or File Explorer), open your game folder and double-click
   **`screen.html`**. Use **Chrome** if you can.
2. Click **+ Add a test phone** two or three times. Each test phone opens
   in a new tab with its own player.
3. Go back to the screen tab, press **Start**, then tap **TAP** on the test
   phones. If the dots move, you're connected.

After your agent changes files, **reload** the screen tab and the test
phone tabs (Cmd+R on Mac, Ctrl+R on Windows). The test phones rejoin by
themselves.

Red box saying it can't connect? Check the URL and key in `config.js`, and
that your Supabase project has finished setting up (or isn't paused: click
**Resume** in the dashboard). If the box mentions private channels, open
**Realtime > Settings** in Supabase and turn on **Allow public access**.
Still stuck: add `?practice=1` to the end of the screen address. Tabs on
your computer then talk to each other without Supabase, so you can keep
building.

## 4. Build V1
Fill in `GAME_BRIEF.md` (open it in any text editor) or the worksheet. If
you filled in the worksheet, give your agent the brief first:

> Here is my game brief. Save it as GAME_BRIEF.md, replacing the template that's there. Don't build anything yet. [paste your whole brief]

Then:

> Read AGENTS.md and GAME_BRIEF.md. Build V1 of my game from the brief, starting with my "V1 must have" answer. Replace the Dot Race demo in screen-game.js, play-game.js and game.css. Don't touch engine.js, engine.css, config.js or the lib folder. When you're done, tell me exactly how to test it with the screen and test phones.

## 5. Deploy V1 as soon as it works
Real phones can't open a file on your laptop, so your game needs a live
site. Deploy **as soon as V1 works**, then keep improving: every later
change goes live in under a minute.

**A. Put the folder on GitHub (GitHub Desktop)**
1. **File > Add Local Repository...**, click **Choose...**, pick your game
   folder, then **Add Repository**.
2. It says the folder isn't a Git repository yet. Click the
   **create a repository** link, then **Create Repository**.
   (No link? Close the dialog, choose **File > New Repository...**, type
   your folder's exact name as the Name, set Local Path to the folder that
   contains it, e.g. your Desktop, and click **Create Repository**.)
3. Click **Publish repository** at the top. Keep the name, then
   **Publish Repository**. Private or public both work.

**B. Put it on Vercel**
1. At **vercel.com**, click **Add New... > Project**.
2. Find your repository under **Import Git Repository** and click
   **Import**.
   - GitHub not connected yet? Click **Continue with GitHub** / **Install**
     and allow access.
   - Don't see your repository? Click **Adjust GitHub App Permissions**
     (or **Configure GitHub App**), choose **All repositories** or add the
     new one, click **Save**, then come back and search again.
3. Framework Preset: **Other**. Don't change anything else. Click
   **Deploy**.
4. When it finishes, click **Continue to Dashboard**. Your address is
   under **Domains**, like `game-jam-yourname.vercel.app`.

**C. Test with your real phone**
1. Open your Vercel address on your laptop. It opens the screen with a
   QR code.
2. **Turn off Wi-Fi on your phone** (campus Wi-Fi blocks Vercel sites),
   scan the QR code and join.
3. Post your Vercel address and your game's name in the **Game Jam Links**
   discussion on Canvas.

**D. Every change after that**
Back in GitHub Desktop, your changed files appear on the left. Type a
short summary at the bottom left, click **Commit to main**, then
**Push origin** at the top. Vercel updates your site in under a minute.

Change broke something?

> Undo your last change. Put the files back exactly the way they were before it.

**Fallback:** add the game as a page on a site you already have. Your
choice, but don't break your portfolio.

## 6. Make it better, one change at a time

> One change: right now [what you see]. I want [what you want instead]. Keep everything else working, then tell me how to check it.

Red or yellow box?

> This error appeared: [paste the message from the red or yellow box]. Fix it in my game files, not in engine.js.

Two failed fixes in a row? Don't keep pushing:

> Stop. Summarize in five lines what we tried, what works, and what's still broken.

Then start a new chat and paste the summary in.

## No-cost path: UM Gemini
Gemini can't open your folder, so you move files by hand. Slower, but free.
1. Upload `AGENTS.md`, `GAME_BRIEF.md`, `screen-game.js`, `play-game.js`
   and `game.css` to Gemini (or paste their contents) and say:

   > Follow the rules in AGENTS.md. Build V1 of my game from GAME_BRIEF.md, starting with my "V1 must have" answer. Don't change engine.js. Give me the complete new contents of screen-game.js, play-game.js and game.css, each in its own code block, with the file name above it.

2. Open each file in a text editor, replace everything in it with Gemini's
   version, and save.
3. Double-click `screen.html` and test with **+ Add a test phone**.
4. Deploy the same way (section 5).

## How the starter works
- `screen.html` makes a 4-letter room code and a QR code. Phones open
  `play.html?room=CODE`, type a name, and get Player 1, 2, 3 or 4 in the
  order they join. A 5th person watches as a spectator.
- Phones send moves to the screen. The screen is the referee: it keeps
  the score and tells the phones what's happening.
- Messages travel through your Supabase project's Realtime service. No
  database tables, no logins.
- Speed limit: 5 messages per second per kind of move from each phone.
  For fast tapping, phones send a running total (the demo shows how).
- Reload a phone or the screen and players keep their seats.
