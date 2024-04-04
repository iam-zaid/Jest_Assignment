import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import List from './components/list';
import Item from './components/item';

// Test case 1: Check if the App component renders without crashing
test('renders App component without crashing', () => {
  render(<App />);
  expect(screen.getByText(/Hello Canada/i)).toBeInTheDocument();
});

// Test case 2: Check if the List component renders data correctly
test('renders List component with data', () => {
  const mockData = [
    { name: 'Ontario', capital: 'Toronto', flagUrl: 'some-url' },
  ];
  render(<List data={mockData} />);
  expect(screen.getByText(/Ontario/i)).toBeInTheDocument();
});

// Test case 3: Check if the Item component toggles capital on button click
test('toggles capital on button click in Item component', () => {
  const mockItem = { name: 'Quebec', capital: 'Quebec City', flagUrl: 'some-url' };
  render(<Item {...mockItem} />);
  const button = screen.getByText(/Show Capital/i);
  fireEvent.click(button);
  expect(screen.getByText(/Quebec City/i)).toBeInTheDocument();
  fireEvent.click(button);
  expect(screen.queryByText(/Quebec City/i)).toBeNull();
});

// Test case 4: Ensure menu item clicks do not cause errors
test('menu item clicks do not cause errors in App component', () => {
  render(<App />);
  const provincesMenu = screen.getByText(/Provinces/i);
  expect(provincesMenu).toBeInTheDocument();

  // Since we can't verify the actual data change without an API call,
  // we'll just simulate the click and ensure no errors are thrown
  expect(() => {
    fireEvent.click(provincesMenu);
  }).not.toThrow();
});


// Test case 5: Check if the App component correctly displays the menu
test('checks if the App component correctly displays the menu', () => {
  render(<App />);
  expect(screen.getByText(/Provinces/i)).toBeInTheDocument();
  expect(screen.getByText(/Territories/i)).toBeInTheDocument();
});

