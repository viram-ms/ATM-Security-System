// import React from "react";
// import classNames from "classnames";
// import PropTypes from "prop-types";
// // @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
// import Snack from "@material-ui/core/Snackbar";
// import IconButton from "@material-ui/core/IconButton";
// // @material-ui/icons
// import Close from "@material-ui/icons/Close";
// // core components
// import snackbarContentStyle from "assets/jss/material-dashboard-react/components/snackbarContentStyle.jsx";

// function Snackbar({ ...props }) {
//   const {
//     classes,
//     message,
//     color,
//     close,
//     icon,
//     place,
//     open,
//     rtlActive,
//     handleClose
//   } = props;
//   var action = [];
//   const messageClasses = classNames({
//     [classes.iconMessage]: icon !== undefined
//   });
//   if (close !== undefined) {
//     action = [
//       <IconButton
//         className={classes.iconButton}
//         key="close"
//         aria-label="Close"
//         color="inherit"
//         onClick={() => handleClose}
//       >
//         <Close className={classes.close} />
//       </IconButton>
//     ];
//   }
//   return (
//     <Snack
//       anchorOrigin={{
//         vertical: place.indexOf("t") === -1 ? "bottom" : "top",
//         horizontal:
//           place.indexOf("l") !== -1
//             ? "left"
//             : place.indexOf("c") !== -1
//             ? "center"
//             : "right"
//       }}
//       autoHideDuration={6000}
//       open={open}
//       message={
//         <div>
//           {icon !== undefined ? <props.icon className={classes.icon} /> : null}
//           <span className={messageClasses}>{message}</span>
//         </div>
//       }
//       action={action}
//       ContentProps={{
//         classes: {
//           root: classes.root + " " + classes[color],
//           message: classes.message,
//           action: classNames({ [classes.actionRTL]: rtlActive })
//         }
//       }}
//     />
//   );
// }

// Snackbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   message: PropTypes.node.isRequired,
//   color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
//   close: PropTypes.bool,
//   icon: PropTypes.func,
//   place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
//   open: PropTypes.bool,
//   rtlActive: PropTypes.bool
// };

// export default withStyles(snackbarContentStyle)(Snackbar);

import React from "react";
import Snack from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from './SnackbarContent';

export const Snackbar = (props) => {
  return(
        <Snack
        
        style={{width: 500}}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={props.open}
        autoHideDuration={2500}
        onClose={props.handleClose}
        message={<span id="message-id" style={{fontSize: 32}}>{props.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            // className={classes.close}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}

      >
      <SnackbarContent
          onClose={props.handleClose}
          color="warning"
          message={props.message}
          close="true"
        />
        </Snack>
  )
}



export default Snackbar;
