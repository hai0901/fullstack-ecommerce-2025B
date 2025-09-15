// One run id for the whole Jest process
const RUN_ID = process.env.RUN_ID || `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

// Per-suite helper: pass a label to get a deterministic suffix
function suiteSuffix(label = 'x') {
  return `${label}-${RUN_ID}`.slice(-16).replace(/[^a-zA-Z0-9-]/g, '');
}

module.exports = { RUN_ID, suiteSuffix };
