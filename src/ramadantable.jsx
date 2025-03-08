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

const RamadanTimetable = ({ TIMES, differRegionTime, selectedRegion }) => {
  const adjustTime = (time, region) => {
    const [hours, minutes] = time.split(":").map(Number);
    const diff = differRegionTime[region] || 0; // Default to 0 if region not found
    const totalMinutes = hours * 60 + minutes + diff;
    const adjustedHours = Math.floor(totalMinutes / 60);
    const adjustedMinutes = totalMinutes % 60;
    return `${String(adjustedHours).padStart(2, "0")}:${String(
      adjustedMinutes
    ).padStart(2, "0")}`;
  };
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
            const saharlik = adjustTime(entry[date][0], selectedRegion);
            const iftar = adjustTime(entry[date][1], selectedRegion);
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
