import React, { useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';

const GeneratorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Home: NextPage = () => {
  const [infos, setInfos] = useState({
    title: '',
    bg: '',
  });

  const url = `/api/image-generator?title=${infos.title}&bg=${infos.bg}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.getAttribute('name');
    setInfos({
      ...infos,
      [`${fieldName}`]: e.target.value,
    });
  };

  return (
    <div>
      <h1>OG image generator</h1>

      <GeneratorWrapper>
        <input
          type="text"
          name="title"
          placeholder="Type the title"
          onChange={handleChange}
        />

        <input
          type="text"
          name="bg"
          placeholder="bg URL"
          onChange={handleChange}
        />
        <img
          src={url}
          alt=""
        />
        <output>
          {`<meta property="og:image" content="${url}" >`}
        </output>
      </GeneratorWrapper>
    </div>
  );
};

export default Home;
