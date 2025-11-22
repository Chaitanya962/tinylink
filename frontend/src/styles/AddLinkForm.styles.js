import styled from 'styled-components';

export const Card = styled.div`
  background: linear-gradient(102deg, #f8fafc 0%, #e0e7ef 27%, #f6f3fe 70%, #d3eefd 100%);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 6px rgba(37,99,235,0.07);
`;
export const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.93rem;
`;
export const Input = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.93rem;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }
`;
export const Button = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.95rem;
  background: #2563eb;
  color: white;
  &:hover { opacity: 0.85; }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
export const ErrorBox = styled.div`
  color: #dc2626;
  background: #fee2e2;
  border: 1px solid #fecaca;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;
export const Success = styled.div`
  color: #059669;
  background: #d1fae5;
  border: 1px solid #a7f3d0;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;
