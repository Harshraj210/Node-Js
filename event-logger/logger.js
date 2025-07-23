const os = require('os')
// os --> node module to get info of computer
const fs = require('fs')

const eventEmitter=require ('events')

class Logger extends  eventEmitter{
  log(message){
    this.emit('message' , {message})
  }
}

const logger = new Logger 
const logFile ='./eventlog.txt'
const logtoFile = (event)=>{
  const Logmessage = `${new Date().toISOString()} - ${event.message}\n`
  fs.appendFileSync(logFile,Logmessage)
  console.log(Logmessage)
}

// message is event happening and logtofile is architecture
// on is used bcz it continously listens to event.
logger. on ('message',logtoFile)

setInterval(()=>{
  // every 3 sec it calculates the memory usage
  const MemoryUsage = (os.freemem() / os.totalmem()) * 100
  logger.log(`Memory Usage : ${MemoryUsage.toFixed(2)}`)
},3000)
logger.log("Application Started :")
logger.log("application event is happening")