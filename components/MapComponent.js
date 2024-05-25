// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix for default marker icon issues in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const MapComponent = ({ gpsData, stoppages }) => {
//   const position = [gpsData[0].latitude, gpsData[0].longitude];
//   const polyline = gpsData.map(point => [point.latitude, point.longitude]);

//   return (
//     <MapContainer center={position} zoom={13} style={{ height: "500px", width: "80%", marginTop: "20px" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Polyline positions={polyline} color="blue" />
//       {stoppages.map((stop, idx) => (
//         <Marker key={idx} position={stop.position}>
//           <Popup>
//             <div>
//               <p><strong>Reach Time:</strong> {stop.reachTime}</p>
//               <p><strong>End Time:</strong> {stop.endTime}</p>
//               <p><strong>Duration:</strong> {stop.duration} minutes</p>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default MapComponent;
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = ({ gpsData, stoppages }) => {
  const position = [gpsData[0].latitude, gpsData[0].longitude];
  const polyline = gpsData.map(point => [point.latitude, point.longitude]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: "500px", width: "80%", marginTop: "20px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={polyline} color="blue" />
      {stoppages.map((stop, idx) => (
        <Marker key={idx} position={stop.position}>
          <Popup>
            <div>
              <p><strong>Reach Time:</strong> {stop.reachTime}</p>
              <p><strong>End Time:</strong> {stop.endTime}</p>
              <p><strong>Duration:</strong> {stop.duration} minutes</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
