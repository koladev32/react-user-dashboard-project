/*
 * API URLS configuration depending on the environment
 */

let API_URL: string;

if (process.env.NODE_ENV === "production") {
  API_URL =
    "https://fake-nodejs-server.herokuapp.com";
} else if (process.env.NODE_ENV === "development") {
  API_URL = "http://localhost:3004";
} else {
  API_URL = "";
}

export default API_URL;
