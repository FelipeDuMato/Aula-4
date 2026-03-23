pool = require('../config/db');

class PortifolioController {
    async getPortifolio(req, res) {
        try {
            const [rows] = await pool.query('SELECT * FROM portifolio');
            const arrNome = rows[0].nome.split(' ');

            res.send(`
                <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Portfólio</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0d0d0d;
      --card: #161616;
      --accent: #c8a96e;
      --accent2: #e8d5aa;
      --text: #f0ece3;
      --muted: #7a776e;
      --border: #2a2a2a;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      overflow-x: hidden;
    }

    /* Noise texture overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
      opacity: 0.5;
    }

    .container {
      position: relative;
      z-index: 1;
      max-width: 560px;
      width: 100%;
    }

    /* Glow blob */
    .blob {
      position: fixed;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 0;
    }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 3rem 3rem 2.5rem;
      position: relative;
      overflow: hidden;
      animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Top accent line */
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 10%; right: 10%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
    }

    .tag {
      display: inline-block;
      font-size: 0.65rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--accent);
      border: 1px solid rgba(200,169,110,0.35);
      border-radius: 999px;
      padding: 0.3rem 0.9rem;
      margin-bottom: 1.6rem;
      animation: fadeUp 0.8s 0.1s cubic-bezier(0.22,1,0.36,1) both;
    }

    .name {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.2rem, 6vw, 3rem);
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.02em;
      color: var(--text);
      margin-bottom: 0.4rem;
      animation: fadeUp 0.8s 0.15s cubic-bezier(0.22,1,0.36,1) both;
    }

    .name span {
      color: var(--accent);
    }

    .subtitle {
      font-size: 0.85rem;
      color: var(--muted);
      letter-spacing: 0.04em;
      margin-bottom: 2.4rem;
      animation: fadeUp 0.8s 0.2s cubic-bezier(0.22,1,0.36,1) both;
    }

    .divider {
      height: 1px;
      background: var(--border);
      margin-bottom: 2rem;
      animation: fadeUp 0.8s 0.25s cubic-bezier(0.22,1,0.36,1) both;
    }

    .info-grid {
      display: grid;
      gap: 1rem;
    }

    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem 1.2rem;
      background: rgba(255,255,255,0.025);
      border: 1px solid var(--border);
      border-radius: 12px;
      transition: border-color 0.25s, background 0.25s;
      animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both;
    }

    .info-item:hover {
      border-color: rgba(200,169,110,0.4);
      background: rgba(200,169,110,0.04);
    }

    .info-item:nth-child(1) { animation-delay: 0.3s; }
    .info-item:nth-child(2) { animation-delay: 0.38s; }
    .info-item:nth-child(3) { animation-delay: 0.46s; }
    .info-item:nth-child(4) { animation-delay: 0.54s; }
    .info-item:nth-child(5) { animation-delay: 0.62s; }

    .icon {
      width: 36px;
      height: 36px;
      border-radius: 9px;
      background: rgba(200,169,110,0.1);
      border: 1px solid rgba(200,169,110,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 1rem;
    }

    .info-content {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      min-width: 0;
    }

    .info-label {
      font-size: 0.65rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .info-value {
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .footer {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.7rem;
      color: var(--muted);
      letter-spacing: 0.08em;
      animation: fadeUp 0.8s 0.7s cubic-bezier(0.22,1,0.36,1) both;
    }

    .footer::before, .footer::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }
  </style>
</head>
<body>
  <div class="blob"></div>
  <div class="container">
    <div class="card">
      <div class="tag">Portfólio Acadêmico</div>
      <div class="name">${arrNome[0]} <span>${arrNome[1]}</span><br>${arrNome[2]}</div>
      <div class="subtitle">Estudante · ${rows[0].curso}</div>
      <div class="divider"></div>

      <div class="info-grid">
        <div class="info-item">
          <div class="icon">✉️</div>
          <div class="info-content">
            <span class="info-label">E-mail</span>
            <span class="info-value">${rows[0].email}</span>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">📱</div>
          <div class="info-content">
            <span class="info-label">Celular</span>
            <span class="info-value">${rows[0].celular}</span>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">🎓</div>
          <div class="info-content">
            <span class="info-label">RA — Registro Acadêmico</span>
            <span class="info-value">${rows[0].ra}</span>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">🏛️</div>
          <div class="info-content">
            <span class="info-label">Instituição</span>
            <span class="info-value">${rows[0].instituicao}</span>
          </div>
        </div>
      </div>

      <div class="footer">
        <span>2025</span>
      </div>
    </div>
  </div>
</body>
</html>`
            )
        } catch (error) {
            res.status(500).json({ error: 'Error fetching portifolio' + error.message });
        }
    }
}

module.exports = new PortifolioController();