// export const detectStoppages = (gpsData, threshold) => {
//     const stoppages = [];
//     let currentStop = null;
  
//     for (let i = 1; i < gpsData.length; i++) {
//       const prevPoint = gpsData[i - 1];
//       const currPoint = gpsData[i];
//       const distance = getDistance(prevPoint, currPoint);
//       const timeDiff = (new Date(currPoint.timestamp) - new Date(prevPoint.timestamp)) / (1000 * 60);
  
//       if (distance < 0.0001) {
//         if (!currentStop) {
//           currentStop = { reachTime: prevPoint.timestamp, position: [prevPoint.latitude, prevPoint.longitude], duration: 0 };
//         }
//         currentStop.duration += timeDiff;
//         currentStop.endTime = currPoint.timestamp;
//       } else {
//         if (currentStop && currentStop.duration >= threshold) {
//           stoppages.push(currentStop);
//         }
//         currentStop = null;
//       }
//     }
  
//     if (currentStop && currentStop.duration >= threshold) {
//       stoppages.push(currentStop);
//     }
  
//     return stoppages;
//   };
  
//   const getDistance = (point1, point2) => {
//     const R = 6371e3; // metres
//     const φ1 = point1.latitude * Math.PI / 180;
//     const φ2 = point2.latitude * Math.PI / 180;
//     const Δφ = (point2.latitude - point1.latitude) * Math.PI / 180;
//     const Δλ = (point2.longitude - point1.longitude) * Math.PI / 180;
  
//     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//               Math.cos(φ1) * Math.cos(φ2) *
//               Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
//     const d = R * c;
//     return d;
//   };
export const detectStoppages = (gpsData, threshold) => {
  const stoppages = [];
  let currentStop = null;

  for (let i = 1; i < gpsData.length; i++) {
    const prevPoint = gpsData[i - 1];
    const currPoint = gpsData[i];
    const timeDiff = (new Date(currPoint.timestamp) - new Date(prevPoint.timestamp)) / (1000 * 60); // time difference in minutes

    if (prevPoint.latitude === currPoint.latitude && prevPoint.longitude === currPoint.longitude) {
      if (currentStop) {
        currentStop.duration += timeDiff;
        currentStop.endTime = currPoint.timestamp;
      } else {
        currentStop = {
          position: [prevPoint.latitude, prevPoint.longitude],
          reachTime: prevPoint.timestamp,
          endTime: currPoint.timestamp,
          duration: timeDiff
        };
      }
    } else {
      if (currentStop && currentStop.duration >= threshold) {
        stoppages.push(currentStop);
      }
      currentStop = null;
    }
  }

  if (currentStop && currentStop.duration >= threshold) {
    stoppages.push(currentStop);
  }

  return stoppages.map(stop => ({
    ...stop,
    duration: stop.duration.toFixed(2)
  }));
};
