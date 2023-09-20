import axios from "axios";

export const NodeURL = "http://localhost:4001";

export const client = axios.create({
  baseURL: NodeURL,
});

client.defaults.responseType = "json";

const request = (options) => {
  const onSuccess = (response) => {
    if (response.data.status === "00") {
      alert("something Went wrong");
    }
    return response.data;
  };
  const onError = (error) => {
    return Promise.reject(error.response || error.message);
  };
  return client(options).then(onSuccess).catch(onError);
};
export default request;