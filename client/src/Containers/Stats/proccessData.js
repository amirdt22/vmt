/* eslint-disable no-unused-vars */
// @todo rename utils
export const processData = (data, { users, events }) => {
  let lines;
  let color;
  const timeScale = calculateTimeScale(
    data[0].timestamp,
    data[data.length - 1].timestamp
  );

  if (users.length > 0) {
    lines = users.map(user => buildLineData(data, timeScale, user));
  } else {
    lines = buildLineData(data, timeScale);
    lines = [lines];
  }
  return {
    lines,
    timeScale,
    units: timeUnitMap[timeScale],
  };
};

const calculateTimeScale = (start, end) => {
  let timeScale;
  const seconds = (end - start) / 1000;
  if (seconds > 63072000) {
    timeScale = 31536000; // Yeear
  } else if (seconds > 5184000) {
    timeScale = 2592000; // 30 Days
  } else if (seconds > 1209600) {
    timeScale = 604800; // Week
  } else if (seconds > 172800) {
    timeScale = 86400; // Day
  } else if (seconds > 7200) {
    timeScale = 3600; // hour
  } else if (seconds > 120) {
    timeScale = 60; // minute
  } else {
    timeScale = 1; // @todo consider putting in 10s increments
  }
  return timeScale;
};

const buildLineData = (data, timeScale, user) => {
  let timeElapsed = 0; // seconds
  let eventCount = 0;
  let startTime = 0;
  let color;
  const processedData = [];
  if (user) {
    data = data.filter(d => (d.user ? d.user._id === user : false));
    [{ color }] = data;
  }
  console.log(data);
  // combine events by timeScale -- i.e. get the number of events that happened between start and end of timeScale unit
  data.forEach((datum, i) => {
    if (data[i - 1]) {
      eventCount += 1;
      const timeToAdd = (datum.timestamp - data[i - 1].timestamp) / 1000; // in seconds
      timeElapsed += timeToAdd;
      if (timeElapsed >= timeScale) {
        if (startTime === 0) {
          processedData.push([0.1, eventCount]);
        } else {
          processedData.push([startTime, eventCount]);
        }
        const skips = Math.floor(timeElapsed / timeScale) - 1;
        startTime += 1;
        for (i = 0; i < skips; i++) {
          processedData.push([startTime, 0]);
          startTime += 1;
        }
        timeElapsed = 0;
        eventCount = 0;
      } else if (i === data.length - 1) {
        processedData.push([startTime, eventCount]);
      }
    }
  });
  processedData.unshift([0, 0]);
  processedData.push([startTime + 1, 0]);
  console.log({ processedData });
  return { data: processedData, color };
};
export const timeUnitMap = {
  31536000: 'years',
  2592000: 'months',
  604800: 'weeks',
  86400: 'days',
  3600: 'hours',
  60: 'minutes',
  1: 'seconds',
};

export const dateFormatMap = {
  years: 'MM/DD/YYYY',
  months: 'MM/DD/YYYY',
  weeks: 'MM/DD/YYYY',
  days: 'MM/DD/YYYY h:mm',
  hours: 'h:mm:ss A',
  minutes: 'h:mm:ss A',
  seconds: 'h:mm:ss A',
};
