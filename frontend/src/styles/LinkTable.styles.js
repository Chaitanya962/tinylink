import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0 1.5rem 0;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.9rem;
  background: #f3f4f6;
  border-bottom: 2px solid #e5e7eb;
  font-size: 1rem;
  color: #374151;
`;

export const Td = styled.td`
  padding: 0.7rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.3em 0.8em;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 600;
`;

export const ActionFlex = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  font-size: 0.88rem;
  border: none;
  font-weight: 500;
  background: ${({variant}) => variant === 'danger' ? '#dc2626' : variant === 'secondary' ? '#6b7280' : '#2563eb'};
  color: #fff;
  cursor: pointer;
  transition: background .18s;
  &:hover { opacity: 0.86; }
`;
