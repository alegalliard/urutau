(function () {
  "use strict";

  var player = document.getElementById("previewPlayer");
  var buttons = document.querySelectorAll(".track-play");
  var status = document.getElementById("previewStatus");
  if (!player || !buttons.length) return;

  var language = document.documentElement.lang.split("-")[0];
  var text = {
    "pt": {
      play: "Ouvir prévia de ", pause: "Pausar prévia de ",
      error: "Não foi possível reproduzir a prévia de {track}. Tente novamente."
    },
    "en": {
      play: "Listen to a preview of ", pause: "Pause preview of ",
      error: "Unable to play the preview of {track}. Please try again."
    },
    "es": {
      play: "Escucha un adelanto de ", pause: "Pausar el adelanto de ",
      error: "No se pudo reproducir el adelanto de {track}. Inténtalo de nuevo."
    }
  }[language] || {
    play: "Ouvir prévia de ", pause: "Pausar prévia de ",
    error: "Não foi possível reproduzir a prévia de {track}. Tente novamente."
  };
  var limit = 40;
  var active = null;
  var pending = false;
  var request = 0;

  function trackName(button) {
    return button.dataset.track.replace(/^[IVXLCDM]+\.\s*/, "");
  }

  function syncButtons(playing) {
    buttons.forEach(function (button) {
      var isPlaying = playing && button === active;
      button.classList.toggle("is-playing", isPlaying);
      button.setAttribute("aria-label", (isPlaying ? text.pause : text.play) + trackName(button));
    });
  }

  function fail(button, id) {
    // Uma tentativa anterior pode ser cancelada pela troca de faixa.
    if (id !== request || button !== active) return;
    request++;
    pending = false;
    player.pause();
    syncButtons(false);
    if (status) status.textContent = text.error.replace("{track}", trackName(button));
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var id = ++request;
      if (status) status.textContent = "";
      if (active === button && (pending || !player.paused)) {
        pending = false;
        player.pause();
        syncButtons(false);
        return;
      }

      var sameTrack = active === button;
      player.pause();
      active = button;
      syncButtons(false);
      if (!sameTrack) player.src = button.dataset.audio;
      if (!sameTrack || player.ended || player.currentTime >= limit) player.currentTime = 0;
      pending = true;
      try {
        var playback = player.play();
        if (playback && playback.catch) {
          playback.catch(function () { fail(button, id); });
        }
      } catch (error) {
        fail(button, id);
      }
    });
  });

  player.addEventListener("playing", function () {
    pending = false;
    syncButtons(!player.paused);
  });
  player.addEventListener("pause", function () {
    syncButtons(!player.paused);
  });
  player.addEventListener("ended", function () {
    pending = false;
    syncButtons(false);
  });
  player.addEventListener("error", function () {
    if (active) fail(active, request);
  });
  player.addEventListener("timeupdate", function () {
    if (player.currentTime >= limit) {
      pending = false;
      player.pause();
      player.currentTime = 0;
      syncButtons(false);
    }
  });
  syncButtons(false);
})();
