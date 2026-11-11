/* =====================================================================
   PLAY-GAME.JS  -  the phone controller. THIS IS YOUR GAME. Replace it.

   Right now it's the "Dot Race" demo controller: a TAP button and a
   slider. It sends moves to the screen with me.send(type, data), and
   listens for messages from the screen in onMessage.

   Pattern worth copying: the phone counts taps itself and sends the
   running total, because fast repeats of one message type are limited
   to 5 per second (only the latest value gets through).
   Phones: big buttons, portrait, works with one thumb.
   ===================================================================== */

(function () {
  var controls = document.getElementById("controls");
  var phase = "lobby", round = 0, count = 0;

  var me = Jam.join({
    onReady: function (player) {
      if (player.role !== "player") {
        controls.innerHTML = '<p class="msg">The game is full, so you\'re watching. Look at the big screen!</p>';
        return;
      }
      build();
    },
    onMessage: function (type, data) {
      if (type === "phase") {
        if (data.round !== round) count = 0; // new round: start counting again
        phase = data.name; round = data.round;
        update("");
      }
      if (type === "result") update(data);
    },
    onScreenLost: function () { update("Lost the screen. Waiting for it to come back..."); }
  });

  function build() {
    controls.innerHTML =
      '<p id="msg" class="msg">Waiting for the game to start...</p>' +
      '<button id="tap" class="tap-btn">TAP</button>' +
      '<label class="slider-label">Up / down<input id="slider" type="range" min="0" max="100" value="50"></label>';
    document.getElementById("tap").addEventListener("pointerdown", function (e) {
      e.preventDefault();
      if (phase !== "playing") return;
      count += 1;
      me.send("taps", { round: round, count: count });
    });
    document.getElementById("slider").addEventListener("input", function (e) {
      me.send("slider", Number(e.target.value));
    });
    update("");
  }

  function update(extra) {
    var msg = document.getElementById("msg");
    if (!msg) return;
    var text = phase === "lobby" ? "Waiting for the game to start..." : phase === "playing" ? "GO! Tap as fast as you can!" : "Round over.";
    msg.textContent = extra || text;
    var tap = document.getElementById("tap");
    if (tap) tap.disabled = phase !== "playing";
  }
})();
