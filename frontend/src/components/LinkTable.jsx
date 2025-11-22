import React from 'react';
import { Table, Th, Td, Badge, ActionFlex, Button } from '../styles/LinkTable.styles';
import { Link } from 'react-router-dom';

function LinkTable({ links, onDelete }) {
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatDate = dateString =>
    dateString ? new Date(dateString).toLocaleString() : 'Never';

  if (!links || links.length === 0) {
    return (
      <div style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        marginTop: "1.5rem",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
      }}>
        <div style={{ textAlign: "center", color: "#6b7280" }}>
          <h3 style={{ fontWeight: 600 }}>No links yet</h3>
          <p>Create your first short link above!</p>
        </div>
      </div>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>Short Code</Th>
          <Th>Original URL</Th>
          <Th>Clicks</Th>
          <Th>Last Clicked</Th>
          <Th>Created</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {links.map(link => (
          <tr key={link.shortCode}>
            <Td>
              <Link 
                to={`/code/${link.shortCode}`}
                style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
              >
                {link.shortCode}
              </Link>
            </Td>
            <Td>
              <a
                href={link.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1e293b", textDecoration: "underline", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", display: "inline-block", whiteSpace: "nowrap" }}
              >
                {link.originalUrl}
              </a>
            </Td>
            <Td>
              <Badge>{link.clicks}</Badge>
            </Td>
            <Td style={{ fontSize: "0.88em", color: "#6b7280" }}>
              {formatDate(link.lastClicked)}
            </Td>
            <Td style={{ fontSize: "0.88em", color: "#6b7280" }}>
              {formatDate(link.createdAt)}
            </Td>
            <Td>
              <ActionFlex>
                <Button
                  variant="secondary"
                  onClick={() => copyToClipboard(link.shortUrl)}
                >
                  Copy
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onDelete(link.shortCode)}
                >
                  Delete
                </Button>
              </ActionFlex>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default LinkTable;
