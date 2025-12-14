const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export async function fetchGames() {
  const r = await fetch(`${BASE}/api/games`);
  if (!r.ok) throw new Error('Error al cargar juegos');
  return r.json();
}

export async function fetchGame(id) {
  const r = await fetch(`${BASE}/api/games/${id}`);
  if (!r.ok) throw new Error('Juego no encontrado');
  return r.json();
}

export async function createGame(payload) {
  const r = await fetch(`${BASE}/api/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error('No se pudo crear');
  return r.json();
}
