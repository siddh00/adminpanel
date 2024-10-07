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
  //   Checkbox,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import "./index.css";

const CreateEmployee = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: null,
  });
  const [error, setError] = useState(null);

  const designations = ["HR", "Sales", "Manager"];
  const courseOptions = ["MCA", "BCA", "BSC"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle checkbox changes for courses
  const handleCourseChange = (event) => {
    setFormData({
      ...formData,
      course: event.target.value, // Update the selected course
    });
  };

  const handleImageChange = (e) => {
    // console.log(e.target.value);

    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/enterEmployeeDetails",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   console.log("formSubmit", formData);
      console.log("Response:", response.data);
      setOpen(false);
      setError(null);
      alert("Submitted Successfully");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: "",
        image: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          fontSize: "13px",
          padding: "3px6px",
          color: "brown",
          fontWeight: "700",
          backgroundColor: "transparent",
          border: "1px solid brown",

          "&:hover": {
            backgroundColor: "brown",
            color: "white",
            outline: "none",
            border: "none",
          },
        }}
        onClick={() => setOpen(true)}
      >
        Create Employee
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Registration Form</DialogTitle>
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
            <div>
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
            </div>

            {/* Course Checkbox Group */}
            <FormControl component="fieldset" margin="dense">
              <FormLabel component="legend">Courses</FormLabel>
              <Box display="flex" flexDirection="row">
                {courseOptions.map((course) => (
                  <FormControlLabel
                    key={course}
                    control={
                      <Radio
                        value={course}
                        checked={formData.course === course} // Check if the course is the selected one
                        onChange={handleCourseChange} // Handle change for radio selection
                      />
                    }
                    label={course}
                  />
                ))}
              </Box>
            </FormControl>

            {/* Image Upload */}
            <Box display="flex" alignItems="center" marginTop={2}>
              <input
                accept="image/*"
                id="icon-button-file"
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
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      </Dialog>
    </div>
  );
};

export default CreateEmployee;
