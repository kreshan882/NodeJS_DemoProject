const express= require('express');
const route = express.Router();

const movieList =[{id:1,name:'aaaaa'},
                  {id:2,name:'bbbbb'},
                  {id:3,name:'ccccc'}  
                ]

//get data list
route.get('/api/movies',(req,res) =>{  // http://localhost:5000/api/movies
    res.send(movieList);
     
})

//get data
route.get('/api/movies/:id',(req,res) =>{  // http://localhost:5000/api/movies/1
    let movie=movieList.find(c=> c.id === parseInt(req.params.id));
    if(!movie) res.send('No movie found...');
               res.send(movie);
})

//POSTMAN Test [post +http://localhost:5000/api/movies+ body+row+ json] <--- {"name":"kreshan"} ===> send
//add data
route.post('/api/movies',(req,res) =>{  // 
    
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
route.put('/api/movies/:id',(req,res) =>{ // http://localhost:5000/api/movies
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
route.delete('/api/movies/:id',(req,res) =>{ 
    let movie=movieList.find(c=> c.id === parseInt(req.params.id));
    if(!movie) res.send('No movie found...');

    const index=movieList.indexOf(movie);
    movieList.splice(index,1);
    res.send(movieList); 
}) 

module.exports = route;