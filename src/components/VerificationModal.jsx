import React, { useState } from "react";
import { Modal, Typography, Button, TextField } from "@mui/material";
import Link from "next/link";

const VerificationModal = ({
  open,
  handleClose,
  handleVerificationSuccess,
  selectedRow,
}) => {
  const [validationCode, setValidationCode] = useState("");
  const [error, setError] = useState("");

  // Mock validation codes for demonstration
  const validCodes = ["VC00000001", "VC00000002"]; // Example codes

  const handleValidation = () => {
    if (validCodes.includes(validationCode)) {
      // Proceed with verification logic
      console.log("Vendor verified successfully!");
      handleVerificationSuccess(validationCode); // Update the row data
      setError("");
      handleClose(); // Close modal on successful verification
    } else {
      setError("Invalid validation code. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg shadow-xl p-4 max-w-lg w-full">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Verify Vendor
            </Typography>
            <Typography id="modal-modal-description" className="mt-2">
              Please enter the validation code to verify the vendor.
            </Typography>
            <TextField
              label="Validation Code"
              variant="outlined"
              fullWidth
              className="mt-4"
              value={validationCode}
              onChange={(e) => setValidationCode(e.target.value)}
              error={!!error}
              helperText={error}
            />
            <Button
              onClick={handleValidation}
              variant="contained"
              color="primary"
              className="mt-4"
            >
              Verify
            </Button>
            <Button onClick={handleClose} className="mt-4">
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default VerificationModal;
