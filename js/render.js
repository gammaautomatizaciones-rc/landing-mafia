// Arma jerarquía, áreas, código, pasos, números y selector de roles desde data.js.
document.documentElement.classList.add('js');

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
};
const put = (id, ...kids) => document.getElementById(id).append(...kids);
const iconBox = (name) => { const b = el('div', 'ico'); b.append(pixelIcon(name)); return b; };

RANKS.forEach((r, i) => {
  const card = el('article', 'panel rank rv');
  card.style.setProperty('--i', i);
  const body = el('div');
  body.append(el('span', 'tag', 'RANGO ' + (i + 1)), el('h3', '', r.name), el('p', '', r.desc), el('p', 'req', 'Cómo se llega: ' + r.req));
  card.append(iconBox(r.icon), body);
  put('ranks', card);
});

AREAS.forEach((a) => {
  const card = el('article', 'panel area rv');
  const head = el('header');
  head.append(iconBox(a.icon), el('h3', '', a.name));
  const list = el('ul');
  a.roles.forEach(([name, desc]) => {
    const li = el('li');
    li.append(el('b', '', name), el('span', '', desc));
    list.append(li);
  });
  card.append(head, el('p', '', a.desc), list);
  put('areas', card);
});

RULES.forEach((t) => put('rules', el('li', 'panel rv', t)));

STEPS.forEach(([tag, title, text]) => {
  const s = el('div', 'panel step rv');
  s.append(el('b', '', tag), el('h3', '', title), el('p', '', text));
  put('steps', s);
});

const roleCount = AREAS.reduce((n, a) => n + a.roles.length, 0);
[[RANKS.length, 'rangos'], [AREAS.length, 'áreas'], [roleCount, 'roles']].forEach(([n, label]) => {
  const s = el('div', 'panel stat');
  s.append(el('b', '', String(n)), el('span', '', label));
  put('stats', s);
});

[['rol', 'Elige un rol...'], ['rol2', 'Ninguno']].forEach(([id, first]) => {
  const sel = document.getElementById(id);
  sel.append(new Option(first, ''));
  AREAS.forEach((a) => {
    const g = el('optgroup');
    g.label = a.name;
    a.roles.forEach(([name]) => g.append(new Option(name, name)));
    sel.append(g);
  });
});

const io = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.rv').forEach((n) => io.observe(n));
