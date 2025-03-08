import React from "react";

const tableStyle = {
  width: "100vw",
  maxWidth: "400px",
  borderCollapse: "collapse",
  border: "1px solid #333",
  backgroundColor: "#242424",
  borderRadius: "8px",
  overflow: "hidden",
  marginTop: "400px",
};

const thTdStyle = {
  padding: "10px",
  textAlign: "center",
  borderBottom: "1px solid #333",
};

const thStyle = {
  ...thTdStyle,
  backgroundColor: "#292929",
};

const trHoverStyle = {
  backgroundColor: "#333",
};

const RamadanTimetable = ({ TIMES }) => {
  return (
    <div
      style={{
        backgroundColor: "#242424",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Sana</th>
            <th style={thStyle}>Saharlik</th>
            <th style={thStyle}>Iftorlik</th>
          </tr>
        </thead>
        <tbody>
          {TIMES.map((entry, index) => {
            const date = Object.keys(entry)[0];
            const [saharlik, iftar] = entry[date];
            return (
              <tr key={index} style={index % 2 === 0 ? trHoverStyle : {}}>
                <td style={thTdStyle}>{date}</td>
                <td style={thTdStyle}>{saharlik}</td>
                <td style={thTdStyle}>{iftar}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RamadanTimetable;
