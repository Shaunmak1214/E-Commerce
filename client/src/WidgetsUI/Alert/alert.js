import Slide from "react-reveal/Slide";
import React from "react";
import Alert from "react-bootstrap/Alert";

const AlertSlide = (props) => {
  return (
    <div className="fixed flex top-0 z-50 left-0 right-0 w-auto h-auto justify-center">
      <Slide when={props.showAlert} duration={500} top collapse>
        <div className="text-left">
          <Alert
            show={props.showAlert}
            variant={props.variant}
            dismissible
            onClose={() => props.onclose()}
            transition={false}
          >
            <Alert.Heading>{props.heading}</Alert.Heading>
            {props.body}
          </Alert>
        </div>
      </Slide>
    </div>
  );
};

export default AlertSlide;
