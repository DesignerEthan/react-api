# Simple Express API - JSON file

A simple api end point for adding, deleting, editing and reading data from webprojects.json

## Install

1. Unzip the folder
2. npm install
3. npm start

Access api at localhost:8080/api/

## Read Data : GET

In PostMan setup a GET request for this endpoint. 

```html
http://localhost:8080/api
```

## Add Data : POST

In PostMan setup a POST request for this endpoint with the following params [title, description, URL]
* ID's auto increment - no need to pass an ID

```html
localhost:8080/api/title={}&description={}&URL={}
```

## Edit Data : PUT

In PostMan setup a PUT request for this endpoint to change either the title or description by ID

### Title & Description & URL
```html
http://localhost:8080/api/change/id/{}/?title={}&description={}&URL={}
```

Replace id={} with the entry ID and the title & description & URL {} with the new data. 


## Delete Data : Delete

In PostMan setup a DELETE request for this endpoint with the entry ID to be removed.

```html
http://localhost:8080/api/delete/id/{}
ie .. http://localhost:8080/api/3 to delete entry 3
```
