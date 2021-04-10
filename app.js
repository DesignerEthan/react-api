// define constants / load in required
const express = require('express')
const app = express()
const fileHandler = require('fs');


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// build api end point to display and return date from webprojects.json file
// localhost:8080/api
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
app.get( '/api' , function (req, res) {
	
	// get and read file
	fileHandler.readFile('webprojects.json', function(err, data) { 
		if(!err) {
			let getData = JSON.parse(data);
			res.send( getData ); // returns data as a json feed
		} else {
			next(err) // else throw an err
		}
  	});

});


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// Add data to the webprojects.json file using the POST method
// localhost:8080/api/id={}&title={}&description={}&URL={}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
app.post('/api/', (req, res) => {

    // empty array placeholder
    let newData = [];

    // get and read file
    fileHandler.readFile('webprojects.json', function(err, data) { 
        if(!err) { // if no errors

            // parse data
            let read = JSON.parse(data);

            //loop original data and put it back into my empty placeholder
            read.map(item => {
                newData.push(item);
            })

            // build a new object with the data 
            // Im doing this rather than just running newData.push(req.query) so I can auto increment my id's (as well as other validation if needed in the future)
            let build = {
            	'id': req.query.id,
            	'title': req.query.title, 
            	'description': req.query.description, 
            	'URL': req.query.url, 
            }         

            // pass newly built object to placeholder 
            newData.push(build);

            // write my newData to my webprojects file 
            fileHandler.writeFile('webprojects.json', JSON.stringify(newData), (error) => {
                res.send('File updated!');
            });
        }
    });

})



/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// Delete data from the webprojects.json file using the Delete method by id
// localhost:8080/api/delete/id/:id
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
app.delete('/api/:id', (req, res) => {

	let id = req.params.id;

    // empty array placeholder
    let newData = [];

    // get and read file
    fileHandler.readFile('webprojects.json', function(err, data) { 
        if(!err) { // if no errors

            // parse data
            let read = JSON.parse(data);

            //loop original data but if req.params.id is not equal to item.id add it to placeholder array
            read.map(item => {
            	if(id !== item.id) {
            		newData.push(item);	
            	}
            })

            // write my newData to my webprojects file 
            fileHandler.writeFile('webprojects.json', JSON.stringify(newData), (error) => {
                res.send(`Project id: ${id} has been removed`);
            });
        }
    });

})



/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// Change data from the webprojects.json file using the Put method by id
// localhost:8080/api/change/id/:id/?title={}&description={}&url={}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
app.put('/api/:id', (req, res) => {

	let id = req.params.id;

    // empty array placeholder
    let newData = [];

    // get and read file
    fileHandler.readFile('webprojects.json', function(err, data) { 
        if(!err) { // if no errors

            // parse data
            let read = JSON.parse(data);

            //loop original data
            read.map(item => {
            	// compare if both passed ID and loop item ID is equals
            	if(id == item.id) {
            		if(req.query.title) { // if I have a new title set the item title to match new title
            			item.title = req.query.title;
            		} 
            		if(req.query.description) { // if I have a new description set the item description to match new description
            			item.description = req.query.description;
            		} 
                    if(req.query.url) { // if I have a new url set the item url to match new url
                        item.URL = req.query.url;
                    } 
            		newData.push(item);	
            	} else {
            		newData.push(item);	// if the ID's dont match add it back to placeholder array without changing it.
            	}
            })

            // write my newData to my webprojects file 
            fileHandler.writeFile('webprojects.json', JSON.stringify(newData), (error) => {
                res.send(`Project id: ${id} has been updated`);
            });
        }
    });

})


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// set a wild card for any unset route - custom 404 message
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
app.get('*', function(req, res, next) {
  let err = new Error('Sorry! Please check your URL');
  err.statusCode = 404;
  next(err);
});


// setup listener on port 8080
const PORT = process.env.PORT || 3001;
app.listen( PORT , function () {
	console .log( 'Web Projects listening on port 3001!' )
})


if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html'));});
}
