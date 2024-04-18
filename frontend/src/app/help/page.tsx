"use client";

import { Container, Typography } from "@mui/material";
import Markdown from 'markdown-to-jsx'
import test from "node:test";
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const testMarkdown = `

## Getting Started

First, run the development server:


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


`

export default function HelpManual() {
  // render(<Markdown># Hello world!</Markdown>, document.body)
  render(<Markdown children = {testMarkdown}/>, document.body)
  // const file_name = 'README.md';
  // const [post, setPost] = useState('');

  // useEffect(() => { 
  //     import(`./src/markdown/${file_name}`)
  //         .then(res => {
  //             fetch(res.default)
  //                 .then(res => res.text())
  //                 .then(res => setPost(res))
  //                 .catch(err => console.log(err));
  //         })
  //         .catch(err => console.log(err));
  // });

  // return (
  //   <div className="container">
  //     <Markdown>
  //         {post}
  //     </Markdown>
  //   </div>
  // );
}
