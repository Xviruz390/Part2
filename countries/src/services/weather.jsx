import axios from "axios";

const getWeather = (capital) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=4957645af0dbd7b870fcb6521b874d55&units=metric`)
    return request.then(response => response.data)
}

export default {getWeather}