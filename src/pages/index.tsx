/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 32px;
`;

const GeneratorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 900px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;

  &:first-child {
    margin-right: 8px;
  }

  &:last-child {
    margin-left: 8px;
    height: 90%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 12px 16px;
  outline: 0;
  border-radius: 8px;
  border: 2px solid #fafafa;

  &:focus, &:hover{
    border: 2px solid ${({ theme }) => theme.primary};
  }
`;

const CodeOutput = styled.code`
  margin-top: 16px;
  padding: 8px;
  background-color: ${({ theme }) => (theme.tertiary)};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
`;

const Footer = styled.div`
  a {
    color: ${({ theme }) => theme.color};
  }
`;

interface Props {
  env: 'development' | 'production' | 'test';
}

const Home: NextPage<Props> = ({ env }) => {
  const [infos, setInfos] = useState({
    title: '',
    titleFS: '',
    titleC: '#ffffff',

    paragraph: '',
    paragraphFS: '',
    paragraphC: '#ffffff',

    background: '',
    backgroundC: '#44475a',
  });

  const baseURL = env === 'development'
    ? 'http://localhost:3000'
    : 'https://og-image-generator-pi.vercel.app';
  const url = `${baseURL}/api/image-generator/?title=${infos.title}&tfs=${infos.titleFS}&tc=${infos.titleC.substring(1)}&p=${infos.paragraph}&pfs=${infos.paragraphFS}&pc=${infos.paragraphC.substring(1)}&bg=${infos.background}&bgc=${infos.backgroundC.substring(1)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.getAttribute('name');
    setInfos({
      ...infos,
      [`${fieldName}`]: e.target.value,
    });
  };

  return (
    <Container>
      <h1>OG image generator</h1>

      <GeneratorWrapper>

        <img
          src={url}
          style={{ width: '100%', marginBottom: '8px' }}
          alt=""
        />

        <InfoWrapper>
          <Info>
            <label htmlFor="title">Title:</label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Sample Text"
              onChange={handleChange}
            />
          </Info>

          <Info>
            <label htmlFor="titleFS">Title font size:</label>
            <Input
              type="number"
              id="titleFS"
              name="titleFS"
              placeholder="64px"
              onChange={handleChange}
            />
          </Info>

          <Info>
            <label htmlFor="titleC">Title Font color:</label>
            <Input
              type="color"
              id="titleC"
              name="titleC"
              value={infos.titleC}
              onChange={handleChange}
            />
          </Info>
        </InfoWrapper>

        <InfoWrapper>
          <Info>
            <label htmlFor="paragraph">Paragraph:</label>
            <Input
              type="text"
              id="paragraph"
              name="paragraph"
              placeholder="Some paragraph"
              onChange={handleChange}
            />
          </Info>

          <Info>
            <label htmlFor="paragraphFS">Paragraph font size:</label>
            <Input
              type="number"
              id="paragraphFS"
              name="paragraphFS"
              placeholder="32px"
              onChange={handleChange}
            />
          </Info>

          <Info>
            <label htmlFor="paragraphC">Paragraph font color:</label>
            <Input
              type="color"
              id="paragraphC"
              name="paragraphC"
              value={infos.paragraphC}
              onChange={handleChange}
            />
          </Info>
        </InfoWrapper>

        <InfoWrapper>
          <Info>
            <label htmlFor="paragraphC">Background URL:</label>
            <Input
              type="text"
              name="background"
              placeholder="https://img.com"
              onChange={handleChange}
            />
          </Info>

          <Info>
            <label htmlFor="backgroundC">Background color:</label>
            <Input
              type="color"
              id="backgroundC"
              name="backgroundC"
              value={infos.backgroundC}
              onChange={handleChange}
            />

          </Info>

        </InfoWrapper>

        <CodeOutput>
          {`<meta property="og:image" content="${url}" >`}
        </CodeOutput>
      </GeneratorWrapper>
      <Footer>
        Created by
        {' '}
        <a href="https://github.com/victordantasdev" target="_blank" rel="noreferrer">@victordantasdev</a>
      </Footer>
    </Container>
  );
};

export async function getStaticProps() {
  const env = process.env.NODE_ENV;
  return {
    props: {
      env,
    },
  };
}

export default Home;
