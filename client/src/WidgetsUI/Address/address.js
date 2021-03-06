import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import AdressEditor from "../AdressEditor/addresseditor";

const useStyles = makeStyles((theme) => ({
  edit: {
    backgroundColor: "#2f855a !important",
    outline: "none !important",
    border: "none !important",
    width: "90px",
    marginRight: "20px",
  },
  remove: {
    backgroundColor: "#ff0000 !important",
    outline: "none !important",
    border: "none !important",
    width: "auto",
  },
}));

const Address = ({
  details,
  checkable,
  checked,
  onCheck,
  onDelete,
  onSaveAddress,
  readOnly,
}) => {
  const classes = useStyles();

  const [openDialogue, setOpenDialogue] = useState(false);

  return (
    <div className="flex w-full items-start pb-3 mt-3">
      {checkable && (
        <div className="h-full">
          <Radio
            checked={checked}
            onChange={(e) => onCheck(e.target.checked)}
            color="primary"
          />
        </div>
      )}
      <div
        className={`flex-grow  bg-darktheme-900 rounded-lg flex flex-col p-2 pl-3`}
      >
        <div className="text-lg text-darktheme-300">{details.street}</div>
        <div className="text-lg text-darktheme-300">
          {details.city}, {details.state}
        </div>
        <div className="text-lg text-darktheme-300">{details.pincode}</div>
        {!readOnly && (
          <div className="w-full flex justify-end mt-3">
            <Button
              color="primary"
              variant="contained"
              classes={{ root: classes.edit }}
              onClick={() => setOpenDialogue(true)}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              color="primary"
              variant="contained"
              classes={{ root: classes.remove }}
              onClick={() => onDelete()}
              startIcon={<DeleteIcon />}
            >
              delete
            </Button>
          </div>
        )}
      </div>
      <AdressEditor
        address={{ ...details }}
        openDialogue={openDialogue}
        closeDialogue={() => setOpenDialogue(false)}
        onSaveAddress={(address) => onSaveAddress(address)}
      />
    </div>
  );
};

export default Address;
