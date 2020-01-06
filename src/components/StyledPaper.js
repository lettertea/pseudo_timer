import Paper from "@material-ui/core/Paper";
import React from "react";


export default props => {
  return <Paper style={{
    textAlign: "center",
    height: props.height,
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    ...props.style
  }}>{props.children}</Paper>;
};
