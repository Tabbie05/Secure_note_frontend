import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import EmojiPicker from "emoji-picker-react";
import { expirationOptions, textinfo } from "../constants";
import axios from "axios";
const NoteForm = () => {
  const [toggleinfo, settoggleinfo] = useState(false);
  const [toggleform, settoggleform] = useState(false);
  const [toggleaddfunc, settoggleaddfunc] = useState(false);
  const [toggleemojipicker, settoggleemojipicker] = useState(false);

  const navigate = useNavigate();
  const formikRef = useRef();

  const handleClickInfo = () => settoggleinfo((prev) => !prev);
  const handleShowForm = () => settoggleform((prev) => !prev);
  const handletoggleadd = () => settoggleaddfunc((prev) => !prev);
  const handletoggleEmopicker = () => settoggleemojipicker((prev) => !prev);

  const Yupschema = Yup.object({
    content: Yup.string().required("Note content is required"),
    notificationEmail: Yup.string().email("Invalid email"),
    password: Yup.string().min(5, "Password should be at least 5 characters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords do not match"
    ),
    linkTitle: Yup.string()
      .matches(
        /^[a-zA-Z0-9_-]+$/,
        "Only letters, numbers, dashes, and underscores allowed"
      )
      .min(3, "Must be at least 3 characters")
      .max(20, "Must be 20 characters or less"),
    destroyAfter: Yup.string().oneOf(expirationOptions, "Invalid option"),
    showWithoutConfirmation: Yup.boolean(),
  });

  const onEmojiClick = (emojiData) => {
    formikRef.current.setFieldValue(
      "content",
      formikRef.current.values.content + emojiData.emoji
    );
    settoggleemojipicker(false);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        content: "",
        destroyAfter: "After reading",
        notificationEmail: "",
        password: "",
        confirmPassword: "",
        showWithoutConfirmation: false,
        linkTitle: "",
      }}
      validationSchema={Yupschema}
      onSubmit={async (values, { setSubmitting }) => {
        const payload = {
          content: values.content,
          destroyAfter: values.destroyAfter,
          notificationEmail: values.notificationEmail,
          showWithoutConfirmation: values.showWithoutConfirmation,
          linkTitle: values.linkTitle,
          passwordHash: values.password,
        };
        try {
          const res = await axios.post(
            "http://localhost:3000/api/notes",
            payload
          );

          const gen_link = `http://localhost:5173/${res.data.noteId}`;
          console.log(gen_link);
          navigate("/viewnoteslink", { state: { link: gen_link } });
        } catch (error) {
          console.error("Failed to create note:", error);
        } finally {
          setSubmitting(false);
        }
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              minHeight: "90vh",
              backgroundColor: "#c2bfbfff",
              p: 2,
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                width: "100%",
                maxWidth: 800,
                px: 2,
              }}
            >
              {/* Top Bar */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  New Note
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={handleClickInfo}
                    sx={{
                      backgroundColor: "#fff",
                      borderColor: "black",
                      color: "black",
                      height: 50,
                      fontWeight: "bold",
                      fontSize: 18,
                      px: 2,
                      "&:hover": {
                        borderColor: "black",
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <QuestionMarkIcon />
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={handletoggleadd}
                    sx={{
                      backgroundColor: toggleaddfunc ? "#f0f0f0" : "#fff",
                      borderColor: "black",
                      color: "black",
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      height: 50,
                      px: 2,
                      "&:hover": {
                        borderColor: "black",
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Box>

              {/* Info Panel */}
              {toggleinfo && (
                <Paper
                  elevation={3}
                  sx={{
                    backgroundColor: "#fff8e1",
                    borderRadius: 2,
                    p: 2,
                    mt: 1,
                    width: "100%",
                    overflowY: "auto",
                    maxHeight: 240,
                    transition: "all 0.3s ease",
                    borderLeft: "5px solid #ffc107",
                    "&:hover": {
                      transform: "scale(1.01)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ pl: 1 }}>
                    <Typography variant="body2" paragraph>
                      {textinfo.intro}
                    </Typography>
                    <ol style={{ paddingLeft: "1.5em", marginTop: 0 }}>
                      {textinfo.steps.map((step, index) => (
                        <li key={index}>
                          <Typography variant="body2">{step}</Typography>
                        </li>
                      ))}
                    </ol>
                    <Typography variant="body2" paragraph sx={{ mt: 1 }}>
                      {textinfo.outro}
                    </Typography>
                    <ul style={{ paddingLeft: "1.5em", marginTop: 0 }}>
                      {textinfo.options.map((option, index) => (
                        <li key={index}>
                          <Typography variant="body2">{option}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                </Paper>
              )}

              {/* Text Area */}
              <Box sx={{ position: "relative", width: "100%", mt: 1 }}>
                <TextField
                  multiline
                  rows={12}
                  variant="filled"
                  placeholder="Enter your secure note..."
                  fullWidth
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.content && Boolean(errors.content)}
                  helperText={touched.content && errors.content}
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    boxShadow: 4,
                    "& .MuiFilledInput-root": {
                      fontSize: "1.25rem",
                      color: "#2C3E50",
                      borderRadius: 2,
                    },
                  }}
                />

                {/* Side Action Buttons */}
                {toggleaddfunc && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      zIndex: 5,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handletoggleEmopicker}
                      sx={{
                        backgroundColor: toggleemojipicker ? "#fff3e0" : "#fff",
                        borderColor: toggleemojipicker ? "#ff9800" : "#ddd",
                        color: "black",
                        fontSize: "1.2rem",
                        minWidth: 44,
                        height: 44,
                        boxShadow: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "#ff9800",
                          backgroundColor: "#fff3e0",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      😊
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        backgroundColor: "#fff",
                        borderColor: "#ddd",
                        color: "black",
                        fontSize: "1.2rem",
                        minWidth: 44,

                        height: 44,
                        boxShadow: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "#2196f3",
                          backgroundColor: "#e3f2fd",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      ✏️
                    </Button>
                  </Box>
                )}

                {toggleemojipicker && (
                  <>
                    <Box
                      sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 998,
                      }}
                      onClick={() => settoggleemojipicker(false)}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 60,
                        zIndex: 999,
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        backgroundColor: "white",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        width={320}
                        height={400}
                        searchDisabled={false}
                        skinTonesDisabled={false}
                        previewConfig={{ showPreview: false }}
                      />
                    </Box>
                  </>
                )}
              </Box>

              {/* Parameter Form Fields */}
              {toggleform && (
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    p: 2,
                    mt: 2,
                    width: "100%",
                    boxShadow: 3,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "600" }}>
                    Parameters
                  </Typography>

                  {/* Dropdown + Checkbox */}
                  <Stack
                    spacing={2}
                    direction={{ xs: "column", md: "row" }}
                    alignItems={{ xs: "flex-start", md: "center" }}
                  >
                    <FormControl
                      fullWidth
                      error={
                        touched.destroyAfter && Boolean(errors.destroyAfter)
                      }
                    >
                      <InputLabel id="expiration-label">
                        The note will self-destruct
                      </InputLabel>
                      <Select
                        labelId="expiration-label"
                        name="destroyAfter"
                        value={values.destroyAfter}
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
                        {touched.destroyAfter && errors.destroyAfter}
                      </FormHelperText>
                    </FormControl>

                    <FormControlLabel
                      control={
                        <Checkbox
                          name="showWithoutConfirmation"
                          checked={values.showWithoutConfirmation}
                          onChange={handleChange}
                        />
                      }
                      label="Do not ask for confirmation before showing and destroying the note."
                    />
                  </Stack>

                  {/* Password */}
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
                        name="password"
                        label="Enter the password to decrypt the note"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                      <TextField
                        fullWidth
                        name="confirmPassword"
                        label="Repeat password"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                    </Stack>
                  </Box>

                  {/* Destruction Notification */}
                  <Box mt={4}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                      Destruction notification
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                      E-mail to receive notification of the destruction of the
                      note.
                    </Typography>
                    <Stack
                      spacing={2}
                      direction={{ xs: "column", md: "row" }}
                      width="100%"
                    >
                      <TextField
                        fullWidth
                        name="notificationEmail"
                        label="Email"
                        type="email"
                        value={values.notificationEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.notificationEmail &&
                          Boolean(errors.notificationEmail)
                        }
                        helperText={
                          touched.notificationEmail && errors.notificationEmail
                        }
                      />
                      <TextField
                        fullWidth
                        name="linkTitle"
                        label="Note link title"
                        value={values.linkTitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.linkTitle && Boolean(errors.linkTitle)}
                        helperText={touched.linkTitle && errors.linkTitle}
                      />
                    </Stack>
                  </Box>
                </Box>
              )}

              {/* Bottom Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  mt: 3,
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#43464bff",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 18,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    boxShadow: 3,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#252525ff",
                      boxShadow: 6,
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  Create Note
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleShowForm}
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "black",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 18,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    boxShadow: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "black",
                      backgroundColor: "#f5f5f5",
                      boxShadow: 4,
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {toggleform ? "Hide Parameters" : "Show Parameters"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
