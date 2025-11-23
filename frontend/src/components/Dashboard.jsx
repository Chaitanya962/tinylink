import React, { useState, useEffect } from 'react';
import { Container, SectionHeader, FlexRow } from '../styles/Dashboard.styles';
import AddLinkForm from './AddLinkForm';
import LinkTable from './LinkTable';

const API_URL = 'https://tinylink-backend-bp539pif5-chaitanyas-projects-e41e8888.vercel.app/';

function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchLinks(); }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${API_URL}/api/links`);
      const data = await resp.json();
      setLinks(data.links || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch links.');
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkAdded = () => fetchLinks();
  const handleDelete = async code => {
    if (!window.confirm('Delete this link?')) return;
    await fetch(`${API_URL}/api/links/${code}`, { method: 'DELETE' });
    fetchLinks();
  };

  return (
    <Container>
      <AddLinkForm onLinkAdded={handleLinkAdded} />
      <SectionHeader>
        <h2 style={{ margin: 0, fontSize: '1.18rem', color: '#374151' }}>
          All Links {links.length > 0 && `(${links.length})`}
        </h2>
        <button
          onClick={fetchLinks}
          style={{
            padding: '0.55rem 1.1rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontWeight: 500,
            fontSize: "1rem",
            cursor: 'pointer'
          }}
        >🔄 Refresh</button>
      </SectionHeader>
      {error && (
        <div style={{
          color: "#dc2626",
          background: "#fee2e2",
          padding: "0.8rem 1.3rem",
          borderRadius: "0.375rem",
          marginBottom: "1rem"
        }}>{error}</div>
      )}
      {loading
        ? <div style={{ textAlign: "center", color: "#6b7280" }}>Loading links...</div>
        : <LinkTable links={links} onDelete={handleDelete} />}
    </Container>
  );
}

export default Dashboard;
