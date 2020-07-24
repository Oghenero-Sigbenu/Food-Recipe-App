import axios from "axios";
// import store from "../store";
require("dotenv").config();

const instance = axios.create({
	// baseURL: "http://localhost:5000/api/v1",
	// baseURL: "https://neronode.herokuapp.com/api/v1",
	baseURL: "https://afternoon-taiga-13473.herokuapp.com/api/v1",
	headers: {
		"Content-Type": "application/json"

		}
	});

export default instance;
