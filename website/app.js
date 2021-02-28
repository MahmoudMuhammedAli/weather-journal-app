/* Global Variables */
const apiURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=884f27b5cd80e8722d04e0133825699a&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
//adding 1 on d.getMonth() as  the returne value is zero based
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// fetching OWM API
const getAPI = async (url, zip, key) => {
    const result = await fetch(url + zip + key)
    try {
        const finalRes = await result.json();
        return finalRes;
    }
    catch (err) {
        console.error(err)
    }
}
/* event listener*/

    document.getElementById('generate').addEventListener('click', () => {
        let feelings = document.getElementById('feelings').value;
        let zip = document.getElementById('zip').value;
        getAPI(apiURL, zip, apiKey)
            .then((weather) => {
                entry = {
                    temp: weather.list[0].main.temp,
                    date: newDate,
                    response: feelings
                }
                console.log(entry)
                postData('/all', entry)
                asyncUpdateUi();
            })

    });

// client side POST 
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};
// updating the ui using async GET to get fetch the data

const asyncUpdateUi = async()=>{
    const request = await fetch ('/all')
    try{
        const Data = await request.json();
        document.getElementById('temp').innerHTML = `Temperature: ${Data.temp}`
        document.getElementById('date').innerHTML = `Date: ${Data.date}`
        document.getElementById('content').innerHTML = `Feelings: ${Data.response}`
    }catch(error){console.log("error", error)}
}
