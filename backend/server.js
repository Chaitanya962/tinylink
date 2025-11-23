const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { nanoid } = require('nanoid');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(cors({
  origin: '*',
}));
app.use(express.json());

const URL_REGEX = /^https?:\/\/.+/i;
const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

function isValidUrl(url) {
  try {
    new URL(url);
    return URL_REGEX.test(url);
  } catch {
    return false;
  }
}

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).json({
    ok: true,
    version: '1.0',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Create a new short link
app.post('/api/links', async (req, res) => {
  try {
    const { url, customCode } = req.body;

    if (!url || !isValidUrl(url)) {
      return res.status(400).json({
        error: 'Invalid URL format. Must start with http:// or https://'
      });
    }

    let shortCode;

    if (customCode) {
      if (!CODE_REGEX.test(customCode)) {
        return res.status(400).json({
          error: 'Custom code must be 6-8 alphanumeric characters'
        });
      }

      const existing = await prisma.url.findUnique({
        where: { shortCode: customCode }
      });

      if (existing) {
        return res.status(409).json({
          error: 'Short code already exists. Please choose another.'
        });
      }

      shortCode = customCode;
    } else {
      shortCode = nanoid(6);
    }

    const newLink = await prisma.url.create({
      data: { shortCode, originalUrl: url },
    });

    res.status(201).json({
      success: true,
      shortCode: newLink.shortCode,
      shortUrl: `${BASE_URL}/${newLink.shortCode}`,
      originalUrl: newLink.originalUrl,
      clicks: newLink.clicks,
      createdAt: newLink.createdAt
    });
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all links
app.get('/api/links', async (req, res) => {
  try {
    const links = await prisma.url.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      count: links.length,
      links: links.map(link => ({
        shortCode: link.shortCode,
        originalUrl: link.originalUrl,
        shortUrl: `${BASE_URL}/${link.shortCode}`,
        clicks: link.clicks,
        lastClicked: link.lastClicked,
        createdAt: link.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get one link by short code
app.get('/api/links/:code', async (req, res) => {
  try {
    const { code } = req.params;

    const link = await prisma.url.findUnique({
      where: { shortCode: code }
    });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json({
      success: true,
      link: {
        shortCode: link.shortCode,
        originalUrl: link.originalUrl,
        shortUrl: `${BASE_URL}/${link.shortCode}`,
        clicks: link.clicks,
        lastClicked: link.lastClicked,
        createdAt: link.createdAt
      }
    });
  } catch (error) {
    console.error('Error fetching link:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a short link by code
app.delete('/api/links/:code', async (req, res) => {
  try {
    const { code } = req.params;

    const link = await prisma.url.findUnique({
      where: { shortCode: code }
    });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    await prisma.url.delete({
      where: { shortCode: code }
    });

    res.json({
      success: true,
      message: 'Link deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Redirect endpoint for short link
app.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;

    const reservedPaths = ['api', 'healthz', 'code', 'favicon.ico'];
    if (reservedPaths.includes(code)) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (!CODE_REGEX.test(code)) {
      return res.status(404).json({ error: 'Invalid short code' });
    }

    const link = await prisma.url.findUnique({
      where: { shortCode: code }
    });

    if (!link) {
      return res.status(404).json({ error: 'Short link not found' });
    }

    await prisma.url.update({
      where: { shortCode: code },
      data: {
        clicks: { increment: 1 },
        lastClicked: new Date()
      }
    });

    res.redirect(302, link.originalUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Local server only: listen
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 TinyLink Server running on ${BASE_URL}`);
    console.log(`📊 Health check: ${BASE_URL}/healthz`);
  });

  process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

// Export for Vercel serverless deployment
module.exports = app;
