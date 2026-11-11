/* =====================================================================
   SCREEN-GAME.JS  -  the big screen. THIS IS YOUR GAME. Replace it.

   Right now it runs a deliberately ugly demo called "Dot Race":
   - each phone has a TAP button and a slider
   - tapping moves your dot to the right, the slider moves it up and down
   - first dot to reach the finish line wins

   The screen is the REFEREE: it keeps the score and decides who wins.
   Phones only send moves. See engine.js (top comment) for the full API.

   Pattern worth copying: phones send their running TOTAL of taps
   ("taps", {round, count}), not one message per tap, because the
   engine limits each message type to 5 per second per phone.
   ===================================================================== */

(function () {
  var TAPS_TO_WIN = 25;
  var state = { phase: "lobby", round: 0, dots: {}, winner: null }; // phase: lobby | playing | over

  var stage = document.getElementById("stage");

  var room = Jam.host({
    maxPlayers: 4,

    onPlayerJoin: function (player) {
      if (player.role !== "player") return; // spectators just watch
      // a newcomer may take the seat of someone who left: drop dots of players no longer seated
      var seated = room.players().map(function (p) { return p.id; });
      Object.keys(state.dots).forEach(function (id) { if (seated.indexOf(id) < 0) delete state.dots[id]; });
      state.dots[player.id] = { x: 0, y: player.slot * 20, name: player.name, color: player.color, slot: player.slot };
      draw();
      room.sendTo(player, "phase", { name: state.phase, round: state.round });
    },

    onPlayerLeave: function () { draw(); },
    onPlayerReturn: function (player) {
      room.sendTo(player, "phase", { name: state.phase, round: state.round });
      draw();
    },

    onMove: function (player, type, data) {
      var dot = state.dots[player.id];
      if (!dot) return;
      if (type === "slider") {
        dot.y = Math.max(0, Math.min(100, Number(data) || 0));
      }
      if (type === "taps" && state.phase === "playing" && data && data.round === state.round) {
        var before = dot.x;
        dot.x = Math.min(TAPS_TO_WIN, Number(data.count) || 0);
        if (dot.x > before) Jam.sound.beep(300 + player.slot * 120, 40);
        if (dot.x >= TAPS_TO_WIN) finish(player);
      }
      draw();
    }
  });

  function startGame() {
    Jam.sound.unlock(); // browsers only allow sound after a click
    Object.keys(state.dots).forEach(function (id) { state.dots[id].x = 0; });
    state.round += 1; state.phase = "playing"; state.winner = null;
    room.showJoin(false);
    room.send("phase", { name: "playing", round: state.round });
    draw();
  }
  function finish(player) {
    if (state.phase !== "playing") return;
    state.phase = "over"; state.winner = player;
    room.send("phase", { name: "over", round: state.round });
    room.players().forEach(function (p) {
      room.sendTo(p, "result", p.id === player.id ? "You won!" : player.name + " won");
    });
    Jam.sound.beep(880, 400);
  }
  function backToLobby() {
    state.phase = "lobby";
    room.showJoin(true);
    room.send("phase", { name: "lobby", round: state.round });
    draw();
  }

  function draw() {
    var html = '<h1 class="title">Dot Race <small>(demo: replace me)</small></h1>';
    if (state.phase === "lobby") {
      html += '<p class="hint">Players join with their phones. When everyone is in, press Start.</p>';
      html += '<button id="start" class="big-btn">Start</button>';
    }
    html += '<div class="track"><div class="finish"></div>';
    Object.keys(state.dots).forEach(function (id) {
      var d = state.dots[id];
      var left = (d.x / TAPS_TO_WIN) * 92;
      html += '<div class="dot" style="left:' + left + '%;top:' + d.y + '%;background:' + d.color + '">P' + d.slot + "</div>";
    });
    html += "</div>";
    if (state.phase === "over" && state.winner) {
      html += '<h2 class="winner" id="winner">' + escapeHtml(state.winner.name) + ' wins!</h2><button id="again" class="big-btn">Play again</button>';
    }
    stage.innerHTML = html;
    var s = document.getElementById("start"); if (s) s.onclick = startGame;
    var a = document.getElementById("again"); if (a) a.onclick = backToLobby;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }

  draw();
})();
