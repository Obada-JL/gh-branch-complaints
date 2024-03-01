import React, { useState, useEffect } from "react";

const fetchDataFromApi = async (setData) => {
  try {
    // Make an API request
    const response = await fetch(
      "https://complaintapi.kodunya.com/api/Complaints"
    );
    const result = await response.json();

    // Update the state with the fetched data
    setData(result);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const MyComponent = () => {
  // State to store the fetched data
  const [data, setData] = useState([]);

  // useEffect to fetch data from the API after initial render
  useEffect(() => {
    // Call the fetchData function
    fetchDataFromApi(setData);
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h1>Data from API:</h1>
      <ul>
        {/* Map through the data and render each item */}
        {data.map((item) => (
          <li key={item.id}>{item.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
