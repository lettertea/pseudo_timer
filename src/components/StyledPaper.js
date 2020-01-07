import Paper from "@material-ui/core/Paper";
import React from "react";


export default props => {
  return <Paper style={{
    textAlign: "center",
    height: props.height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...props.style
  }}>{props.children}</Paper>;
};
