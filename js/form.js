// Envía la postulación al Worker, que la reenvía al canal de Discord (el webhook no está acá).
const API = 'https://mafia-reclutamiento.gamma-automatizaciones.workers.dev';
const form = document.getElementById('form');
const msg = document.getElementById('msg');

function say(text, ok) {
  msg.textContent = text;
  msg.className = 'msg ' + (ok ? 'ok' : 'err');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const btn = form.querySelector('button[type=submit]');
  btn.disabled = true;
  say('Enviando...', true);
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    say('Postulación enviada. Un Reclutador te va a escribir por Discord.', true);
  } catch {
    say('No se pudo enviar. Prueba de nuevo en unos minutos.', false);
  }
  btn.disabled = false;
});
