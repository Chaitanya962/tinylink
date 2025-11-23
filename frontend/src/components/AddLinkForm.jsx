import React, { useState } from 'react';
import { Card, Label, Input, Button, ErrorBox, Success } from '../styles/AddLinkForm.styles';

const API_URL = 'https://tinylink-backend-one.vercel.app/';

function AddLinkForm({ onLinkAdded }) {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  setLoading(true);

  // --- Add protocol if missing ---
  let fixedUrl = url.trim();
  if (!/^https?:\/\//i.test(fixedUrl)) {
    fixedUrl = "https://" + fixedUrl;
  }
  // ------------------------------

  try {
    const response = await fetch(`${API_URL}/api/links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: fixedUrl, customCode: customCode || undefined })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create short link');
    setSuccess(`Short URL created: ${data.shortUrl}`);
    setUrl('');
    setCustomCode('');
    if (onLinkAdded) onLinkAdded();
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <Card>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
        Create Short Link
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Label>Original URL *</Label>
          <Input
          type="text"
          placeholder="e.g. google.com or https://google.com"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
          />
<small style={{ color: '#6b7280', fontSize: '0.8em', display: 'block', marginBottom: '1rem' }}>
  URL can start with http(s):// or just google.com – we’ll handle it for you.
</small>

        </div>
        <div>
          <Label>Custom Short Code (optional)</Label>
          <Input
            type="text"
            placeholder="mycode (6-8 characters, alphanumeric)"
            value={customCode}
            onChange={e => setCustomCode(e.target.value)}
            pattern="[A-Za-z0-9]{6,8}"
            maxLength={8}
          />
        </div>
        {error && <ErrorBox>{error}</ErrorBox>}
        {success && <Success>{success}</Success>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Shorten URL'}
        </Button>
      </form>
    </Card>
  );
}

export default AddLinkForm;
