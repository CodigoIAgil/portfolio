// Nuvem de IA do topo: pontos "quânticos" que se movem devagar e se ligam
// como neurônios. Passar o mouse (ou tocar) na nuvem revela o nome ao fundo.
(() => {
  const secao = document.querySelector(".main");
  const canvas = document.querySelector(".hero-nuvem");
  if (!secao || !canvas) return;

  const ctx = canvas.getContext("2d");
  const semMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LARANJA = "249, 115, 22";
  const CINZA = "196, 196, 196";
  const DISTANCIA_LIGACAO = 110;
  const RAIO_MOUSE = 160;

  let largura = 0;
  let altura = 0;
  let centro = { x: 0, y: 0, rx: 0, ry: 0 };
  let pontos = [];
  let mouse = null;
  let visivel = true;
  let quadro = null;

  // A nuvem fica à direita no desktop e embaixo do texto no celular.
  function calcularNuvem() {
    const celular = largura <= 1050;
    centro = {
      x: largura * (celular ? 0.5 : 0.7),
      y: altura * (celular ? 0.74 : 0.5),
      rx: largura * (celular ? 0.42 : 0.24),
      ry: altura * (celular ? 0.2 : 0.36),
    };
  }

  function dentroDaNuvem(x, y, folga = 1) {
    const dx = (x - centro.x) / (centro.rx * folga);
    const dy = (y - centro.y) / (centro.ry * folga);
    return dx * dx + dy * dy <= 1;
  }

  function criarPontos() {
    const quantidade = Math.round(
      Math.min(110, Math.max(40, (centro.rx * centro.ry) / 900)),
    );
    pontos = Array.from({ length: quantidade }, () => {
      const angulo = Math.random() * Math.PI * 2;
      const raio = Math.sqrt(Math.random());
      return {
        x: centro.x + Math.cos(angulo) * centro.rx * raio,
        y: centro.y + Math.sin(angulo) * centro.ry * raio,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        tamanho: 1 + Math.random() * 1.8,
        laranja: Math.random() < 0.22,
        fase: Math.random() * Math.PI * 2,
      };
    });
  }

  function redimensionar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    largura = secao.clientWidth;
    altura = secao.clientHeight;
    canvas.width = largura * dpr;
    canvas.height = altura * dpr;
    canvas.style.width = `${largura}px`;
    canvas.style.height = `${altura}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    calcularNuvem();
    criarPontos();
    desenhar(0);
  }

  function mover() {
    for (const p of pontos) {
      p.x += p.vx;
      p.y += p.vy;
      // Fora da nuvem, o ponto é puxado de volta com suavidade.
      if (!dentroDaNuvem(p.x, p.y)) {
        p.vx += (centro.x - p.x) * 0.00004;
        p.vy += (centro.y - p.y) * 0.00004;
      }
      // Perto do mouse, os pontos são atraídos de leve.
      if (mouse) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < RAIO_MOUSE && d > 1) {
          p.vx += (dx / d) * 0.012;
          p.vy += (dy / d) * 0.012;
        }
      }
      const velocidade = Math.hypot(p.vx, p.vy);
      if (velocidade > 0.45) {
        p.vx *= 0.45 / velocidade;
        p.vy *= 0.45 / velocidade;
      }
    }
  }

  function desenhar(tempo) {
    ctx.clearRect(0, 0, largura, altura);

    // Brilho suave da nuvem.
    const brilho = ctx.createRadialGradient(
      centro.x,
      centro.y,
      0,
      centro.x,
      centro.y,
      Math.max(centro.rx, centro.ry),
    );
    brilho.addColorStop(0, `rgba(${LARANJA}, 0.07)`);
    brilho.addColorStop(1, `rgba(${LARANJA}, 0)`);
    ctx.fillStyle = brilho;
    ctx.fillRect(0, 0, largura, altura);

    // Ligações entre pontos próximos (neurônios).
    for (let i = 0; i < pontos.length; i++) {
      for (let j = i + 1; j < pontos.length; j++) {
        const a = pontos[i];
        const b = pontos[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < DISTANCIA_LIGACAO) {
          const cor = a.laranja || b.laranja ? LARANJA : CINZA;
          ctx.strokeStyle = `rgba(${cor}, ${0.22 * (1 - d / DISTANCIA_LIGACAO)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Ligações até o mouse.
    if (mouse) {
      for (const p of pontos) {
        const d = Math.hypot(mouse.x - p.x, mouse.y - p.y);
        if (d < RAIO_MOUSE) {
          ctx.strokeStyle = `rgba(${LARANJA}, ${0.45 * (1 - d / RAIO_MOUSE)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }
    }

    // Pontos quânticos: piscam devagar, cada um no seu ritmo.
    for (const p of pontos) {
      const piscar = 0.55 + 0.45 * Math.sin(tempo / 900 + p.fase);
      const cor = p.laranja ? LARANJA : CINZA;
      ctx.fillStyle = `rgba(${cor}, ${p.laranja ? piscar : piscar * 0.7})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.tamanho, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animar(tempo) {
    quadro = null;
    if (!visivel || document.hidden) return;
    mover();
    desenhar(tempo);
    quadro = requestAnimationFrame(animar);
  }

  function iniciar() {
    if (!semMovimento && quadro === null) {
      quadro = requestAnimationFrame(animar);
    }
  }

  function posicao(evento) {
    const r = secao.getBoundingClientRect();
    return { x: evento.clientX - r.left, y: evento.clientY - r.top };
  }

  secao.addEventListener("pointermove", (evento) => {
    mouse = posicao(evento);
    secao.classList.toggle(
      "revela-nome",
      dentroDaNuvem(mouse.x, mouse.y, 1.15),
    );
    if (semMovimento) desenhar(0);
  });

  secao.addEventListener("pointerleave", () => {
    mouse = null;
    secao.classList.remove("revela-nome");
    if (semMovimento) desenhar(0);
  });

  // No toque não existe "passar o mouse": tocar na nuvem alterna o nome.
  secao.addEventListener("pointerdown", (evento) => {
    if (evento.pointerType === "mouse") return;
    const p = posicao(evento);
    if (dentroDaNuvem(p.x, p.y, 1.15)) secao.classList.toggle("revela-nome");
  });

  // Economiza bateria: só anima quando o topo está na tela.
  new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting;
    if (visivel) iniciar();
  }).observe(secao);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) iniciar();
  });

  window.addEventListener("resize", redimensionar);
  redimensionar();
  iniciar();
})();
