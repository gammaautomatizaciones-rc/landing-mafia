// Contenido de la web: se edita acá, el HTML no se toca. Icono = nombre en js/pixel.js
const RANKS = [
  { name: 'Don', icon: 'crown', desc: 'El jefe de todo. Manda sobre toda la familia.', resp: 'A nadie.' },
  { name: 'Subjefe', icon: 'star', desc: 'El que sigue al Don cuando él no está.', resp: 'Al Don.' },
  { name: 'Teniente', icon: 'chevrons', desc: 'Se encarga de ir a las guerras y organizar a los soldados. También lleva a cabo las ejecuciones.', resp: 'Al Subjefe y al Don.' },
  { name: 'Soldado', icon: 'sword', desc: 'Miembro de pleno derecho que pelea: algunos en PvP cuerpo a cuerpo y otros a distancia con armas de fuego.', resp: 'Al Teniente, al Subjefe o al Don.' },
  // buscan: rol que se preselecciona en el formulario. Quitarlo cuando ya no hagan falta.
  { name: 'Sicario', icon: 'skull', desc: 'Independiente de la cadena de mando. Hace las ejecuciones y los encargos difíciles.', resp: 'Solo al Don.', buscan: 'Sicario' },
  { name: 'Asociado', icon: 'coin', desc: 'Por debajo del Soldado. Solo mineros y granjeros.', resp: 'A los Soldados y a sus superiores.' },
  { name: 'Recluta', icon: 'pickaxe', desc: 'También por debajo del Soldado. Solo mineros y granjeros: consiguen los recursos y plantan.', resp: 'A los Soldados y a sus superiores.' },
];
const AREAS = [
  { name: 'Finanzas', icon: 'coin', desc: 'El dinero de la familia: que entre, que se cuide y que no se note de dónde vino.', roles: [
    ['Tesorero', 'Lleva las cuentas y el cofre de la familia.'],
    ['Mercader', 'Compra, vende y negocia en el mercado del servidor.'],
    ['Lavador', 'Convierte el botín sucio en recursos limpios.'],
    ['Cobrador', 'Cobra la protección a otros jugadores y tiendas.'],
  ] },
  { name: 'Guerra', icon: 'sword', desc: 'PvP, armas de fuego, defensa y todo lo que explota.', roles: [
    ['Comandante', 'Dirige la ofensiva en guerras y raids.'],
    ['Estratega', 'Planea rutas, tiempos y emboscadas.'],
    ['Combatiente', 'Pelea cuerpo a cuerpo (PvP).'],
    ['Tirador', 'Pelea a distancia con armas de fuego.'],
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
  'Respeto a la cadena de mando: se obedece al Teniente, al Subjefe y al Don.',
  'Actividad: avisa si te ausentas o pierdes tu rango.',
  'Juego limpio: sin hacks, sin duplicar items, sin trampas.',
];

// Miembros de ejemplo (demo: true) para que la web no se vea vacía. Para dejar solo gente real:
// borrar las líneas con demo: true y sumar las reales. Todo (conteos, tarjetas) se recalcula solo.
const MEMBERS = [
  { nick: 'shobsito', rank: 'Don', role: 'Estratega', skin: '#ffdbac', hair: '#18181b' }, // skin/hair: cara a medida (opcional)
  { nick: 'wolfdark13', rank: 'Subjefe', role: 'Comandante', demo: true },
  { nick: 'n1colas99', rank: 'Teniente', role: 'Combatiente', demo: true },
  { nick: 'minejavi151', rank: 'Soldado', role: 'Combatiente', demo: true },
  { nick: 'canito241', rank: 'Soldado', role: 'Tirador', demo: true },
  { nick: 'shadow231crew', rank: 'Soldado', role: 'Tirador', demo: true },
  { nick: 'facu762elpro', rank: 'Soldado', role: 'Combatiente', demo: true },
  { nick: 'juancho_77', rank: 'Soldado', role: 'Tirador', demo: true },
  { nick: 'ElNico310', rank: 'Soldado', role: 'Combatiente', demo: true },
  { nick: 'gonzaaa17', rank: 'Soldado', role: 'Combatiente', demo: true },
];
// Inscriptos de ejemplo: ya mandaron su postulación y esperan respuesta (estado: 'Entrevista' o 'En revisión').
// Mismo criterio que MEMBERS: borrar los demo: true y sumar los reales. Sin sicarios, a propósito.
const INSCRIPTOS = [
  { nick: 'enzoo_09', role: 'Redstoner', estado: 'Entrevista', demo: true },
  { nick: 'damian417', role: 'Herrero', estado: 'Entrevista', demo: true },
  { nick: 'BautiPro', role: 'Minero', estado: 'Entrevista', demo: true },
  { nick: 'sofi_1998', role: 'Mercader', estado: 'Entrevista', demo: true },
  { nick: 'maxiking', role: 'Tirador', estado: 'En revisión', demo: true },
  { nick: 'ezeee24', role: 'Constructor', estado: 'En revisión', demo: true },
  { nick: 'lulita_07', role: 'Combatiente', estado: 'En revisión', demo: true },
  { nick: 'blazeking17', role: 'Vigía', estado: 'En revisión', demo: true },
  { nick: 'xMica', role: 'Ingeniero de TNT', estado: 'En revisión', demo: true },
  { nick: 'tizi_77', role: 'Granjero', estado: 'En revisión', demo: true },
];

// Áreas que se están reclutando AHORA: salen marcadas "SE BUSCAN" y con botón de postulación.
// Sin sicarios entre los miembros a propósito: es el llamado. Cuando ya no hagan falta, vaciar la lista.
const HIRING = ['Sicarios'];

// Opciones del selector "Rol que quieres" del formulario: [valor que se guarda, texto que se ve].
// Corto a propósito (orden de Gastón): Recluta y Asociado son solo mineros y granjeros; el resto, a pelear o a ser sicario.
const APPLY = [
  ['Combatiente', 'Combatiente (PvP)'],
  ['Tirador', 'Tirador (armas de fuego)'],
  ['Sicario', 'Sicario'],
  ['Minero', 'Minero'],
  ['Granjero', 'Granjero'],
];

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
