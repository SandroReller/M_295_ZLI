const url = "https://jsonplaceholder.typicode.com/users/1";
const app = require("express");
async function getUserData() {
    try{
        const response = await fetch(url);
        console.log(response.json());

    }
    catch(error){
        console.error("Fehler:", error);

    }




};