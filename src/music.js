// Calm desert ambience, generated live with the Web Audio API (no recordings, nothing to download).
// Layers: a low drone, slow pad chords, sparse plucked notes and soft wind, all through a gentle reverb.
// Notes come from the D Hijaz scale (D, E♭, F♯, G, A, B♭, C), common in Middle Eastern music.

export const HIJAZ = [0, 1, 4, 5, 7, 8, 10];           // semitones above the root
const ROOT = 50;                                        // MIDI note 50 = D3

/** MIDI note number → frequency in Hz (A4 = 69 = 440 Hz). */
export const frequency = (midi) => 440 * 2 ** ((midi - 69) / 12);

/** The nth note of the scale, wrapping into higher octaves (n = 7 is D an octave up). */
export const scaleNote = (n, root = ROOT) => root + 12 * Math.floor(n / HIJAZ.length) + HIJAZ[((n % HIJAZ.length) + HIJAZ.length) % HIJAZ.length];

// Chords for the pad, as scale steps. One chord every 8 seconds, built only from scale notes.
export const PROGRESSION = [[0, 4, 7], [3, 5, 8], [1, 3, 5], [0, 2, 4]];

export class DesertAmbience {
  constructor() {
    this.ctx = null;
    this.playing = false;
    this.timers = [];
  }

  /** Must be called from a click or key press: browsers only allow sound after the user interacts. */
  async start() {
    if (this.playing) return;
    this.ctx ??= this.build();
    await this.ctx.resume();
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0.65, now + 4);        // slow fade in
    this.playing = true;
    this.loop();
  }

  stop() {
    if (!this.playing) return;
    this.playing = false;
    this.timers.forEach(clearTimeout);
    this.timers = [];
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 1.5);         // fade out, then pause the engine
    this.timers.push(setTimeout(() => { if (!this.playing) this.ctx.suspend(); }, 1700));
  }

  build() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(ctx.destination);

    // Reverb: an impulse of fading noise makes everything sound like a wide open space
    const reverb = ctx.createConvolver();
    const seconds = 4.5;
    const impulse = ctx.createBuffer(2, ctx.sampleRate * seconds, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 2.6;
    }
    reverb.buffer = impulse;
    this.wet = ctx.createGain();
    this.wet.gain.value = 0.55;
    reverb.connect(this.wet).connect(this.master);
    this.dry = ctx.createGain();
    this.dry.gain.value = 0.6;
    this.dry.connect(this.master);
    this.reverb = reverb;

    // Drone: two slightly detuned low notes (D and A) through a slowly moving low-pass filter
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 380;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.16;
    droneFilter.connect(droneGain);
    droneGain.connect(this.dry);
    droneGain.connect(reverb);
    for (const [midi, detune, type] of [[ROOT - 12, -4, 'sawtooth'], [ROOT - 12, 5, 'triangle'], [ROOT - 5, 0, 'sine']]) {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = frequency(midi);
      osc.detune.value = detune;
      osc.connect(droneFilter);
      osc.start();
    }
    const lfo = ctx.createOscillator();                 // the filter "breathes" every ~20 seconds
    const lfoDepth = ctx.createGain();
    lfo.frequency.value = 0.05;
    lfoDepth.gain.value = 160;
    lfo.connect(lfoDepth).connect(droneFilter.frequency);
    lfo.start();

    // Wind: filtered noise with a slowly drifting band, very quiet
    const noise = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const n = noise.getChannelData(0);
    for (let i = 0; i < n.length; i++) n[i] = Math.random() * 2 - 1;
    const wind = ctx.createBufferSource();
    wind.buffer = noise;
    wind.loop = true;
    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 500;
    band.Q.value = 0.8;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.035;
    const gust = ctx.createOscillator();
    const gustDepth = ctx.createGain();
    gust.frequency.value = 0.07;
    gustDepth.gain.value = 260;
    gust.connect(gustDepth).connect(band.frequency);
    wind.connect(band).connect(windGain).connect(reverb);
    wind.start();
    gust.start();
    return ctx;
  }

  /** A soft sustained note for the pad. */
  pad(midi, start, length) {
    const { ctx } = this;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = frequency(midi);
    osc.detune.value = (Math.random() - 0.5) * 8;
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.045, start + length * 0.4);     // slow swell
    gain.gain.linearRampToValueAtTime(0, start + length);
    osc.connect(filter).connect(gain);
    gain.connect(this.reverb);
    gain.connect(this.dry);
    osc.start(start);
    osc.stop(start + length + 0.1);
  }

  /** A plucked, harp-like note: quick attack, long fade. */
  pluck(midi, start) {
    const { ctx } = this;
    const osc = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'triangle';
    overtone.type = 'sine';
    osc.frequency.value = frequency(midi);
    overtone.frequency.value = frequency(midi) * 2;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2600, start);
    filter.frequency.exponentialRampToValueAtTime(500, start + 1.8);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.07, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 3.2);
    osc.connect(filter);
    overtone.connect(filter);
    filter.connect(gain);
    gain.connect(this.reverb);
    gain.connect(this.dry);
    for (const o of [osc, overtone]) { o.start(start); o.stop(start + 3.3); }
  }

  /** Schedules the next 8-second phrase: one pad chord and a few wandering plucked notes. */
  loop(step = 0) {
    if (!this.playing) return;
    const start = this.ctx.currentTime + 0.1;
    const chord = PROGRESSION[step % PROGRESSION.length];
    chord.forEach((degree) => this.pad(scaleNote(degree), start, 9));
    let note = 7 + Math.floor(Math.random() * 5);                       // start around the upper D
    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      note += [-2, -1, -1, 1, 1, 2][Math.floor(Math.random() * 6)];     // small steps sound like a melody
      note = Math.min(Math.max(note, 4), 14);
      this.pluck(scaleNote(note), start + 1 + i * (1.2 + Math.random() * 1.4));
    }
    this.timers.push(setTimeout(() => this.loop(step + 1), 8000));
  }
}
