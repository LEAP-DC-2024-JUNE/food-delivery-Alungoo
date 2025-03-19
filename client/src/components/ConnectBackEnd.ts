import axios from "axios";

async function ConnectBackEnd() {
  const res = await axios.post("http://localhost:4000/api", "hi");
  return res.data;
}

export default ConnectBackEnd;
