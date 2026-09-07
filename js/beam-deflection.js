(() => {
  const form = document.querySelector('#beam-form');
  const fields = {
    span: document.querySelector('#span'),
    load: document.querySelector('#load'),
    E: document.querySelector('#elasticity'),
    I: document.querySelector('#inertia')
  };
  const out = {
    deflection: document.querySelector('#deflection'),
    moment: document.querySelector('#moment'),
    reaction: document.querySelector('#reaction'),
    loadLabel: document.querySelector('#load-label'),
    spanLabel: document.querySelector('#span-label'),
    path: document.querySelector('#deflected-path'),
    validation: document.querySelector('#validation')
  };
  const tabs = [...document.querySelectorAll('.tab')];
  const beamY = 130;

  function number(id) {
    const value = Number(fields[id].value);
    return Number.isFinite(value) ? value : NaN;
  }

  function calculate() {
    const L = number('span');       // mm
    const P = number('load');       // kN
    const E = number('E') * 1000;   // kN/mm² (1 GPa = 0.001 kN/mm²; 200 GPa = 0.2 kN/mm²)
    const I = number('I');          // mm⁴

    if (![L,P,E,I].every(Number.isFinite) || L <= 0 || P < 0 || E <= 0 || I <= 0) {
      out.validation.textContent = 'Enter valid positive span, E and I values; load cannot be negative.';
      return;
    }
    if (L > 1000000 || P > 100000 || E > 1000 || I > 1e15) {
      out.validation.textContent = 'One or more inputs are outside the supported range.';
      return;
    }

    // P is kN, E is kN/mm², so result is mm.
    const delta = (P * Math.pow(L, 3)) / (48 * E * I);
    const M = P * L / 4 / 1000; // kN·m
    const R = P / 2;

    if (![delta,M,R].every(Number.isFinite)) {
      out.validation.textContent = 'The result is outside the supported numeric range.';
      return;
    }

    out.validation.textContent = '';
    out.deflection.textContent = delta < 100000 ? delta.toFixed(2) : delta.toExponential(2);
    out.moment.textContent = M.toFixed(2);
    out.reaction.textContent = R.toFixed(2);
    out.loadLabel.textContent = `${P.toFixed(P % 1 ? 1 : 0)} kN`;
    out.spanLabel.textContent = `${L.toLocaleString()} mm`;

    const visualDepth = Math.min(115, Math.max(8, delta * 5));
    out.path.setAttribute('d', `M95 ${beamY} Q380 ${beamY + visualDepth * 1.35} 665 ${beamY}`);
  }

  form.addEventListener('submit', e => { e.preventDefault(); calculate(); });
  Object.values(fields).forEach(input => input.addEventListener('input', calculate));

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (index === 1) out.path.style.opacity = '0';
      else if (index === 2) out.path.style.opacity = '0.7';
      else out.path.style.opacity = '1';
    });
  });

  calculate();
})();