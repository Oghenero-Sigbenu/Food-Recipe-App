import axios from "axios";
// import store from "../store";

const instance = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		"Content-Type": "application/json"
			}
			});

export default instance;
