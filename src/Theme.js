import { createMuiTheme } from "@material-ui/core/styles";
import { red, lightBlue } from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[600],
    },
    secondary: {
      main: lightBlue[500],
    },
    warn: {
      main: red[500],
    },
  },
});
