const request = require("request");
const process = require('process');
const fs = require('fs');
const { json } = require('stream/consumers');

const options = {
  method: 'GET',
  url: 'https://icanhazdadjoke.com//search',
  headers: {Accept: 'application/json'},
  qs : {term : process.argv[2]}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  const chistes = JSON.parse(body).results;
    for(chistecito in chistes){
    console.log(chistes[chistecito].joke)
   /* fs.appendFile('loc.txt',JSON.stringify(chistecito),(err) => {
        if(err){
            console.log(err)
        }
    })}*/

    }
});
