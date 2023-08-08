
const logger= require('./logger');  // local defined module(module.export data can use)
const path= require('path');  // inside node core module
const os= require('os');      // inside node core module
const EventEmitter= require('events');
const fs=require('fs');
const http=require('http');
const express=require('express');
const joi=require('@hapi/joi');
const movies_route=require('./movies_route');

// // 1) all app.js details from module
//console.log(module);  

// //2) call logger.js module and print the data
// console.log(logger.explog("log calling success")); 

// // 3) use path core module and print the values
// console.log(path.parse(__dirname));


// // 4) use os core module and print the values
// console.log(os.cpus());

// // 5)logEve created + when it was emit() it was print
// const emitter = new EventEmitter();
// emitter.on('logEve', (a,b) => {
//     console.log('Event trigger loaded..')
//     console.log(a,b)
// })
// emitter.emit('logEve',"Arg A", "Arg B");

// // 6) fs
// const readStream= fs.createReadStream('./logs/log_read.txt','utf8');
// const writeStream= fs.createWriteStream('./logs/log_write.txt');
// // //6.1) chunk streaming
// // readStream.on('data',(chunk) => {
// //     console.log(chunk);
// //     writeStream.write(chunk)
// //     console.log('***********************************************************'); 
// // })
// 
// //6.2) pipe streaming ==> readStream.pipe(zipthe file).pipe(writeStream); can do modification
// readStream.pipe(writeStream);


// //7) http module (Min-55- 58) ----> node js can use front end app also
// // server start + url routing + static file loading(index.html)
// const server= http.createServer((req,res) => { 
//     if(req.url === '/'){
//         res.write('welcomeserber root page ss');
//         res.end();
//     }else if(req.url === '/about'){
//         res.write('about page');
//         res.end();
//     }else{
//         //res.write('unknown page');
//         //res.end();
//         const readStream= fs.createReadStream('index.html');
//         res.writeHead(200,{'Content-type':'text/html'});
//         readStream.pipe(res);
//     }
// })
// server.listen(3000);

/*
//8) Work with Express js (npm install express  |npm install debug)
// set env veriable [>>set PORT=3000 ]
const app = express();
console.log(process.env.PORT);

app.get('/',(req,res) =>{
    res.send('root from express');
})

//Req parameter [mendadory]
// http://localhost:5000/person/kreshan/34  
//query string parameter [optional]
// http://localhost:5000/person/kreshan/34?groupBy=name
// http://localhost:5000/person/kreshan/34?groupBy=name&grate=3
app.get('/person/:name/:age',(req,res) =>{  
    console.log(req.params)
    //res.send(req.params);    //  ==> {"name":"kreshan","age":"34"}
    res.send(req.query);       // ==> {"groupBy":"name"}
                               // ==> {"groupBy":"name","grate":"3"}
    //res.send('person from express');
})
const port =process.env.PORT|| '5000'
app.listen(port, () => console.log(`server start port: ${port}`));
*/

/* *********************************************************************************** */
//9) http get [create update,delete,list] >>npm run dev
const app = express();
app.use(express.json()); // use in post method ( req convert to jsom)


//when call this url it will calling the below middleware [http://localhost:5000/api/movies]
app.use('/api/movies',(req,res,next) => {
    console.log(req.url, req.method);
    next();
})

const movieList =[{id:1,name:'aaaaa'},
                  {id:2,name:'bbbbb'},
                  {id:3,name:'ccccc'}  
                ]
app.get('/',(req,res) =>{    //http://localhost:5000/
    res.send('root from express');
})

//get data list
app.get('/api/movies',(req,res) =>{  // http://localhost:5000/api/movies
    res.send(movieList);
     
})

//get data
app.get('/api/movies/:id',(req,res) =>{  // http://localhost:5000/api/movies/1
    let movie=movieList.find(c=> c.id === parseInt(req.params.id));
    if(!movie) res.send('No movie found...');
               res.send(movie);
})

//POSTMAN Test [post +http://localhost:5000/api/movies+ body+row+ json] <--- {"name":"kreshan"} ===> send
//add data
app.post('/api/movies',(req,res) =>{  // 
    
    // //this validation comples, use @hapi/joi package [npm i @hapi/joi]
    // if(!req.body.name || req.body.name.length<3){
    //     res.status(400).send('name lenth lessthen 3');
    //     return;
    // }

    //use Joi validation
    const schema=joi.object({   ///create schema for all attribute , which need to validate
        name: joi.string().min(3).required() 
    })

    const result = schema.validate(req.body);
    console.log(result);  //big error discription is showing

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    let movie={
        id: movieList.length +1,
        name:req.body.name
    }
    movieList.push(movie);
    res.send(movieList);  
})
//-----------------------------------------
//update data [http://localhost:5000/api/movies/1 | put| { "name": "1111"}  ]
app.put('/api/movies/:id',(req,res) =>{ // http://localhost:5000/api/movies
    let movie=movieList.find(c=> c.id === parseInt(req.params.id));
    if(!movie) res.send('No movie found...');

    const schema=joi.object({   ///create schema for all attribute , which need to validate
        name: joi.string().min(3).required() 
    })

    const result = schema.validate(req.body);
    console.log(result);  //big error discription is showing

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    movie.name=req.body.name;
    res.send(movie); 
}) 

//delete data [delete + http://localhost:5000/api/movies/1 ]
app.delete('/api/movies/:id',(req,res) =>{ 
    let movie=movieList.find(c=> c.id === parseInt(req.params.id));
    if(!movie) res.send('No movie found...');

    const index=movieList.indexOf(movie);
    movieList.splice(index,1);
    res.send(movieList); 
}) 

/* *********************************************************************************** */
//route testing (something like struct.xml)
//http://localhost:5000/abc/api/movies/
app.use('/abc',movies_route);


app.listen(5000, () => console.log(`server start port 5000`));

/* *********************************************************************************** */
//continue 1.44 min