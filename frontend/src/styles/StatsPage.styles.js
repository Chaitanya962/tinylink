import styled from "styled-components";

export const Page = styled.div`
  max-width: 930px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
  background: linear-gradient(140deg, #fdf6f9 0%, #f3f5fc 60%, #e8eeff 100%);
`;

export const Card = styled.div`
  background: linear-gradient(120deg, #f7fafc 0%, #e9defa 50%, #d6e6fe 100%);
  border-radius: 8px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 8px rgba(37,99,235,0.12);
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatCard = styled.div`
  background: #f1f5f9;
  border-radius: 8px;
  padding: 1rem;
  text-align:center;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: .5rem;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: .55rem .9rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 0.55rem 1.1rem;
  border-radius: 6px;
  border: none;
  background: #2563eb;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  margin-left: .7rem;
`;

export const Error = styled.div`
  color: #dc2626;
  background: #fee2e2;
  border: 1px solid #fecaca;
  padding: 0.7rem 1.1rem;
  border-radius: .375rem;
  margin-bottom: 1.1rem;
`;
