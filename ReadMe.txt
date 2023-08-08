DCB URL: https://www.youtube.com/watch?v=ZWhoAwTyXFs

RUN The Project
1) cd 2_Tutorial_DCB/
   npm install
   npm install debug express | npm i nodemon -D
   npm run dev | node app.js

1) new project
        1) RUN >>>> node app
        (impore local module/core module print data)

2) Events
    1) Events
    2) what will happent on that Events
    3) trigger that Events

3) fs core module use , write print file (0.33 - 0.43)
    1) create the file    -->fs.writeFile('filName','data',CB fun)
    2) read the file      --> fs.readFile('filename', CB fun)
    3) rename the file    -->fs.rename('old file','newfile',CB fun)
    4) append data to file --> fs.appendFile('filename','data', callback fun)
    5) delete the file --> fs.unlink('filename' ,CB function)
    
    6) fs.mkdir('test_dir',CB fun)
    7) fs.rmdir('test_dir',CB fun)

    8) full careate dir and write file inside that (0.43 - 0.49)
    9) read file list inside direc ---> fs.readdir('dirname',(err,files)=>Cb fun)

    10) readStream + writeStream (streaming) (0.49 - 0.51)
        createReadStream(fileneme,'utf8')
        createWriteStream(fileneme)
        10.1) asynchronous methods (createReadStream |createWriteStream)
            (it log file copping with streaming, data write small batches)

        10.2) node js singe thread (ReadStream bring small small chunk data)

        10.3) pipe stream
                readStream.pipe(writeStream);

    11) http [min 0.58-1.03 ]
        1) creat server + listen project (http://127.0.0.:3000)
        2) url router ( if else condition check url send different place)
            frount end interface can do in nodejs, bot not good 
        3) static file index.html(!+enter) file , read rem node js and show in web

 4) Project initilization with vs-code
        4.1) paskage.json  install
                npm init     ---> anser question ->create .json file
        4.2) node_modules  install
                npm install debug
                npm install abc_module
                npm uninstall abc_module
        4.3) node_module Update [majoe ver, minor version, patch]
                npm update abc_module
                ^4.  2.3  (only change minor veriopn, patch version)
                ~4.2  .3  (only change patch version)

============ install node_modules =============================
 5) Work with express [min 1.13 -1.20] 
        load web module with express
        5.1) npm install express  |npm install debug
        5.2) run with express
                node app
        5.3) set env veriable
              terminal>>set PORT=3000

6) Work with nodemon [min 1.20 -1.22]
    run node modile with out exit
    6.1) npm install -g nodemon    ===> global install
         nodemon app.js

    6.2) npm i nodemon -D             ===> local install dev mode 
         package.json
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1",
                "start": "node app.js",
                "dev": "nodemon app"
            }
        >> npm run dev ----> non stop loop
        >> npm start   ----> one time run (same as "node app.js")

7) [9] http get [list,get 1, add | update,delete] min 1.29-1.44
            9.1) list/get
            9.2) add
                add validation (//validation comples, use @hapi/joi package [])
                >>npm i @hapi/joi 


8/8/2023
            9.3) post + valication (validate with node_module)  --> add with validation
                npm i @hapi/joi

---------------> continue at 1.49 min
            9.4) app.put()   --> update
            9.5) app.delete() //delete

8) Middlewhere  (intersepter, all the reqfrom this url this funn will call)
        app.use('/api/movies',(req,res,next) => {  }) 

9) express/routes (big number of route path handeling)
    //http://localhost:5000/abc/api/movies/
    app.use('/abc',movies_route);  


################################################################
Git
URL: https://github.com/kreshan882/NodeJS_DemoProject.git
================================
	upload Git BAST commant font
	================================
1) git config --global user.email "kreshan882@gmail.com"
2) cd 2_Tutorial_DCB/
3) git init
4) git add package.json logs/* app.js index.html logger.js ReadMe.txt movies_route.js     (git add --all)
   git status  ==> check status 
5) git commit -m "commit fst"
   git log
6) git push https://github.com/kreshan882/NodeJS_DemoProject.git

6.1) git push --set-upstream https://github.com/kreshan882/NodeJS_DemoProject.git master ---> first time only 

download project 















################################################################