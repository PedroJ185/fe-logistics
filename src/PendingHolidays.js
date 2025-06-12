import React, { useEffect, useState } from 'react';

const API = "http://localhost:4000/api";

export default function PendingHolidays() {
  const [pendingHolidays, setPendingHolidays] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = () => {
    fetch(`${API}/holidays/pending`)
      .then(res => res.json())
      .then(data => setPendingHolidays(data))
      .catch(err => console.error('Erro ao buscar férias pendentes:', err));
  };

  const cancelHoliday = (id) => {
    if (!window.confirm("Tens a certeza que queres cancelar estas férias?")) return;

    fetch(`${API}/holidays/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao cancelar férias');
        fetchPending();
      })
      .catch(err => console.error(err));
  };

  const confirmHoliday = (id) => {
    if (!window.confirm("Confirmar este pedido de férias?")) return;

    fetch(`${API}/holidays/${id}/confirm`, { method: 'PUT' })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao confirmar férias');
        fetchPending();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h1>Pedidos de Férias Pendentes</h1>
      {pendingHolidays.length === 0 && <p>Não há pedidos pendentes.</p>}
      <ul>
        {pendingHolidays.map(h => (
          <li key={h.id}>
            Funcionário ID: {h.employee_id} — {h.start_date} a {h.end_date}
            <button onClick={() => confirmHoliday(h.id)}>Confirmar</button>
            <button onClick={() => cancelHoliday(h.id)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
