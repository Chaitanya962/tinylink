import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Page, Card, StatsGrid, StatCard, Label, Input, Button, Error } from '../styles/StatsPage.styles';

const API_URL = 'https://tinylink-backend-one.vercel.app/';

function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchStats(); }, [code]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${API_URL}/api/links/${code}`);
      const data = await resp.json();
      if (!data.success) throw new Error(data.error || "Not found");
      setLink(data.link);
      setError("");
    } catch (err) {
      setError(err.message);
      setLink(null);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatDate = str => str ? new Date(str).toLocaleString() : "Never";

  if (loading) return <Page><div style={{textAlign:'center',color:'#6b7280'}}>Loading link statistics...</div></Page>;
  if (error) return (
    <Page>
      <Error>{error}</Error>
      <Link to="/" style={{textDecoration:'none',color:'#2563eb',fontWeight:500}}>&larr; Back to Dashboard</Link>
    </Page>
  );

  return (
    <Page>
      <Link to="/" style={{textDecoration:'none',color:'#2563eb',fontWeight:500,marginBottom:'1.2rem',display:'inline-block'}}>&larr; Back to Dashboard</Link>
      <Card>
        <h2 style={{marginBottom:'1.6rem',fontSize:'1.45rem'}}>Link Statistics: {link.shortCode}</h2>
        <StatsGrid>
          <StatCard>
            <div style={{color:'#6b7280',fontSize:'.99em',marginBottom:'0.3em'}}>Total Clicks</div>
            <div style={{fontWeight:700,fontSize:'1.37em'}}>{link.clicks}</div>
          </StatCard>
          <StatCard>
            <div style={{color:'#6b7280',fontSize:'.99em',marginBottom:'0.3em'}}>Created</div>
            <div>{formatDate(link.createdAt)}</div>
          </StatCard>
          <StatCard>
            <div style={{color:'#6b7280',fontSize:'.99em',marginBottom:'0.3em'}}>Last Clicked</div>
            <div>{formatDate(link.lastClicked)}</div>
          </StatCard>
        </StatsGrid>
        <div>
          <Label>Short URL</Label>
          <div style={{display:'flex',alignItems:'center',gap:'0.7rem'}}>
            <Input value={link.shortUrl} readOnly style={{flex:1}}/>
            <Button type="button" onClick={()=>copyToClipboard(link.shortUrl)}>Copy</Button>
          </div>
        </div>
        <div style={{marginTop:'1rem'}}>
          <Label>Original URL</Label>
          <div style={{display:'flex',alignItems:'center',gap:'0.7rem'}}>
            <Input value={link.originalUrl} readOnly style={{flex:1}}/>
            <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
              <Button type="button" style={{background:'#6b7280'}}>Visit</Button>
            </a>
          </div>
        </div>
        <div style={{marginTop:'2rem'}}>
          <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">
            <Button type="button">Test Redirect &rarr;</Button>
          </a>
        </div>
      </Card>
    </Page>
  );
}
export default StatsPage;
