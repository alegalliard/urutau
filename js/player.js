(function () {
  "use strict";

  var player = document.getElementById("previewPlayer");
  var buttons = document.querySelectorAll(".track-play");
  var label = document.getElementById("previewLabel");
  var status = document.getElementById("previewStatus");
  var region = document.getElementById("previewRegion");
  var announcement = document.getElementById("previewAnnouncement");
  if (!player || !buttons.length) return;

  var language = document.documentElement.lang.split("-")[0];
  var text = {
    "pt": {
      label: "Prévia de ", play: "Ouvir prévia de ", pause: "Pausar prévia de ",
      selected: "Prévia de {track} selecionada. O reprodutor está acima da lista; use o link ao lado do botão para acessar os controles.",
      error: "Não foi possível reproduzir a prévia de {track}. Tente novamente."
    },
    "en": {
      label: "Preview of ", play: "Listen to a preview of ", pause: "Pause preview of ",
      selected: "Preview of {track} selected. The player is above the list; use the link next to the button to access its controls.",
      error: "Unable to play the preview of {track}. Please try again."
    },
    "es": {
      label: "Adelanto de ", play: "Escucha un adelanto de ", pause: "Pausar el adelanto de ",
      selected: "Adelanto de {track} seleccionado. El reproductor está encima de la lista; usa el enlace junto al botón para acceder a los controles.",
      error: "No se pudo reproducir el adelanto de {track}. Inténtalo de nuevo."
    }
  }[language] || {
    label: "Prévia de ", play: "Ouvir prévia de ", pause: "Pausar prévia de ",
    selected: "Prévia de {track} selecionada. O reprodutor está acima da lista; use o link ao lado do botão para acessar os controles.",
    error: "Não foi possível reproduzir a prévia de {track}. Tente novamente."
  };
  var limit = 40;
  var active = buttons[0];
  var pending = false;
  var request = 0;

  function trackName(button) {
    return button.dataset.track.replace(/^[IVXLCDM]+\.\s*/, "");
  }

  function syncTranscript() {
    document.querySelectorAll(".preview-transcript").forEach(function (transcript) {
      var selected = transcript.id === active.dataset.transcript;
      transcript.hidden = !selected;
      if (!selected) transcript.open = false;
    });
    syncVerse(true);
  }

  function syncVerse(clear) {
    document.querySelectorAll(".preview-transcript .preview-verse[data-start]").forEach(function (verse) {
      var transcript = verse.closest(".preview-transcript");
      var current = !clear && !transcript.hidden && !player.ended &&
        player.currentTime >= Number(verse.dataset.start) &&
        player.currentTime < Number(verse.dataset.end);
      verse.classList.toggle("is-current", current);
    });
  }

  function syncButtons(playing) {
    buttons.forEach(function (button) {
      var isPlaying = playing && button === active;
      button.classList.toggle("is-playing", isPlaying);
      button.setAttribute("aria-label", (isPlaying ? text.pause : text.play) + trackName(button));
      var expanded = region && !region.hidden && button === active;
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
      var jump = button.parentElement.querySelector(".preview-jump");
      if (jump) jump.hidden = !expanded;
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
      var firstSelection = region && region.hidden;
      if (region) region.hidden = false;
      player.pause();
      active = button;
      if (announcement && (firstSelection || !sameTrack)) {
        announcement.textContent = text.selected.replace("{track}", trackName(button));
      }
      syncTranscript();
      syncButtons(false);
      if (!sameTrack) {
        player.src = button.dataset.audio;
        if (label) label.textContent = text.label + trackName(button);
      } else if (player.error) {
        player.load();
      }
      if (!sameTrack || player.ended || player.currentTime >= limit) player.currentTime = 0;
      pending = true;
      try {
        var playback = player.play();
        if (playback && playback.catch) {
          playback.catch(function (error) {
            // O navegador também pode cancelar play() ao pausar ou trocar a faixa.
            if (error.name === "AbortError") {
              if (id === request && button === active) {
                pending = false;
                syncButtons(!player.paused);
              }
              return;
            }
            fail(button, id);
          });
        }
      } catch (error) {
        fail(button, id);
      }
    });
  });

  document.querySelectorAll(".preview-jump").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      player.focus();
      player.scrollIntoView({ block: "center" });
    });
  });

  player.addEventListener("play", function () {
    if (status) status.textContent = "";
    if (player.currentTime >= limit) player.currentTime = 0;
  });
  player.addEventListener("playing", function () {
    pending = false;
    syncButtons(!player.paused);
  });
  player.addEventListener("pause", function () {
    if (player.paused) pending = false;
    syncButtons(!player.paused);
  });
  player.addEventListener("ended", function () {
    pending = false;
    syncButtons(false);
    syncVerse(true);
  });
  player.addEventListener("error", function () {
    if (active) fail(active, request);
  });
  player.addEventListener("timeupdate", function () {
    if (player.currentTime >= limit) {
      pending = false;
      player.pause();
      if (player.currentTime > limit) player.currentTime = limit;
      syncButtons(false);
    }
    syncVerse(false);
  });
  player.addEventListener("seeking", function () {
    if (player.currentTime > limit) {
      player.pause();
      player.currentTime = limit;
      syncButtons(false);
    }
    syncVerse(false);
  });
  syncTranscript();
  syncButtons(false);
})();
