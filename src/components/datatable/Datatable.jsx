import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource"; // You can define tour-specific columns here
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/headers";

const Datatable = () => {
  const [allTours, setAllTours] = useState([]);
  const [data, setData] = useState([]);

  const fetchAllTours = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/allTours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      
    
      const mappedData = data.map((tour, index) => ({
        id: tour.id || index, 
        name: tour.name,
        location: tour.location,
        price: tour.cost[0].standardPrice,
        date: tour.createdAt,
       
      }));

      setAllTours(mappedData); // Save the transformed data
      setData(mappedData);     // Update DataGrid's rows
      
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  useEffect(() => {
    fetchAllTours();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/tours/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // Define tour-specific columns
  const tourColumns = [
    { field: "name", headerName: "Tour Name", width: 200 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "date", headerName: "Date", width: 160 },
    // Add other fields as needed
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Tour
        <Link to="/admin/tours/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={tourColumns.concat(actionColumn)} 
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
