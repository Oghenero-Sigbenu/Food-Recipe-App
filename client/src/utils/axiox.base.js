import axios from "axios";
// import store from "../store";
require("dotenv").config();

const instance = axios.create({
	// baseURL: "http://localhost:5000/api/v1",
	baseURL: "https://afternoon-taiga-13473.herokuapp.com/",
	headers: {
		"Content-Type": "application/json"

		}
	});

export default instance;
