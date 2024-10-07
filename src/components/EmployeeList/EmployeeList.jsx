// import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateEmployee from "../CreateEmployee/CreateEmployee";
// import { Link } from "react-router-dom";
import "./index.css";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@mui/material/IconButton";
import UpdateEmployee from "../UpdateEmployee/UpdateEmployee";

import { useState, useEffect } from "react";
import axios from "axios";
import { convertDate } from "../../Utils/constants/helper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function CustomizedTables() {
  //   const [employeesList, setEmployeeList] = useState([]);
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  useEffect(() => {
    // Filter rows whenever searchText changes
    const results = rows.filter((item) =>
      item.f_Name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRows(results);
  }, [searchText, rows]); // Dependencies: searchText and rows

  const options = {
    // 'Authorization': 'Bearer myToken',
    "Content-Type": "application/json",
  };

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/getEmployeeDetails",
        options
      );
      setRows(response.data.data);
      console.log("Employee Details:", response.data.data);
      // setEmployeeList()
    } catch (error) {
      console.error("Error fetching employee details:", error);
      throw error;
    }
  };

  //   const handleSearchText = (e) => {
  //     setSearchText(e.target.value);
  //     console.log(searchText);
  //     const filteredRows = rows.filter((item) =>
  //       item.f_Name.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //     setRows(filteredRows);
  //   };
  const handleSearchText = (e) => {
    setSearchText(e.target.value); // Update the search text state
  };

  const handleDelete = async (id) => {
    // console.log(e.target.id);

    const response = await axios.delete(
      `http://localhost:4000/deleteEmployeeDetails/${id}`
    );
    console.log(response.data);
  };

  return (
    <div className="employeeListUicontainer">
      <div className="createAndSearchcontainer">
        <p className="totalCount">
          Total Count : <b>{filteredRows.length}</b>
        </p>
        <CreateEmployee />
        <div className="searchContainer">
          <label htmlFor="search" className="searchLabel">
            Search
          </label>
          <input
            id="Search"
            className="searchInput"
            type="search"
            placeholder="Enter Search Keyword"
            value={searchText}
            onChange={handleSearchText}
          />
        </div>
      </div>
      {filteredRows.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>No Users Found</h1>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Unique Id</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Mobile No</StyledTableCell>
                <StyledTableCell align="right">Designation</StyledTableCell>
                <StyledTableCell align="right">Gender</StyledTableCell>
                <StyledTableCell align="right">Course</StyledTableCell>
                <StyledTableCell align="right">Create Date</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <StyledTableRow key={row.f_id}>
                  <StyledTableCell align="center">{row.f_id}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.f_Image ? (
                      <img
                        src={`http://localhost:4000${row.f_Image}`}
                        alt="image"
                        style={{ maxWidth: "40%", maxHeight: "30%" }}
                      />
                    ) : (
                      <p
                        style={{
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          fontSize: "12px",
                        }}
                      >
                        Not Uploaded
                      </p>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.f_Name}</StyledTableCell>
                  <StyledTableCell align="right">{row.f_Email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.f_Mobile}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.f_Designation}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.f_gender}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.f_Course}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {convertDate(row.f_Createdate)}
                  </StyledTableCell>
                  {/* <StyledTableCell align="right">{}</StyledTableCell> */}
                  <StyledTableCell
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    <UpdateEmployee row={row} />
                    {
                      <IconButton
                        onClick={() => handleDelete(row.f_id)}
                        color="primary"
                        aria-label="delete"
                        title="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          {/* <CreateEmployee opened={open} /> */}
        </TableContainer>
      )}
    </div>
  );
}
