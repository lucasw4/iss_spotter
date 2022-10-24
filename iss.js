const request = require('request')
url = "https://api.ipify.org?format=json"

// Function that finds the users IP
const fetchMyIp = function (callback) {
  request(url, (error, response, body) => {
    // If there's an error, calls the callback with the error
    if(error) {
      callback(error, null)
      return
    } 
    // If there's no error but status code !== 200, creates an error for that and calls the callback
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`
      callback(Error(msg), null)
      return
    }
    else {
      // Calls the callback with the data (the IP)
      const data = JSON.parse(body)
      callback(null, data.ip)
    }
  })
}

module.exports = { fetchMyIp }