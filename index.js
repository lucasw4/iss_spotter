/*
// Test code to make sure the fetchMyIp function works as intended.

const { fetchMyIp } = require('./iss')

fetchMyIp((error, ip) => {
  if (error) {
    console.log(`There was an error! ${error}`)
    return
  }

  console.log(`IP: ${ip}`)
})
*/


const { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss')


// Function that prints the next ISS pass times in a reasonable format
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime)
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds.`)
  }
}

// Function call that calls the function from iss.js
nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    return console.log(error)
  }
  // SUCCESS!
  printPassTimes(passTimes)
})

