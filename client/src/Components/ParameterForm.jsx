import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { expirationOptions } from "../constants";

function ParameterForm() {
  const [value, setValue] = useState(expirationOptions[0]); 
  const [checked, setChecked] = useState(false);
  const Yupschema = Yup.object({
    email: Yup.string().email("Invalid email"),
    passwrd: Yup.string().min(5, "Password should be at least 5 characters"),
    confirm_passwrd: Yup.string().oneOf(
      [Yup.ref("passwrd"), null],
      "Passwords do not match"
    ),
    customLinkTitle: Yup.string()
      .matches(
        /^[a-zA-Z0-9_-]+$/,
        "Only letters, numbers, dashes, and underscores allowed"
      )
      .min(3, "Must be at least 3 characters")
      .max(20, "Must be 20 characters or less"),
    expireopt: Yup.string().oneOf(expirationOptions, "Invalid option"),
    confirmation: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={{
        expireopt: "After reading",
        email: "",
        passwrd: "",
        confirm_passwrd: "",
        confirmation: false,
        customLinkTitle: "",
      }}
      validationSchema={Yupschema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form>
          {Object.keys(errors).length > 0 && (
            <Box mb={2} p={2} bgcolor="#ffe6e6" border="1px solid red">
              {Object.values(errors).map((msg, idx) => (
                <div key={idx} style={{ color: "red" }}>
                  {msg}
                </div>
              ))}
            </Box>
          )}

          <Box
            sx={{
              backgroundColor: "white",
              px: 2,
              py: 4,
              border: 2,
              borderRadius: 2,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            {/* Dropdown + Checkbox */}
            <Stack
              spacing={2}
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <FormControl
                fullWidth
                error={touched.expireopt && Boolean(errors.expireopt)}
              >
                <InputLabel id="expiration-label">
                  The note will self-destruct
                </InputLabel>
                <Select
                  labelId="expiration-label"
                  name="expireopt"
                  value={values.expireopt}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="The note will self-destruct"
                >
                  {expirationOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.expireopt && errors.expireopt}
                </FormHelperText>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    name="confirmation"
                    checked={values.confirmation}
                    onChange={handleChange}
                  />
                }
                label="Do not ask for confirmation before showing and destroying the note."
              />
            </Stack>

            {/* Secret Password */}
            <Box mt={4}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Secret password
              </Typography>
              <Stack
                spacing={2}
                direction={{ xs: "column", md: "row" }}
                width="100%"
              >
                <TextField
                  fullWidth
                  name="passwrd"
                  label="Enter the password to decrypt the note"
                  type="password"
                  value={values.passwrd}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.passwrd && Boolean(errors.passwrd)}
                  helperText={touched.passwrd && errors.passwrd}
                />
                <TextField
                  fullWidth
                  name="confirm_passwrd"
                  label="Repeat password"
                  type="password"
                  value={values.confirm_passwrd}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.confirm_passwrd && Boolean(errors.confirm_passwrd)
                  }
                  helperText={touched.confirm_passwrd && errors.confirm_passwrd}
                />
              </Stack>
            </Box>

            {/* Destruction Notification */}
            <Box mt={4}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                Destruction notification
              </Typography>
              <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                E-mail to receive notification of the destruction of the note.
              </Typography>
              <Stack
                spacing={2}
                direction={{ xs: "column", md: "row" }}
                width="100%"
              >
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  name="customLinkTitle"
                  label="Note link title"
                  value={values.customLinkTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.customLinkTitle && Boolean(errors.customLinkTitle)
                  }
                  helperText={touched.customLinkTitle && errors.customLinkTitle}
                />
              </Stack>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default ParameterForm;
