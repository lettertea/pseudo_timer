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
          This online timer was created to use the WCA's official scrambling algorithm from <Link
          href="https://github.com/thewca/tnoodle" target="_blank" rel="noopener noreferrer">
          TNoodle
        </Link>. Unfortunately, the latest release I was able to implement was version <Link
          href="https://github.com/thewca/tnoodle/releases/tag/v0.14.0" target="_blank" rel="noopener noreferrer">
          v0.14.0
        </Link> as more recent releases adopt a new build system that does not generate the
          scrambling code in JavaScript. In the future, it may be worth it to manually port new releases into
          JavaScript, but it does not seem necessary for the time being as it appears that the scrambling code is mature
          and will not change drastically.
          <br/>
          <br/>

          Project source code: <Link href="https://github.com/nashkenazy/pseudo_timer" target="_blank"
                                     rel="noopener noreferrer">https://github.com/nashkenazy/pseudo_timer</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}