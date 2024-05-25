// import { useState } from 'react';
// import dynamic from 'next/dynamic';
// import { detectStoppages } from '../utils/stoppageDetection';
// import * as XLSX from 'xlsx';

// const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false });

// const IndexPage = () => {
//   const [gpsData, setGpsData] = useState([]);
//   const [stoppages, setStoppages] = useState([]);
//   const [threshold, setThreshold] = useState(5);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const firstSheetName = workbook.SheetNames[0];
//       const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);

//       // Map the worksheet data to the required format
//       const formattedData = worksheet.map(row => {
//         const eventDate = parseFloat(row.eventDate);
//         const eventGeneratedTime = parseFloat(row.eventGeneratedTime);

//         let timestamp = null;
//         if (!isNaN(eventDate) && !isNaN(eventGeneratedTime)) {
//           try {
//             timestamp = new Date(eventGeneratedTime).toISOString();
//           } catch (error) {
//             console.error('Invalid date or time value:', eventDate, eventGeneratedTime);
//           }
//         }

//         return {
//           latitude: parseFloat(row.latitude),
//           longitude: parseFloat(row.longitude),
//           timestamp
//         };
//       }).filter(row => row.timestamp); // Filter out invalid rows

//       setGpsData(formattedData);
//       const detectedStoppages = detectStoppages(formattedData, threshold);
//       setStoppages(detectedStoppages);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div>
//       <h1>Vehicle Stoppage Identification</h1>
//       <input type="file" accept=".xlsx" onChange={handleFileUpload} />
//       <label>
//         Stoppage Threshold (minutes):
//         <input type="number" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
//       </label>
//       {gpsData.length > 0 && <MapComponent gpsData={gpsData} stoppages={stoppages} />}
//     </div>
//   );
// };

// export default IndexPage;
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { detectStoppages } from '../utils/stoppageDetection';
import * as XLSX from 'xlsx';

const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false });

const IndexPage = () => {
  const [gpsData, setGpsData] = useState([]);
  const [stoppages, setStoppages] = useState([]);
  const [threshold, setThreshold] = useState(10);

  useEffect(() => {
    if (gpsData.length > 0) {
      const detectedStoppages = detectStoppages(gpsData, threshold);
      setStoppages(detectedStoppages);
    }
  }, [threshold, gpsData]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);

      const formattedData = worksheet.map(row => ({
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
        timestamp: new Date(parseFloat(row.eventGeneratedTime)).toISOString()
      })).filter(row => !isNaN(row.latitude) && !isNaN(row.longitude) && row.timestamp);

      setGpsData(formattedData);
      setThreshold(10);  // Reset threshold if needed
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1>Vehicle Stoppage Identification</h1>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      <label>
        Stoppage Threshold (minutes):
        <input type="number" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
      </label>
      {gpsData.length > 0 && <MapComponent gpsData={gpsData} stoppages={stoppages} />}
    </div>
  );
};

export default IndexPage;
