
import * as React from "react"
import PropTypes from "prop-types"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Table from "@mui/material/Table"
import Paper from "@mui/material/Paper"
import TableRow from "@mui/material/TableRow"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import Typography from "@mui/material/Typography"
import TableContainer from "@mui/material/TableContainer"

function createData(name, calories, fat, carbs, place,pra) {
  return { name, calories, fat, carbs, place,pra };
}

const rows1 = [
  createData("PURITY", "22.00", "BRAND", "Pyrajewels"),
  createData("GENDER", "Women", "", ""),
  createData("PRODUCT", "Earrings", "METAL", "Gold"),
  createData("JEWLLERY TYPE", "Gold Jewellery", "METAL COLOR", "Yellow"),
  createData("TYPE", "Drops", "OCASION", ""),
  createData("HEIGHT", "29 mm", "PRODUCT WIDTH", "13 mm"),
];

const rows2 = [
  createData("22KT Plain Gold", "$4947.00/g", "6.675g", "-", "₹33021.23"),
  createData("Making Charges", "-", "-", "-", "₹10236.58"),
  createData("Sub Total", "-", "6.675g(Gross Weight)", "-", "₹43257.81"),
  createData("Gst", "-", "-", "-", "₹1297.73"),
  createData("Grand Total", "-", "-", "-", "₹44556 (MRP Incl. of all taxes)"),
];

const rows3 = [
  createData("Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."),
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return ( 
    <Box sx={{ width: "100%" }} className="box">
      <Box sx={{}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Product Specification" {...a11yProps(0)} />
          <Tab label="Price Breakup" {...a11yProps(1)} />
          <Tab label="More Info" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* first block */}
      <TabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            {/* <TableHead>
              <TableRow>
                <TableCell>Product Specifications</TableCell>
                <TableCell align="right">Price Breakup</TableCell>
                <TableCell align="right">Reviews</TableCell>
                <TableCell align="right">More Info</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              {rows1.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* first block */}

      <TabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "teal" }}>Component</TableCell>
                <TableCell align="right" sx={{ color: "teal" }}>
                  Gold Rate(22KT)
                </TableCell>
                <TableCell align="right" sx={{ color: "teal" }}>
                  Weight(g)
                </TableCell>
                <TableCell align="right" sx={{ color: "teal" }}>
                  Discount
                </TableCell>
                <TableCell align="right" sx={{ color: "teal" }}>
                  Final Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows2.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      fontWeight: "bold",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.place}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {/* <TableCell sx={{ color: "teal" }}>Component</TableCell> */}
                {/* <TableCell align="right" sx={{ color: "teal" }}> */}
                  {/* Gold Rate(22KT) */}
                {/* </TableCell> */}
                {/* <TableCell align="right" sx={{ color: "teal" }}>
                  Weight(g)
                </TableCell>
                <TableCell align="right" sx={{ color: "teal" }}>
                  Discount
                </TableCell>
                <TableCell align="right" sx={{ color: "teal" }}>
                  Final Value
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody className="table">
              {rows3.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      // fontWeight: "bold",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {/* <TableCell align="right">{row.calories}</TableCell> */}
                  {/* <TableCell align="right">{row.fat}</TableCell> */}
                  {/* <TableCell align="right">{row.carbs}</TableCell> */}
                  {/* <TableCell align="right">{row.place}</TableCell> */}
                  <TableCell align="right">{row.pra}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      {/* <p value={value} index={2}></p> */}
    </Box>
  );
}
