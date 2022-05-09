import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import convertSecondsToTime from "../utils/convertSecondsToTime";

import { Typography } from "@mui/material";

function createData(name, startTime, endTime, duration, site = "codeforces") {
  return { name, startTime, endTime, duration, site };
}
const ids = ["name", "startTime", "endTime", "duration", "site"];
const cols = ["Name", "Start Time", "End Time", "Duration", "Site"];

const createLink = (name, link, color) => {
  return (
    <a style={{ color: color}} target="_blank" rel="noreferrer" href={link}>
      {name}
    </a>
  );
};

const ContestTable = ({ contests, site, tableTitle }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = Object.values(contests).reduce((res, contest) => {
    const st = new Date(Date.parse(contest.start_time)).toLocaleString();
    const et = new Date(Date.parse(contest.end_time)).toLocaleString();
    // const time = contest.duration.toISOString();
    const time = convertSecondsToTime(parseInt(contest.duration));
    if (site === "All") {
      res.push(
        createData(
          createLink(contest.name, contest.url, theme.palette.text.primary),
          st,
          et,
          time,
          contest.site
        )
      );
    } else {
      if (site === contest.site) {
        res.push(
          createData(
            createLink(contest.name, contest.url, theme.palette.text.primary),
            st,
            et,
            time,
            contest.site
          )
        );
      }
    }
    return res;
  }, []);
  let heading = rows.length + " " + tableTitle + "s";
  if (rows.length === 1) {
    heading = rows.length + " " + tableTitle;
  }
  return (
    <Paper sx={{ width: "100%", overflow: "auto" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5.5}>
                <Typography fontWeight="bold" variant="h5">
                  {heading}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              {cols.map((column) => (
                <TableCell key={column}>
                  <Typography fontWeight="bold">{column}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    {ids.map((column) => {
                      const value = row[column];
                      return (
                        <TableCell key={column} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ContestTable;
