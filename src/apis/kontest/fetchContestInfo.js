import axios from "axios";

const fetchContestInfo = async () => {
  const response = await axios.get("https://kontests.net/api/v1/all");
  return response.data;
};

export default fetchContestInfo;