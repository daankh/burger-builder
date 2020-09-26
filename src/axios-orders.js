import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-86244.firebaseio.com/",
});

export default instance;
