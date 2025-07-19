// fs is node file system module to read and write files.
const fs = require('fs')
// all tasks will be saved on tasks.json
const filepath = "./tasks.json"

const loadtasks = ()=>{
    try {

        // data buffer= it provides ASCII codes for that we need to converty them to string to read files.
        // read files = binary data
        const databuffer = fs.readFileSync(filepath) 
        // JS things

       const datajson= databuffer.toString()
    //    parsing to read]

       return JSON.parse(datajson) 
    } catch (error) {
        return []
    }
}

const listtasks=()=>{
    const tasks = loadtasks()
    tasks.forEach((task,index)=>console.log(`${index + 1} - ${task.task}`))
}
const  savetasks=(tasks)=>{
    // array -> JSON text
    const datajson=JSON.stringify(tasks)
    // saving ther file
    fs.writeFileSync(filepath,datajson)
}


const addtasks = (task)=>{
    const tasks=loadtasks()
    // converting to object not array
    tasks.push({task})
    savetasks(tasks)
    console.log("Task added",task)
}

const command = process.argv[2]
const argument = process.argv[3]

if (command === "add"){
    addtasks(argument)
}
else if (command === "List"){
    listtasks()
}
else if (command === "remove"){
    removetasks(parseInt(argument))
}
else{
    console.error("command not found")
}

