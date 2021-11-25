const express = require('express')
const NodeCache = require('node-cache')

const app = express()

/*
Node-cache has following major functions:
    -set(key, val, [ ttl ])
    -get(key)
    -has(key)
*/
const cache = new NodeCache()

const PORT = process.env.PORT || 3001

//sample function to simulate heavy computation task
function heavyComputation(){
    let temp = 0
    setTimeout(()=>{
        for(let i=0; i<100000; i++)
         temp = (Math.random()*5342)%i
        
    }, 500)
    return 123
}

app.get('/', (req, res) => {
    res.send("Welcome to in-memory cache example!")
})

app.get('/api', (req, res) => {
    if(cache.has('comp_task_result')){
        console.log('Result from cache')
        res.status(200).json(cache.get('comp_task_result'))
    }else{
        let result = heavyComputation()
        cache.set("comp_task_result", result)
        res.status(200).json(result)
    }
})


app.listen(PORT, ()=>console.log(`Server listening on http://localhost:${PORT}`))
