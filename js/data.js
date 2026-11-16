// Contenido de la web: se edita acá, el HTML no se toca. Icono = nombre en js/pixel.js
const RANKS = [
  { name: 'Don', icon: 'crown', desc: 'Jefe de la familia. Su palabra es la última y no se discute.', req: 'Fundador del equipo.' },
  { name: 'Subjefe', icon: 'star', desc: 'Mano derecha del Don. Manda cuando el Don no está.', req: 'Lo elige el Don entre los Capos.' },
  { name: 'Consigliere', icon: 'scroll', desc: 'Consejero. No lidera tropas: aporta ideas, pactos y estrategia.', req: 'Confianza total del Don y mucha antigüedad.' },
  { name: 'Capo', icon: 'shield', desc: 'Lidera un crew y responde por cada uno de los suyos.', req: 'Dirigir un crew activo y probar lealtad.' },
  { name: 'Teniente', icon: 'chevrons', desc: 'Segundo del Capo. Organiza turnos, farmeo y raids.', req: 'Cumplir misiones sin que nadie se lo pida.' },
  { name: 'Soldado', icon: 'sword', desc: 'Miembro de pleno derecho. Cumple misiones y defiende la base.', req: 'Superar la prueba de Asociado.' },
  { name: 'Asociado', icon: 'coin', desc: 'Ya trabajó para la familia, pero todavía no tiene voto.', req: 'Mostrar actividad y obediencia como Recluta.' },
  { name: 'Recluta', icon: 'pickaxe', desc: 'Todos empiezan aquí: aprendes las reglas y demuestras qué sabes hacer.', req: 'Postularte y pasar la entrevista.' },
];

const AREAS = [
  { name: 'Finanzas', icon: 'coin', desc: 'El dinero de la familia: que entre, que se cuide y que no se note de dónde vino.', roles: [
    ['Tesorero', 'Lleva las cuentas y el cofre de la familia.'],
    ['Mercader', 'Compra, vende y negocia en el mercado del servidor.'],
    ['Lavador', 'Convierte el botín sucio en recursos limpios.'],
    ['Cobrador', 'Cobra la protección a otros jugadores y tiendas.'],
  ] },
  { name: 'Guerra', icon: 'sword', desc: 'La fuerza de la familia: ataque, defensa y todo lo que explota.', roles: [
    ['Comandante', 'Dirige la ofensiva en guerras y raids.'],
    ['Estratega', 'Planea rutas, tiempos y emboscadas.'],
    ['Combatiente', 'Primera línea en el PvP.'],
    ['Arquero', 'Ataca a distancia con arco, ballesta o tridente.'],
    ['Ingeniero de TNT', 'Cañones, trampas y redstone de guerra.'],
    ['Defensor de base', 'Guardia, vigilancia y trampas en casa.'],
  ] },
  { name: 'Sicarios', icon: 'skull', desc: 'Los encargos que nadie más quiere hacer.', roles: [
    ['Sicario', 'Elimina a los objetivos marcados por el Don.'],
    ['Sombra', 'Infiltración y sabotaje sin dejar rastro.'],
    ['Cazarrecompensas', 'Rastrea y captura a los jugadores marcados.'],
  ] },
  { name: 'Inteligencia', icon: 'eye', desc: 'Saber antes que los demás qué va a pasar.', roles: [
    ['Espía', 'Se infiltra en equipos rivales y reporta.'],
    ['Vigía', 'Explora y vigila coordenadas y movimientos.'],
    ['Informante', 'Reúne datos de bases y jugadores enemigos.'],
  ] },
  { name: 'Logística', icon: 'pickaxe', desc: 'Sin recursos y sin base no hay familia.', roles: [
    ['Minero', 'Consigue diamantes, netherite y todo lo que haga falta.'],
    ['Granjero', 'Comida, XP y granjas automáticas.'],
    ['Constructor', 'Levanta y decora bases, fortalezas y escondites.'],
    ['Herrero', 'Encantamientos, pociones y equipo para todos.'],
    ['Redstoner', 'Mecanismos, puertas secretas y sistemas automáticos.'],
  ] },
  { name: 'Diplomacia', icon: 'scroll', desc: 'Crecer y mantener la paz cuando conviene.', roles: [
    ['Reclutador', 'Trae gente nueva y la entrevista.'],
    ['Diplomático', 'Negocia pactos y alianzas con otros equipos.'],
  ] },
];

const RULES = [
  'Lealtad primero: la familia va antes que cualquier amistad.',
  'Omertà: lo que pasa en la familia no se cuenta afuera.',
  'Nada de robar ni griefear a los tuyos. Quien traiciona, sale.',
  'Respeto a la cadena de mando: al Capo se le obedece.',
  'Actividad: avisa si te ausentas o pierdes tu rango.',
  'Juego limpio: sin hacks, sin duplicar items, sin trampas.',
];

// Miembros de ejemplo (demo: true) para que la web no se vea vacía. Para dejar solo gente real:
// borrar las líneas con demo: true y sumar las reales. Todo (conteos, tarjetas) se recalcula solo.
const MEMBERS = [
  { nick: 'shobsito', rank: 'Don', role: 'Estratega', skin: '#ffdbac', hair: '#18181b' }, // skin/hair: cara a medida (opcional)
  { nick: 'darkwolf07', rank: 'Subjefe', role: 'Comandante', demo: true },
  { nick: 'minejavi151', rank: 'Consigliere', role: 'Diplomático', demo: true },
  { nick: 'canito241', rank: 'Capo', role: 'Tesorero', demo: true },
  { nick: 'shadow231crew', rank: 'Capo', role: 'Combatiente', demo: true },
  { nick: 'elnacho87', rank: 'Capo', role: 'Ingeniero de TNT', demo: true },
  { nick: 'tomas2301', rank: 'Teniente', role: 'Espía', demo: true },
  { nick: 'nightfox19', rank: 'Teniente', role: 'Combatiente', demo: true },
  { nick: 'franpro85', rank: 'Teniente', role: 'Mercader', demo: true },
  { nick: 'cande2216', rank: 'Teniente', role: 'Arquero', demo: true },
  { nick: 'juanma88', rank: 'Soldado', role: 'Redstoner', demo: true },
  { nick: 'nico2310', rank: 'Soldado', role: 'Minero', demo: true },
  { nick: 'elpibe334', rank: 'Soldado', role: 'Defensor de base', demo: true },
  { nick: 'gonza3017', rank: 'Soldado', role: 'Constructor', demo: true },
  { nick: 'santi5509', rank: 'Soldado', role: 'Cobrador', demo: true },
  { nick: 'mateo1203', rank: 'Soldado', role: 'Herrero', demo: true },
  { nick: 'ironmike305', rank: 'Soldado', role: 'Reclutador', demo: true },
  { nick: 'agus2007', rank: 'Asociado', role: 'Espía', demo: true },
  { nick: 'luchito45', rank: 'Asociado', role: 'Granjero', demo: true },
  { nick: 'facu1190', rank: 'Asociado', role: 'Vigía', demo: true },
  { nick: 'pixelcat88', rank: 'Asociado', role: 'Lavador', demo: true },
  { nick: 'ale4410', rank: 'Asociado', role: 'Ingeniero de TNT', demo: true },
  { nick: 'thiago0912', rank: 'Recluta', role: 'Minero', demo: true },
  { nick: 'benja7731', rank: 'Recluta', role: 'Arquero', demo: true },
  { nick: 'ramiro305', rank: 'Recluta', role: 'Combatiente', demo: true },
  { nick: 'kevin2008', rank: 'Recluta', role: 'Constructor', demo: true },
  { nick: 'lara1127', rank: 'Recluta', role: 'Informante', demo: true },
];

// Inscriptos de ejemplo: ya mandaron su postulación y esperan respuesta (estado: 'Entrevista' o 'En revisión').
// Mismo criterio que MEMBERS: borrar los demo: true y sumar los reales. Sin sicarios, a propósito.
const INSCRIPTOS = [
  { nick: 'enzo2209', role: 'Redstoner', estado: 'Entrevista', demo: true },
  { nick: 'damian417', role: 'Herrero', estado: 'Entrevista', demo: true },
  { nick: 'bauti0831', role: 'Minero', estado: 'Entrevista', demo: true },
  { nick: 'sofi1998', role: 'Mercader', estado: 'Entrevista', demo: true },
  { nick: 'maxi4545', role: 'Arquero', estado: 'En revisión', demo: true },
  { nick: 'eze2406', role: 'Constructor', estado: 'En revisión', demo: true },
  { nick: 'luli0707', role: 'Combatiente', estado: 'En revisión', demo: true },
  { nick: 'blazeking17', role: 'Vigía', estado: 'En revisión', demo: true },
  { nick: 'mica2203', role: 'Ingeniero de TNT', estado: 'En revisión', demo: true },
  { nick: 'tiziano77', role: 'Granjero', estado: 'En revisión', demo: true },
];

// Áreas que se están reclutando AHORA: salen marcadas "SE BUSCAN" y con botón de postulación.
// Sin sicarios entre los miembros a propósito: es el llamado. Cuando ya no hagan falta, vaciar la lista.
const HIRING = ['Sicarios'];

// [id de la sección, texto de la pestaña, icono]
const TABS = [
  ['inicio', 'Inicio', 'crown'],
  ['rangos', 'Rangos', 'star'],
  ['areas', 'Áreas', 'sword'],
  ['miembros', 'Miembros', 'users'],
  ['inscriptos', 'Inscriptos', 'list'],
  ['codigo', 'Código', 'scroll'],
  ['unirme', 'Unirme', 'shield'],
];
