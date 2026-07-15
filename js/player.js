(function () {
    var player = document.getElementById("previewPlayer");
    var buttons = document.querySelectorAll(".track-play");
    var LIMITE = 40; // segundos
  
    function pararTodosMenos(atual) {
      buttons.forEach(function (b) {
        if (b !== atual) b.classList.remove("is-playing");
      });
    }
  
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = btn.dataset.audio;
        var jaEraEssaFaixa = player.src.endsWith(src);
  
        if (jaEraEssaFaixa && !player.paused) {
          // clicou de novo na mesma faixa que está tocando -> pausa
          player.pause();
          btn.classList.remove("is-playing");
          return;
        }
  
        if (!jaEraEssaFaixa) {
          player.src = src;
          player.currentTime = 0;
        }
        player.play();
        pararTodosMenos(btn);
        btn.classList.add("is-playing");
      });
    });
  
    // corta em 30s
    player.addEventListener("timeupdate", function () {
      if (player.currentTime >= LIMITE) {
        player.pause();
        player.currentTime = 0;
        buttons.forEach(function (b) { b.classList.remove("is-playing"); });
      }
    });
  
    // se a prévia acabar sozinha (arquivo com menos de 30s)
    player.addEventListener("ended", function () {
      buttons.forEach(function (b) { b.classList.remove("is-playing"); });
    });
  })();