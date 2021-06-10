const { logger } = require("./src/utils/logger");

const cluster = require('cluster') /* https://nodejs.org/dist/latest-v14.x/docs/api/cluster.html */

const numCPUs = require('os').cpus().length

if (process.argv[2]==="CLUSTER"){

    if(cluster.isMaster) {
        logger.trace(numCPUs)
        logger.trace(`PID MASTER ${process.pid}`)
        
        logger.info(`Se inicia el Server en modo CLUSTER con ${numCPUs} nucelos de procesamiento y PID MASTER ${process.pid}`)
        for(let i=0; i<numCPUs; i++) {
            cluster.fork()
        }
    
        cluster.on('exit', worker => {
            logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
            cluster.fork() 
        })
    }
} else {
    logger.info("Se inicia sin CLUSTER")
    require("./server.js")
}
