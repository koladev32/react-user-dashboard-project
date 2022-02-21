/*
 * API URLS configuration depending on the environment
 */

let API_URL: string;

if (process.env.NODE_ENV === "production") {
  API_URL =
    "https://my-json-server.typicode.com/koladev32/react-user-dashboard-project";
} else if (process.env.NODE_ENV === "development") {
  API_URL = "http://localhost:3004";
} else {
  API_URL = "";
}

export default API_URL;
