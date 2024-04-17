"use client";

import { Container, Typography } from "@mui/material";
import Markdown from 'markdown-to-jsx'
import React, { useState, useEffect } from 'react';

export default function HelpManual() {

  const file_name = 'README.md';
  const [post, setPost] = useState('');

  useEffect(() => {
      import(`/Users/benmorgan/Documents/Code/ChargerSync/frontend/src/markdown/${file_name}`)
          .then(res => {
              fetch(res.default)
                  .then(res => res.text())
                  .then(res => setPost(res))
                  .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
  });

  return (
    <div className="container">
      <Markdown>
          {post}
      </Markdown>
    </div>
  );
}
