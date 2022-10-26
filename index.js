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

const { fetchMyIp, fetchCoordsByIp } = require('./iss')

fetchCoordsByIp("50.64.35.62", (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  console.log(data)
})