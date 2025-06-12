import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza o título da aplicação', () => {
  render(<App />);
  const titleElement = screen.getByText(/gestão de férias/i);
  expect(titleElement).toBeInTheDocument();
});

test('renderiza o seletor de funcionário', () => {
  render(<App />);
  const selectLabel = screen.getByText(/selecionar funcionário/i);
  expect(selectLabel).toBeInTheDocument();
});

test('renderiza o botão de submeter', () => {
  render(<App />);
  const button = screen.getByText(/submeter/i);
  expect(button).toBeInTheDocument();
});
