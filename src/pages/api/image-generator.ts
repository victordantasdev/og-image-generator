import { NextApiRequest, NextApiResponse } from 'next';
import { getScreenshot } from '../../../infra/getScreenShot';

interface Props {
  title: string | string[];
  titleFS: string | string[];
  titleC: string | string[];

  paragraph: string | string[];
  paragraphFS: string | string[];
  paragraphC: string | string[];

  background: string | string[];
  backgroundC: string | string[];
}

const getHTML = ({
  title,
  titleFS,
  titleC,

  paragraph,
  paragraphFS,
  paragraphC,

  background,
  backgroundC,
}: Props) => `
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
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: sans-serif;

        background-color: #${backgroundC};
        background-image: url(${background});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      h1 {
        font-size: ${titleFS}px;
        color: #${titleC};
        text-align: center;
      }

      p {
        font-size: ${paragraphFS}px;
        color: #${paragraphC};
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>${title}</h1>
    <p>${paragraph}</p>
  </body>
  </html>
`;

const imageGenerator = async (req: NextApiRequest, res: NextApiResponse) => {
  const isHTMLDebugMode = false;
  const html = getHTML({
    title: req.query.title || 'Sample Text',
    titleFS: req.query.tfs || '64',
    titleC: req.query.tc || '#ffffff',

    paragraph: req.query.p || '',
    paragraphFS: req.query.pfs || '32',
    paragraphC: req.query.pc || '#ffffff',

    background: req.query.bg || '',
    backgroundC: req.query.bgc || '#666666',
  });

  if (isHTMLDebugMode) {
    res.setHeader('Content-type', 'text/html');
    return res.end(html);
  }

  const file = await getScreenshot(html);
  res.setHeader('Content-type', 'image/png');
  return res.end(file);
};

export default imageGenerator;
