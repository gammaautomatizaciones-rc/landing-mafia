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
  if (!go) return;
  if (go.dataset.role) document.getElementById('rol').value = go.dataset.role;
  show(go.dataset.go);
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
    if (it.hot) b.append(el('small', 'hot', 'SE BUSCAN'));
    else if (it.count != null) b.append(el('small', '', String(it.count)));
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

const withRole = (role) => MEMBERS.filter((m) => m.role === role);
const withRank = (rank) => MEMBERS.filter((m) => m.rank === rank);

// Botón que lleva al formulario con el rol ya elegido
const applyBtn = (text, role, cls) => {
  const b = el('button', 'btn ' + cls, text);
  b.type = 'button';
  b.dataset.go = 'unirme';
  b.dataset.role = role;
  return b;
};

// En cada área: cuántos miembros hay en el área y en cada rol (puede haber varios por rol).
// Las áreas de HIRING salen "SE BUSCAN", con sus roles vacantes y botón para postularse.
const areaItems = AREAS.map((a) => ({
  ...a, hot: HIRING.includes(a.name), count: a.roles.reduce((n, [r]) => n + withRole(r).length, 0),
}));
masterDetail('areas-md', areaItems, 3, (a, box) => {
  const list = el('ul', 'roles');
  a.roles.forEach(([name, desc]) => {
    const li = el('li');
    const b = el('b', '', name);
    const n = withRole(name).length;
    if (n) b.append(el('span', 'n', ' x' + n));
    else if (a.hot) b.append(el('span', 'vac', ' VACANTE'));
    li.append(b, el('span', '', desc));
    list.append(li);
  });
  box.append(el('h3', '', a.name), el('p', 'sub', a.desc), list);
  if (a.hot) box.append(applyBtn('Postularme a ' + a.name, a.roles[0][0], 'hot'));
});

AREAS.filter((a) => HIRING.includes(a.name)).forEach((a) => {
  put('hiring', applyBtn('Se buscan ' + a.name.toLowerCase(), a.roles[0][0], 'hot'));
});

// Miembros: por rango, con su cara pixel, su nick y su rol
masterDetail('members-md', RANKS.map((r) => ({ ...r, count: withRank(r.name).length })), 4, (r, box) => {
  const people = withRank(r.name);
  box.append(el('h3', '', `${r.name}: ${people.length} ${people.length === 1 ? 'miembro' : 'miembros'}`));
  if (!people.length) return box.append(el('p', '', 'Todavía no hay miembros en este rango.'));
  const grid = el('div', 'mgrid');
  people.forEach((m) => {
    const card = el('div', 'mem');
    const who = el('div');
    who.append(el('b', '', m.nick), el('span', '', m.role));
    card.append(avatar(m.nick), who);
    grid.append(card);
  });
  box.append(grid);
});

RULES.forEach((t) => put('rules', el('li', 'panel', t)));

[[RANKS.length, 'rangos'], [AREAS.length, 'áreas'], [MEMBERS.length, 'miembros']].forEach(([n, label]) => {
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
