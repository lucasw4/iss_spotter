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

// Function that fetches coords by IP address
/**
 * 
 * @param {*} ip 
 * @param {*} callback 
 */
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

// Function that fetches ISS fly over times for the coords
/**
 * 
 * @param {*} coords 
 * @param {*} callback 
 */
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

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
    if(error) {
      callback(error, null)
      return
    }
    fetchCoordsByIp(ip, (error, coords) => {
      if (error) {
        callback(error, null)
        return
      }
      fetchISSFlyOverTimes(coords, (error, times) => {
        if(error) {
          callback(error, null)
          return
        }
        callback(null, times)
      })
    })
  })

}

module.exports = { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation }