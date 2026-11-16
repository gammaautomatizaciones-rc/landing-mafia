// Iconos pixel art 8x8 (se dibujan con SVG, sin librerías) y fondo de piedra tipo Minecraft.
const ICONS = {
  crown: ['#..##..#', '#..##..#', '##.##.##', '########', '########', '.######.', '.######.', '........'],
  star: ['...##...', '...##...', '########', '.######.', '..####..', '.######.', '.##..##.', '.#....#.'],
  scroll: ['########', '##....##', '#.#..#.#', '#..##..#', '#......#', '#......#', '########', '........'],
  shield: ['########', '###..###', '########', '########', '.######.', '.######.', '..####..', '...##...'],
  chevrons: ['#......#', '.#....#.', '..#..#..', '...##...', '#......#', '.#....#.', '..#..#..', '...##...'],
  sword: ['.......#', '......##', '.....##.', '....##..', '#..##...', '.####...', '..##....', '.#..#...'],
  coin: ['..####..', '.######.', '###..###', '##.##.##', '##.##.##', '###..###', '.######.', '..####..'],
  pickaxe: ['.######.', '##....##', '#..#...#', '...#....', '...#....', '...#....', '...#....', '...#....'],
  skull: ['.######.', '########', '#..##..#', '#..##..#', '########', '.######.', '.#.##.#.', '........'],
  eye: ['........', '..####..', '.#....#.', '#..##..#', '#..##..#', '.#....#.', '..####..', '........'],
  list: ['#.#####.', '........', '#.#####.', '........', '#.#####.', '........', '#.####..', '........'],
  users: ['.##..##.', '.##..##.', '........', '###..###', '###..###', '###..###', '###..###', '........'],
};

// Cara pixel estilo Minecraft, distinta por nick (colores sacados de un hash del nombre)
const SKINS = ['#c58c5c', '#e0ac69', '#8d5524', '#f1c27d', '#ffdbac'];
const HAIRS = ['#3b2a1a', '#18181b', '#6b4423', '#c9a227', '#8a1c1c', '#d4d4d8'];
function avatar(nick) {
  let h = 0;
  for (const c of nick) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const skin = SKINS[h % SKINS.length], hair = HAIRS[(h >> 3) % HAIRS.length];
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 8 8');
  svg.setAttribute('shape-rendering', 'crispEdges');
  svg.setAttribute('aria-hidden', 'true');
  const px = (x, y, w, fill) => {
    const r = document.createElementNS(ns, 'rect');
    r.setAttribute('x', x); r.setAttribute('y', y); r.setAttribute('width', w); r.setAttribute('height', 1);
    r.setAttribute('fill', fill);
    svg.append(r);
  };
  for (let y = 0; y < 8; y++) px(0, y, 8, y < 2 ? hair : skin);
  px(0, 2, 2, hair); px(6, 2, 2, hair);
  px(1, 4, 1, '#fff'); px(2, 4, 1, '#3b4fa0'); px(5, 4, 1, '#3b4fa0'); px(6, 4, 1, '#fff');
  px(3, 6, 2, '#7a3b2e');
  return svg;
}

function pixelIcon(name) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 8 8');
  svg.setAttribute('shape-rendering', 'crispEdges');
  svg.setAttribute('aria-hidden', 'true');
  let d = '';
  ICONS[name].forEach((row, y) => [...row].forEach((c, x) => { if (c === '#') d += `M${x} ${y}h1v1h-1z`; }));
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', d);
  path.setAttribute('fill', 'currentColor');
  svg.append(path);
  return svg;
}

(() => {
  const c = document.createElement('canvas');
  c.width = c.height = 16;
  const g = c.getContext('2d');
  for (let x = 0; x < 16; x++) for (let y = 0; y < 16; y++) {
    const v = 14 + Math.floor(Math.random() * 16);
    g.fillStyle = `rgb(${v},${v},${v + 2})`;
    g.fillRect(x, y, 1, 1);
  }
  document.body.style.backgroundImage = `url(${c.toDataURL()})`;
  document.body.style.backgroundSize = '128px';
})();
