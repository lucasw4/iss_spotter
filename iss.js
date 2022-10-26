const request = require('request')

// Function that finds the users IP
const fetchMyIp = function (callback) {
  url = "https://api.ipify.org?format=json"
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

const fetchCoordsByIp = function (ip, callback) {
  url = `http://ipwho.is/${ip}`
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null)
      return
    }

    const data = JSON.parse(body)
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`
      callback(Error(message), null)
      return
    }

    const { latitude, longitude } = data;
    callback(null, {latitude, longitude})
  })
}

const fetchISSFlyOverTimes = function(coords, callback) {
  url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null)
      return
    }
    if (response && response.statusCode !== 200) {
      callback(response.statusCode, null)
      return
    }
    const data = JSON.parse(body)
    callback(null, data.response);

  })

}

module.exports = { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes }