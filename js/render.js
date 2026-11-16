// Arma pestañas, rangos, áreas, código, números y selector de rol desde data.js.
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
};
const put = (id, ...kids) => document.getElementById(id).append(...kids);

// Una sola sección visible a la vez; la pestaña queda en la URL (#rangos) para poder compartirla
function show(id) {
  document.querySelectorAll('.view').forEach((v) => { v.hidden = v.id !== id; });
  document.querySelectorAll('.tab').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.go === id)));
  history.replaceState(null, '', '#' + id);
}

TABS.forEach(([id, label, icon]) => {
  const b = el('button', 'tab');
  b.type = 'button';
  b.dataset.go = id;
  b.setAttribute('role', 'tab');
  b.append(pixelIcon(icon), el('span', '', label));
  put('tabs', b);
});
document.addEventListener('click', (e) => {
  const go = e.target.closest('[data-go]');
  if (go) show(go.dataset.go);
});

// Lista de botones + panel de detalle; elegir uno rellena el detalle
function masterDetail(rootId, items, cols, fill) {
  const list = el('div', 'md-list');
  list.style.setProperty('--cols', cols);
  const detail = el('div', 'panel detail');
  put(rootId, list, detail);
  const btns = items.map((it, i) => {
    const b = el('button', 'item');
    b.type = 'button';
    b.append(pixelIcon(it.icon), el('span', '', it.name));
    b.addEventListener('click', () => pick(i));
    list.append(b);
    return b;
  });
  function pick(i) {
    btns.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    detail.replaceChildren();
    fill(items[i], detail, i);
  }
  pick(0);
}

masterDetail('ranks', RANKS, 4, (r, box, i) => box.append(
  el('span', 'tag', 'RANGO ' + (i + 1)), el('h3', '', r.name), el('p', '', r.desc), el('p', 'req', 'Cómo se llega: ' + r.req),
));

masterDetail('areas-md', AREAS, 3, (a, box) => {
  const list = el('ul', 'roles');
  a.roles.forEach(([name, desc]) => {
    const li = el('li');
    li.append(el('b', '', name), el('span', '', desc));
    list.append(li);
  });
  box.append(el('h3', '', a.name), el('p', 'sub', a.desc), list);
});

RULES.forEach((t) => put('rules', el('li', 'panel', t)));

const roleCount = AREAS.reduce((n, a) => n + a.roles.length, 0);
[[RANKS.length, 'rangos'], [AREAS.length, 'áreas'], [roleCount, 'roles']].forEach(([n, label]) => {
  const s = el('div', 'panel stat');
  s.append(el('b', '', String(n)), el('span', '', label));
  put('stats', s);
});

const sel = document.getElementById('rol');
sel.append(new Option('Elige tu rol...', ''));
AREAS.forEach((a) => {
  const g = el('optgroup');
  g.label = a.name;
  a.roles.forEach(([name]) => g.append(new Option(name, name)));
  sel.append(g);
});

const start = location.hash.slice(1);
show(TABS.some(([id]) => id === start) ? start : 'inicio');
