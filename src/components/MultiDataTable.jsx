import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

function createData(title, value1, space, value2) {
  return { title, value1, space, value2 };
}

const MultiDataTable = ({ rows, header, handle1, handle2 }) => {
  return (
    <TableContainer component={Paper} elevation={24}>
      <Table
        aria-label="customized table"
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell> {header} </StyledTableCell>
            <StyledTableCell align="right">
              <a
                style={{ color: "white", fontWeight: "bold" }}
                target="_blank"
                rel="noreferrer"
                href={`https://codeforces.com/profile/${handle1}`}
              >
                {handle1}
              </a>
            </StyledTableCell>
            {/* <StyledTableCell align="right">&</StyledTableCell> */}
            <StyledTableCell align="right">
              <a
                style={{ color: "white", fontWeight: "bold" }}
                target="_blank"
                rel="noreferrer"
                href={`https://codeforces.com/profile/${handle2}`}
              >
                {handle2}
              </a>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="right">{row.value1}</StyledTableCell>
              <StyledTableCell align="right">{row.value2}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MultiDataTable;
