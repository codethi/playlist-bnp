/* Play em cada música da playlist */
/* const playlist = document.querySelector("#player"); */
/* playlist.addEventListener("click", (ev) => {
  if (ev.target.nodeName == "I") {
    const tr = ev.path[3];
    const audio = tr.childNodes[9].childNodes[1];

    ev.target.classList.toggle("playing");

    if (ev.target.classList.contains("playing")) {
      ev.target.classList.replace("bi-play-circle", "bi-pause-circle");
      audio.play();
    } else {
      ev.target.classList.replace("bi-pause-circle", "bi-play-circle");
      audio.pause();
    }
  }
}); */

/* Área inferior de controles */

const controls = document.querySelector("#controls");
let index = 0;
let currentMusic;

controls.addEventListener("click", (ev) => {
  const audios = [];
  let musica = {};

  const linhas =
    ev.path[2].childNodes[5].childNodes[1].childNodes[3].childNodes;
  /* console.log(linhas); */

  linhas.forEach((item) => {
    if (item.nodeName != "#text") {
      musica.nome = item.childNodes[5].childNodes[0].data;
      musica.artista = item.childNodes[7].childNodes[0].data;
      musica.imagem = item.childNodes[3].childNodes[0].currentSrc;
      musica.audio = item.childNodes[9].childNodes[1];
      audios.push(musica);
      musica = {};
    }
  });

  /* console.log(audios); */

  currentMusic = audios[index];
  document.querySelector("#currentImg").src = currentMusic.imagem;
  const currentName = (document.querySelector("#currentName").innerText =
    currentMusic.nome);
  const currentArtist = (document.querySelector("#currentArtist").innerText =
    currentMusic.artista);

  /* Botão Play */
  if (ev.target.id == "play-control") {
    const btnPlay = document.querySelector("#play-control");
    const textCurrentDuration = document.querySelector("#current-duration");
    const textTotalDuration = document.querySelector("#total-duration");
    const progressbar = document.querySelector("#progressbar");

    progressbar.max = currentMusic.audio.duration;

    currentMusic.audio.classList.toggle("playing");

    if (currentMusic.audio.classList.contains("playing")) {
      btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
      currentMusic.audio.play();
      textTotalDuration.innerText = secondsToMinutes(
        currentMusic.audio.duration
      );
      currentMusic.audio.ontimeupdate = () => {
        textCurrentDuration.innerText = secondsToMinutes(
          currentMusic.audio.currentTime
        );
        progressbar.valueAsNumber = currentMusic.audio.currentTime;
      };
    } else {
      btnPlay.classList.replace("bi-pause-fill", "bi-play-fill");
      currentMusic.audio.pause();
    }

    document.querySelector("#currentImg").src = currentMusic.imagem;
    const currentName = (document.querySelector("#currentName").innerText =
      currentMusic.nome);
    const currentArtist = (document.querySelector("#currentArtist").innerText =
      currentMusic.artista);
  }
  /* Fim Botão Play */

  /* Botão Mute */
  if (ev.target.id == "vol-icon") {
    currentMusic.audio.muted = !currentMusic.audio.muted;
    if (currentMusic.audio.muted) {
      ev.target.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
    } else {
      ev.target.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
    }
  }
  /* Fim Botão Mute */

  /* Range de Volume */
  if (ev.target.id == "volume") {
    currentMusic.audio.volume = ev.target.valueAsNumber / 100;
  }
  /* Fim Range de Volume */

  /* Escolhendo ponto da música com a progressbar */
  if (ev.target.id == "progressbar") {
    currentMusic.audio.currentTime = ev.target.valueAsNumber;
  }
  /* Fim Escolhendo ponto da música com a progressbar */

  /* Botão de Próxima música */
  if (ev.target.id == "next-control") {
    index++;
  }
  /* Fim Botão de Próxima música */

  /* Botão de música anterior */
  if (ev.target.id == "prev-control") {
    index--;
  }
  /* Fim Botão de música anterior */
});

function secondsToMinutes(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}
