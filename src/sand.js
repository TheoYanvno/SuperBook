// Writes text into the sand on a <canvas>: letters appear as grooves pressed into the dune,
// one line at a time, with grains of sand kicked up as the "finger" moves.

export class SandWriter {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.grains = [];
    this.frame = null;
  }

  // Break text into lines that fit the canvas width.
  wrap(paragraphs, font, maxWidth) {
    const ctx = this.ctx;
    ctx.font = font;
    const lines = [];
    paragraphs.forEach((p, i) => {
      let line = '';
      for (const word of p.split(' ')) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; }
        else line = test;
      }
      lines.push(line);
      if (i < paragraphs.length - 1) lines.push('');           // blank line between paragraphs
    });
    return lines;
  }

  write(title, paragraphs, { reducedMotion = false } = {}) {
    cancelAnimationFrame(this.frame);
    const dpr = window.devicePixelRatio || 1;
    const width = this.canvas.clientWidth;
    const size = width < 500 ? 17 : 21;
    const font = `${size}px "Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`;
    const titleFont = `bold ${size + 8}px "Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`;
    const pad = 24, lineH = size * 1.55;
    const lines = this.wrap(paragraphs, font, width - pad * 2);
    const height = pad * 2 + (size + 8) * 1.6 + lines.length * lineH;
    this.canvas.style.height = `${height}px`;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    const ctx = this.ctx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Each line becomes a job that reveals left to right.
    const jobs = [{ text: title, font: titleFont, x: pad, y: pad + size + 6 }];
    lines.forEach((text, i) => jobs.push({ text, font, x: pad, y: pad + (size + 8) * 1.6 + (i + 0.8) * lineH }));
    const speed = 900;   // pixels per second
    const start = performance.now();
    let offset = 0;
    for (const job of jobs) {
      ctx.font = job.font;
      job.width = ctx.measureText(job.text).width;
      job.start = offset;
      offset += job.width / speed * 1000 + 60;
    }
    const total = offset;
    this.grains = [];

    const groove = (job, upTo) => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(job.x - 4, job.y - 60, upTo + 8, 90);
      ctx.clip();
      ctx.font = job.font;
      // light edge below, dark shadow above: looks pressed into the sand
      ctx.fillStyle = 'rgba(255, 240, 205, 0.85)';
      ctx.fillText(job.text, job.x + 1, job.y + 1.5);
      ctx.fillStyle = 'rgba(120, 72, 28, 0.9)';
      ctx.fillText(job.text, job.x, job.y);
      ctx.restore();
    };

    const draw = (now) => {
      const t = reducedMotion ? total : now - start;
      ctx.clearRect(0, 0, width, height);
      for (const job of jobs) {
        const elapsed = t - job.start;
        if (elapsed <= 0) continue;
        const shown = Math.min(job.width, (elapsed / 1000) * speed);
        groove(job, shown);
        if (shown < job.width && !reducedMotion) {
          // the "finger" throws a few grains up and back
          for (let k = 0; k < 3; k++) {
            this.grains.push({ x: job.x + shown, y: job.y - 6, vx: -Math.random() * 1.6, vy: -Math.random() * 2.2, life: 1 });
          }
        }
      }
      for (const g of this.grains) {
        g.x += g.vx; g.y += g.vy; g.vy += 0.12; g.life -= 0.03;
        ctx.fillStyle = `rgba(150, 100, 45, ${Math.max(g.life, 0)})`;
        ctx.fillRect(g.x, g.y, 1.6, 1.6);
      }
      this.grains = this.grains.filter((g) => g.life > 0);
      if (t < total || this.grains.length) this.frame = requestAnimationFrame(draw);
    };
    this.frame = requestAnimationFrame(draw);
  }

  // Wind sweeps the writing away
  smooth() {
    cancelAnimationFrame(this.frame);
    const ctx = this.ctx;
    const { width, height } = this.canvas;
    const snapshot = ctx.getImageData(0, 0, width, height);
    let step = 0;
    const blow = () => {
      step++;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = Math.max(0, 1 - step / 25);
      ctx.putImageData(snapshot, step * 6, 0);
      ctx.globalAlpha = 1;
      if (step < 25) this.frame = requestAnimationFrame(blow);
      else { ctx.clearRect(0, 0, width, height); this.canvas.style.height = '0px'; }
    };
    blow();
  }
}
