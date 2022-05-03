# Record Service API
Record Service API is a RESTful API that returns information from a MongoDB database about some records.
Some filtering options between two dates and for a specific period, as well as maximum and minimum count values, are available.

### Live Demo
https://node-record-service.herokuapp.com/api/v1/

## Features

- No transpilers, just vanilla javascript
- CORS enabled
- Express + MongoDB ([Mongoose](http://mongoosejs.com/))
- [Docker](https://www.docker.com/) support
- Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
- Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
- Request validation with [joi](https://github.com/hapijs/joi)
- Gzip compression with [compression](https://github.com/expressjs/compression)
- Linting with [eslint](http://eslint.org)
- Tests with [Jest](https://jestjs.io/), [supertest](https://github.com/visionmedia/supertest) 
- Logging with [morgan](https://github.com/expressjs/morgan)
- API documentation generation with [swagger](https://swagger.io/)
- Monitoring with [pm2](https://github.com/Unitech/pm2)

### Endpoints
#### POST /api/v1/records
expects the following body parameters in JSON format:
- startDate: the starting date in ISO 8601 format.
- endDate:  the ending date in ISO 8601 format.
- minCount: an integer value indicating the minimum value of sum of each record's count values.
- maxCount an integer value indicating the maximum value of sum of each record's count values.

#### Example of the request body parameters. 
```json 
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```

It return the following parameters:
- code: A code that indicates the operation's status. `0` indicates a successful response, `400` indicates a client error, and `500` indicates a server error.
- msg: The textual message describing the operation's status. A proper validation error states if the format of any request parameter value is incorrect.`success` is for the succinct message, and a proper validation error states if the format of any request parameter value is incorrect.
- records: An array of object contains a unique string `key` value, the `createdAt` that denotes creation time of the record and `totalCount` that shows sum of the integer values inside the count array of the DB record field. 

#### Example of the response body parameters. 

```json 
{
  "code": 0,
  "msg": "Success",
  "records": [
    {
      "key": "TAKwGc6Jr4i8Z487",
      "createdAt": "2017-01-28T01:22:14.398Z",
      "totalCount": 2800
    }
  ]
}
```

## Usage
- You can use the [**live demo**](https://node-record-service.herokuapp.com/api/v1/) version 
- You can clone the repository and then
  - If you have [Docker](https://docs.docker.com/get-docker/) installed run the following commands
    `docker build -t record-service .`
	   `docker run -d -p 8080:8080 --name record-service record-service`
	 Then navigate to  [http://localhost:8080/api/v1/](http://localhost:8080/api/v1/) in your browser
  - You can run `npm install` command first, followed by `npm run start` and then navigate to  [http://localhost:8080/api/v1/](http://localhost:8080/api/v1/) in your browser
  
 ## Testing

following testing frameworks is used for implementing and running integration test:
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)

to run the tests use the following command:

```sh
   npm run test
```

