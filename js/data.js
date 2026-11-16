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
  'Lealtad primero: la familia está por encima de cualquier amistad o discusión personal.',
  'Omertà: lo que pasa en la familia no se cuenta afuera. Ni bases, ni coordenadas, ni planes.',
  'Prohibido robar o griefear a los tuyos. Quien traiciona, sale y queda marcado.',
  'Respeto a la cadena de mando: se obedece al Capo y se consulta al Teniente.',
  'Actividad: avisa si te vas a ausentar. Quien desaparece sin avisar pierde su rango.',
  'Se juega limpio dentro de las reglas del servidor: sin hacks, sin duplicar items, sin trampas.',
];

const STEPS = [
  ['PASO 1', 'Postúlate', 'Completa el formulario con tu nick, tu Discord y el rol que quieres.'],
  ['PASO 2', 'Entrevista', 'Un Reclutador te escribe por Discord y charlan unos minutos.'],
  ['PASO 3', 'Prueba', 'Entras como Recluta y se sube de rango por mérito, no por tiempo.'],
];
