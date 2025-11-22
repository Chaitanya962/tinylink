import styled from "styled-components";

export const AppBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
`;

export const Header = styled.header`
  background: linear-gradient(135deg, #a9dbd9ff 0%, #fed6e3 100%);
  box-shadow: 0 3px 24px #b3bcf522, 0 1.5px 0 #ece9fa;
  border-bottom: 2px solid #e0e7ff;
  padding: 2rem 0 1.1rem 0;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;    /* <--- Center horizontally */
  gap: 1.2rem;
`;


export const LogoIcon = styled.span`
  font-size: 2.45rem;
  margin-left: .3rem;
  color: #9d6dcb;
  filter: drop-shadow(0px 2px 2px #d1d5df50);
`;

export const Title = styled.h1`
  font-size: 2.22rem;
  font-weight: 700;
  color: #9333ea;
  margin: 0;
`;

export const PageCaption = styled.p`
  color: #475569;
  margin: 0 auto 2.6rem auto;
  padding: 1.1rem 0 0.65rem 0;
  font-size: 1.14rem;
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.01em;
  max-width: 600px;
`;
