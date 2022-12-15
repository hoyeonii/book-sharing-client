import axios from "axios";

function loadPosts() {
  return axios.get("https://anbda.herokuapp.com/posts").then((res) => {
    console.log(res.data);
    return res.data;
  });
}

export default loadPosts;
