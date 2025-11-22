import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import StatsPage from "./components/StatsPage";
import { AppBackground, Header, LogoIcon, Title, PageCaption } from "./styles/App.styles";
import "./index.css";

function App() {
  return (
    <AppBackground>
      <Router>
        <Header>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: ".65rem"
            }}
          >
            <LogoIcon>🔗</LogoIcon>
            <Title>TinyLink</Title>
          </Link>
        </Header>
        <PageCaption>
          URL Shortener – Shorten URLs, Track Clicks, Manage Links
        </PageCaption>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<StatsPage />} />
        </Routes>
      </Router>
    </AppBackground>
  );
}

export default App;
