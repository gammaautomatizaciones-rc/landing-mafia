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
};

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
