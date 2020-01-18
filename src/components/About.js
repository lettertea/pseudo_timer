import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function About() {

  return (
    <Card>
      <CardContent>
        <Typography variant={"body1"} color={"textSecondary"}>
          This online timer was created to use the WCA's official scrambling algorithm from <a
          href="https://github.com/thewca/tnoodle" target="_blank" rel="noopener noreferrer">
          TNoodle
        </a>. Unfortunately, the latest release I was able to implement was version <a
          href="https://github.com/thewca/tnoodle/releases/tag/v0.14.0" target="_blank" rel="noopener noreferrer">
          v0.14.0
        </a> as more recent releases adopts a new build system that does not generate the
          scrambling code in JavaScript. It may be worth it to port future releases into JavaScript manually, but it does
          not seem necessary for the time being as it appears that the scrambling code itself has not changed very much.
          <br/>
          <br/>

          Project source code:  <a href="https://github.com/nashkenazy/pseudo_timer" target="_blank" rel="noopener noreferrer">https://github.com/nashkenazy/pseudo_timer</a>
        </Typography>
      </CardContent>
    </Card>
  );
}