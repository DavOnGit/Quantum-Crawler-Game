var moment = require('moment')

console.log(moment().format())

var now = moment()

console.log('Current timestamp', now.unix());

var timestamp = 1487248120
var currMoment = moment.unix(timestamp)
console.log('current moment', currMoment.format('MMM D, YY @ h:mm a'))

// Jenuary 3rd, 2017 @ 12:13 AM
console.log('current moment', currMoment.format('MMMM Do, YYYY @ h:mm A'))
