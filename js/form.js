// Envía la postulación (nick, Discord, rol) al Worker, que la reenvía al canal de Discord.
const API = 'https://mafia-reclutamiento.gamma-automatizaciones.workers.dev';
const form = document.getElementById('form');
const msg = document.getElementById('msg');

const disc = form.elements.discord;
const noDisc = document.getElementById('nodiscord');

function say(text, ok) {
  msg.textContent = text;
  msg.className = 'msg ' + (ok ? 'ok' : 'err');
}

// "No tengo Discord": el campo queda con el texto "no tengo" y bloqueado (readonly, así viaja en el envío)
noDisc.addEventListener('change', () => {
  disc.readOnly = noDisc.checked;
  disc.value = noDisc.checked ? 'no tengo' : '';
  if (!noDisc.checked) disc.focus();
});

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
    disc.readOnly = false;
    say('Listo. Un Reclutador te contacta pronto.', true);
  } catch {
    say('No se pudo enviar. Prueba de nuevo en unos minutos.', false);
  }
  btn.disabled = false;
});
