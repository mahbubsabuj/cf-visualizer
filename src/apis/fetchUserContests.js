import axios from "axios";

const fetchUserContests = async (handle) => {
  const response = await axios.get("https://codeforces.com/api/user.rating", {
    params: {
      handle: handle,
    },
  });
  const results = response.data.result.map((contest) => {
    return {
      contestId: contest.contestId,
      contestName: contest.contestName,
      newRating: contest.newRating,
      oldRating: contest.oldRating,
      rank: contest.rank,
      delta: contest.newRating - contest.oldRating,
    };
  });
  return results;
};

export default fetchUserContests;
