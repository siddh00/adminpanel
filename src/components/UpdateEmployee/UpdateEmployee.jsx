/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Box,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

const UpdateEmployee = (props) => {
  const {
    f_id,
    f_Image,
    f_Name,
    f_Email,
    f_Mobile,
    f_gender,
    f_Course,
    f_Designation,
  } = props.row;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: f_Name,
    email: f_Email,
    mobile: f_Mobile,
    designation: f_Designation,
    gender: f_gender,
    course: f_Course,
    image: f_Image,
  });
  const [error, setError] = useState(null);

  const designations = ["HR", "Sales", "Manager"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/editEmployeeDetails/${f_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      if (response.data.status === "success") {
        setOpen(false);
        setError(null);
        alert("Submitted Successfully");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  //   const handleEdit = () => {};

  return (
    <div>
      <Button
        variant="outlined"
        className="createbtn"
        color=""
        onClick={() => setOpen(true)}
        sx={{ padding: "0px", borderWidth: "0px" }}
      >
        {
          <IconButton
            onClick={() => setOpen(true)}
            title="edit"
            color="primary"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        }
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Form</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            {/* Name Field */}
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="outlined"
              required
            />

            {/* Email Field */}
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="outlined"
              required
            />

            {/* Mobile Number Field */}
            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="outlined"
              required
            />

            {/* Designation Dropdown */}
            <FormControl fullWidth margin="dense" variant="outlined">
              <InputLabel>Designation</InputLabel>
              <Select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                label="Designation"
                required
              >
                {designations.map((designation, index) => (
                  <MenuItem key={index} value={designation}>
                    {designation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Gender Radio Button */}
            <FormControl component="fieldset" margin="dense">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            {/* Course Field */}
            <TextField
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="outlined"
              required
            />

            {/* Image Upload */}
            <Box display="flex" alignItems="center" marginTop={2}>
              <input
                accept="image/*"
                id="icon-button-file"
                // value={`http://localhost:4000${f_Image}`}
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <span>
                {formData.image ? formData.image.name : "No file selected"}
              </span>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Submit
          </Button>
        </DialogActions>
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      </Dialog>
    </div>
  );
};

export default UpdateEmployee;
