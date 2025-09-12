// src/Fib.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Fib from './Fib';

// 测试 Fib 组件是否渲染
test('renders Fib component', () => {
  render(<Fib />);
  const headingElement = screen.getByText(/Fibonacci Calculator/i);
  expect(headingElement).toBeInTheDocument();
});

// 测试输入框是否存在
test('renders input field', () => {
  render(<Fib />);
  const inputElement = screen.getByLabelText(/Enter your index:/i);
  expect(inputElement).toBeInTheDocument();
});

// 测试提交按钮是否存在
test('renders submit button', () => {
  render(<Fib />);
  const buttonElement = screen.getByText(/Submit/i);
  expect(buttonElement).toBeInTheDocument();
});
