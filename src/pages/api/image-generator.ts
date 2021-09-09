import { NextApiRequest, NextApiResponse } from 'next';
import { getScreenshot } from '../../../infra/getScreenShot';

interface Props {
  title: string | string[];
  bg: string | string[];
}

const getHTML = ({ title, bg }: Props) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        margin: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: sans-serif;

        background-color: #666;
        background-image: url(${bg});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      h1 {
        font-size: 7vw;
        color: #fff;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>${title}</h1>
  </body>
  </html>
`;

const imageGenerator = async (req: NextApiRequest, res: NextApiResponse) => {
  const isHTMLDebugMode = false;
  const html = getHTML({
    title: req.query.title || 'Sample Text',
    bg: req.query.bg || '',
  });

  if (isHTMLDebugMode) {
    res.setHeader('Content-type', 'text/html');
    return res.end(html);
  }

  // const file = await getScreenshot(html, { width: 1920, height: 1080 });
  const file = await getScreenshot(html);
  res.setHeader('Content-type', 'image/png');
  return res.end(file);
};

export default imageGenerator;
