import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const API = "http://localhost:4000/api"; // Ajusta se necessário

  useEffect(() => {
  fetch(`${API}/employees`)
    .then(res => res.json())
    .then(data => {
      console.log("Employees:", data);
      setEmployees(data);
    })
    .catch(err => console.error("Erro ao buscar employees:", err));
}, []);

  const loadHolidays = (employeeId) => {
  fetch(`${API}/holidays/employee/${employeeId}`)
    .then(res => {
      if (!res.ok) throw new Error('Erro na API');
      return res.json();
    })
    .then(data => setHolidays(data))
    .catch(err => console.error('Erro ao carregar férias:', err));
};


  const submitHolidayRequest = () => {
    fetch(`${API}/holidays`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employee_id: selectedEmployee, start_date: startDate, end_date: endDate })
    })
    .then(res => res.json())
    .then(() => {
      loadHolidays(selectedEmployee);
      setStartDate('');
      setEndDate('');
    });
  };

  return (
    <div className="container">
      <h1>Gestão de Férias</h1>

      <div className="section">
        <label>Selecionar Funcionário:</label>
        <select
  value={selectedEmployee}
  onChange={(e) => {
    setSelectedEmployee(e.target.value);
    loadHolidays(e.target.value);
  }}
>
  <option value="">-- Escolher --</option>
  {employees.map(emp => (
    <option key={emp.id} value={emp.id}>
      {emp.name}
    </option>
  ))}
</select>

      </div>

      <div className="section">
        <label>Pedido de Férias:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <button
          onClick={submitHolidayRequest}
          disabled={!selectedEmployee || !startDate || !endDate}
        >
          Submeter
        </button>
      </div>

      <div className="section">
        <h2>Férias Atuais</h2>
        <ul>
          {holidays.map(h => (
            <li key={h.id}>
              {h.start_date} a {h.end_date} — <strong>{h.status}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
