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
  { nick: 'shobsito', rank: 'Don', role: 'Estratega' },
  { nick: 'Matiasss', rank: 'Subjefe', role: 'Comandante', demo: true },
  { nick: 'JuanCruz', rank: 'Consigliere', role: 'Diplomático', demo: true },
  { nick: 'Facundo', rank: 'Capo', role: 'Tesorero', demo: true },
  { nick: 'ElTano', rank: 'Capo', role: 'Combatiente', demo: true },
  { nick: 'nachito', rank: 'Capo', role: 'Ingeniero de TNT', demo: true },
  { nick: 'lauta09', rank: 'Teniente', role: 'Espía', demo: true },
  { nick: 'Brian', rank: 'Teniente', role: 'Combatiente', demo: true },
  { nick: 'cande_', rank: 'Teniente', role: 'Mercader', demo: true },
  { nick: 'Tomi', rank: 'Teniente', role: 'Arquero', demo: true },
  { nick: 'Joaquin', rank: 'Soldado', role: 'Redstoner', demo: true },
  { nick: 'Rama', rank: 'Soldado', role: 'Minero', demo: true },
  { nick: 'Gonzalo22', rank: 'Soldado', role: 'Defensor de base', demo: true },
  { nick: 'Valen', rank: 'Soldado', role: 'Constructor', demo: true },
  { nick: 'Santiago', rank: 'Soldado', role: 'Cobrador', demo: true },
  { nick: 'Marcos', rank: 'Soldado', role: 'Herrero', demo: true },
  { nick: 'Julian', rank: 'Soldado', role: 'Reclutador', demo: true },
  { nick: 'Emi', rank: 'Asociado', role: 'Espía', demo: true },
  { nick: 'Lucho', rank: 'Asociado', role: 'Granjero', demo: true },
  { nick: 'Agustin', rank: 'Asociado', role: 'Vigía', demo: true },
  { nick: 'Mili', rank: 'Asociado', role: 'Lavador', demo: true },
  { nick: 'Cristian', rank: 'Asociado', role: 'Ingeniero de TNT', demo: true },
  { nick: 'Ale', rank: 'Recluta', role: 'Minero', demo: true },
  { nick: 'Tincho', rank: 'Recluta', role: 'Arquero', demo: true },
  { nick: 'Ramiro', rank: 'Recluta', role: 'Combatiente', demo: true },
  { nick: 'Pepe', rank: 'Recluta', role: 'Constructor', demo: true },
  { nick: 'Lara', rank: 'Recluta', role: 'Informante', demo: true },
];

// Inscriptos de ejemplo: ya mandaron su postulación y esperan respuesta (estado: 'Entrevista' o 'En revisión').
// Mismo criterio que MEMBERS: borrar los demo: true y sumar los reales. Sin sicarios, a propósito.
const INSCRIPTOS = [
  { nick: 'Thiago', role: 'Redstoner', estado: 'Entrevista', demo: true },
  { nick: 'Maxi', role: 'Herrero', estado: 'Entrevista', demo: true },
  { nick: 'luciana_09', role: 'Minero', estado: 'Entrevista', demo: true },
  { nick: 'Ezequiel', role: 'Mercader', estado: 'Entrevista', demo: true },
  { nick: 'Dami', role: 'Arquero', estado: 'En revisión', demo: true },
  { nick: 'Bauti', role: 'Constructor', estado: 'En revisión', demo: true },
  { nick: 'Sofi22', role: 'Combatiente', estado: 'En revisión', demo: true },
  { nick: 'Enzo', role: 'Vigía', estado: 'En revisión', demo: true },
  { nick: 'Kevin', role: 'Ingeniero de TNT', estado: 'En revisión', demo: true },
  { nick: 'Mica', role: 'Granjero', estado: 'En revisión', demo: true },
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
