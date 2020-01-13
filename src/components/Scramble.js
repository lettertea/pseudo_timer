import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

class Scramble extends Component {

 render() {
   return (
     <Typography
       variant={"body1"}
       color={"textSecondary"}
       style={{ marginBottom: 80 }}
     >
       {this.props.scramble}
     </Typography>
   );
 }
}


export default connect(state => ({
  scramble: state.scramble
}))(Scramble);
