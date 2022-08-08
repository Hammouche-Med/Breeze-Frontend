import React, { useEffect, useState,useMemo} from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import DataTable from "react-data-table-component";
import styled, { keyframes } from "styled-components";

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

const Export = ({ onExport }) => (
  <button className="btn btn-primary btn-icon-split" onClick={(e) => onExport(e.target.value)}>Export</button>
);

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Year",
    selector: (row) => row.year,
  },
  {
				
    cell: () => <button onClick={alert('clicked')}>Action</button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
},
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

const rotate360 = keyframes`
  from {
   transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const CustomLoader = () => (
  <div style={{ padding: "24px" }}>
    <Spinner />
    <div>Fancy Loader...</div>
  </div>
);
function Users() {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);
  const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);
  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavBar />
          {/* start content */}
          <div className="container-fluid">
            <DataTable
              title="users"
              columns={columns}
              data={data}
              pagination
              progressPending={pending}
              progressComponent={<CustomLoader />}
              actions={actionsMemo}
            />
          </div>
          {/* /.container-fluid */}

          {/* end content */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Users;
