pool = require('../config/db.js');

class MusicaController {
    async getMusica(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM musica');
            res.send(`
                <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Minhas Favoritas</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #0e0e0e;
      color: #f0ede6;
      font-family: 'DM Sans', sans-serif;
      min-height: 100vh;
      padding: 60px 24px 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    header {
      width: 100%;
      max-width: 600px;
      margin-bottom: 48px;
    }

    .eyebrow {
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #c8f050;
      font-weight: 500;
      margin-bottom: 10px;
    }

    h1 {
      font-family: 'DM Serif Display', serif;
      font-size: 2.8rem;
      font-weight: 400;
      line-height: 1.1;
    }

    h1 em { font-style: italic; color: #c8f050; }

    .list {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .song {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 16px;
      background: #161616;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 14px;
      transition: background 0.2s, border-color 0.2s;
    }

    .song:hover {
      background: #1c1c1c;
      border-color: rgba(200,240,80,0.2);
    }

    .cover {
      width: 56px;
      height: 56px;
      border-radius: 8px;
      background: #252525;
      border: 1px solid rgba(255,255,255,0.06);
      flex-shrink: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cover img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .cover-placeholder {
      font-size: 22px;
      color: #333;
    }

    .idx {
      font-family: 'DM Serif Display', serif;
      font-size: 1.1rem;
      color: #333;
      width: 24px;
      text-align: center;
      flex-shrink: 0;
    }

    .info { flex: 1; min-width: 0; }

    .song-title {
      font-size: 15px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .song-artist {
      font-size: 12px;
      color: #666;
      margin-top: 3px;
    }

    .heart { color: #c0392b; font-size: 16px; flex-shrink: 0; }
  </style>
</head>
<body>

  <header>
    <p class="eyebrow">Playlist</p>
    <h1>Minhas <em>favoritas</em></h1>
  </header>

  <div class="list">

    <div class="song">
      <span class="idx">01</span>
      <div class="cover">
        <!-- <img src="/images/voltemos.jpg" alt="Voltemos ao Início" /> -->
        <span class="cover-placeholder">♪</span>
      </div>
      <div class="info">
        <div class="song-title">${result[0].nome_musica}</div>
        <div class="song-artist">Som do Reino</div>
      </div>
      <span class="heart">♥</span>
    </div>

    <div class="song">
      <span class="idx">02</span>
      <div class="cover">
        <!-- <img src="/images/davida.jpg" alt="Da Vida o Melhor" /> -->
        <span class="cover-placeholder">♪</span>
      </div>
      <div class="info">
        <div class="song-title">${result[1].nome_musica}</div>
        <div class="song-artist">Projeto Sola</div>
      </div>
      <span class="heart">♥</span>
    </div>

    <div class="song">
      <span class="idx">03</span>
      <div class="cover">
        <!-- <img src="/images/igotta.jpg" alt="I Gotta Feeling" /> -->
        <span class="cover-placeholder">♪</span>
      </div>
      <div class="info">
        <div class="song-title">${result[2].nome_musica}</div>
        <div class="song-artist">The Black Eyed Peas</div>
      </div>
      <span class="heart">♥</span>
    </div>

    <div class="song">
      <span class="idx">04</span>
      <div class="cover">
        <!-- <img src="/images/playhard.jpg" alt="Play Hard" /> -->
        <span class="cover-placeholder">♪</span>
      </div>
      <div class="info">
        <div class="song-title">${result[3].nome_musica}</div>
        <div class="song-artist">David Guetta</div>
      </div>
      <span class="heart">♥</span>
    </div>

    <div class="song">
      <span class="idx">05</span>
      <div class="cover">
        <!-- <img src="/images/quebromeu.jpg" alt="Quebro Meu Vaso" /> -->
        <span class="cover-placeholder">♪</span>
      </div>
      <div class="info">
        <div class="song-title">${result[4].nome_musica}</div>
        <div class="song-artist">Som do Reino</div>
      </div>
      <span class="heart">♥</span>
    </div>

  </div>

</body>
</html>
                `)
        } catch (error) {
            res.status(500).send('Erro ao buscar músicas: ' + error.message);
        }
    }
}

module.exports = new MusicaController();