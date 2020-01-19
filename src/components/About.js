import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";

export default function About() {

  return (
    <Card>
      <CardContent>
        <Typography variant={"body2"} color={"textSecondary"}>
          This online timer uses the WCA's official scrambling code from <Link
          href="https://github.com/thewca/tnoodle" target="_blank" rel="noopener noreferrer">
          TNoodle
        </Link>. Unfortunately, the latest release I was able to implement was version <Link
          href="https://github.com/thewca/tnoodle/releases/tag/v0.14.0" target="_blank" rel="noopener noreferrer">
          v0.14.0
        </Link> as more recent releases adopt a new build system that does not generate the
          scrambling code in JavaScript.

          <br/>
          <br/>

          The official scrambling code takes some time to generate scrambles, and it's more apparent with more complex puzzles like
          7x7x7 and Square-1. While generating the scramble, nothing else can be done, and the entire site will appear to
          be freezing up. This is expected behavior, and the timer attempts to mitigate this effect by displaying
          the new scramble while the next one generates.

          <br/>
          <br/>

          Project source code: <Link href="https://github.com/nashkenazy/pseudo_timer" target="_blank"
                                     rel="noopener noreferrer">https://github.com/nashkenazy/pseudo_timer</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}