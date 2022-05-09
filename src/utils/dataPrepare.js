import React from "react";

export const getTagListData = (submissionDetails) => {
  const tagList = [];
  let seen = new Map();
  submissionDetails.map((submission) => {
    if (
      submission.tags.length !== 0 &&
      submission.verdict === "OK" &&
      !seen.has(submission.contestId + submission.index)
    ) {
      submission.tags.forEach((tag) => {
        tagList.push(tag);
      });
      seen.set(submission.contestId + submission.index, true);
    }
    return 0;
  });
  const count = new Map();
  tagList.map((tag) => {
    if (count[tag] === undefined) {
      count[tag] = 1;
    } else {
      count[tag]++;
    }
    return 0;
  });
  const sorted = Object.keys(count)
    .sort((key1, key2) => count[key2] - count[key1])
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: count[key],
      }),
      {}
    );
  return sorted;
};

export const createLink = (contestLink, rank, contestId, color) => {
  return (
    <div>
      {rank}(
      <a
        style={{ color: color, fontWeight: "bold" }}
        target="_blank"
        rel="noreferrer"
        href={contestLink}
      >
        {contestId}
      </a>
      )
    </div>
  );
};

export const getContestDetails = (contests) => {
  const contestPlaceHolder = {
    ratedCount: 0,
    bestRank: "N/A",
    worstRank: "N/A",
    maxUp: "N/A",
    maxDown: "N/A",
    maxRating: "N/A",
    currentRating: "N/A",
  };
  console.log(contests.length, "HELLO", contests)
  if (contests.length === 0) return contestPlaceHolder;
  let bestRank = Number.MAX_SAFE_INTEGER,
    worstRank = Number.MIN_SAFE_INTEGER,
    maxDelta = Number.MIN_SAFE_INTEGER,
    minDelta = Number.MAX_SAFE_INTEGER,
    bestRankContestId = null,
    worstRankContestId = null,
    maxDeltaContestId = null,
    minDeltaContestId = null,
    rating = null,
    maxRating = 0;
  contests.map((contest) => {
    if (bestRank >= contest.rank) {
      bestRank = contest.rank;
      bestRankContestId = contest.contestId;
    }
    if (contest.rank > worstRank) {
      worstRank = contest.rank;
      worstRankContestId = contest.contestId;
    }
    if (maxDelta < contest.delta) {
      maxDelta = contest.delta;
      maxDeltaContestId = contest.contestId;
    }
    if (contest.delta < minDelta) {
      minDelta = contest.delta;
      minDeltaContestId = contest.contestId;
    }
    rating = contest.newRating;
    maxRating = Math.max(maxRating, contest.newRating);
    return 0;
  });
  const result = {
    ratedCount: contests.length,
    maxRating: maxRating,
    //contestLink, rank, contestId, color
    bestRank: {
      contestLink: `https://codeforces.com/contest/${bestRankContestId}`,
      rank: bestRank,
      contestId: bestRankContestId,
    },
    worstRank: {
      contestLink: `https://codeforces.com/contest/${worstRankContestId}`,
      rank: worstRank,
      contestId: worstRankContestId,
    },
    maxUp: {
      contestLink: `https://codeforces.com/contest/${maxDeltaContestId}`,
      rank: maxDelta,
      contestId: maxDeltaContestId,
    },
    maxDown: {
      contestLink: `https://codeforces.com/contest/${minDeltaContestId}`,
      rank: minDelta,
      contestId: minDeltaContestId,
    },
    currentRating: rating,
  };
  return result;
};

export const getLevelListData = (submissionDetails) => {
  const acceptedProblems = submissionDetails.reduce((res, value) => {
    if (value.verdict === "OK") {
      res.push(value);
    }
    return res;
  }, []);
  const reduced = Object.values(acceptedProblems).reduce((res, { index }) => {
    res[index[0]] = res[index[0]] || { key: index[0], count: 0 };
    res[index[0]].count++;
    return res;
  }, {});
  const ordered = Object.keys(reduced)
    .sort()
    .reduce((obj, key) => {
      obj[key] = reduced[key].count;
      return obj;
    }, {});
  return ordered;
};

export const getRatingListData = (submissionDetails) => {
  const acceptedProblems = submissionDetails.reduce((res, value) => {
    if (value.verdict === "OK") {
      res.push(value);
    }
    return res;
  }, []);
  let seen = new Map();
  const reduced = Object.values(acceptedProblems).reduce(
    (res, { contestId, rating, index }) => {
      res[rating] = res[rating] || { key: rating, count: 0 };
      if (seen.has(contestId + index)) {
        return res;
      }
      seen.set(contestId + index, true);
      res[rating].count++;
      return res;
    },
    {}
  );
  const results = Object.keys(reduced)
    .sort((key1, key2) => key1 - key2)
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: reduced[key].count,
      }),
      {}
    );
  return results;
};

export const getAcceptedOnly = (submissionDetails) => {
  return submissionDetails.reduce((res, obj) => {
    if (obj.verdict === "OK") {
      res.push(obj);
    }
    return res;
  }, []);
};

export const getCount = (submissions) => {
  let count = 0;
  Object.values(submissions).reduce((res, { contestId, index }) => {
    res[contestId + index] = res[contestId + index] || {
      key: contestId + index,
      count: 0,
    };
    res[contestId + index].count++;
    count = Math.max(res[contestId + index].count, count);
    return res;
  }, {});
  return count;
};

export const maxAcceptedCount = (submissionDetails1, submissionDetails2) => {
  return [
    getCount(getAcceptedOnly(submissionDetails1)),
    getCount(getAcceptedOnly(submissionDetails2)),
  ];
};

const acceptedCountWithSingleSubmission = (submissions) => {
  const reduced = Object.values(submissions).reduce(
    (res, { contestId, index, verdict }) => {
      res[contestId + index] = res[contestId + index] || {
        key: contestId + index,
        count: 0,
        accepted: false,
      };
      res[contestId + index].count++;
      if (verdict === "OK") {
        res[contestId + index].accepted = true;
      }
      return res;
    },
    {}
  );

  let count = 0;
  Object.values(reduced).forEach((obj) => {
    if (obj.count === 1 && obj.accepted) {
      ++count;
    }
  });

  return count;
};

export const getSolveWithSingleSubmissionCount = (
  submissionDetails1,
  submissionDetails2
) => {
  return [
    acceptedCountWithSingleSubmission(submissionDetails1),
    acceptedCountWithSingleSubmission(submissionDetails2),
  ];
};

export const maxTriedCount = (submissionDetails1, submissionDetails2) => {
  return [getCount(submissionDetails1), getCount(submissionDetails2)];
};

export const getTriedSolvedCount = (submissionDetails1, submissionDetails2) => {
  let tried1 = 0,
    accepted1 = 0,
    tried2 = 0,
    accepted2 = 0;
  let accepted = new Set();
  let problems = new Set();
  submissionDetails1.map((sub) => {
    if (sub.verdict === "OK") {
      accepted.add(sub.contestId + sub.index);
    }
    problems.add(sub.contestId + sub.index);
    return 0;
  });
  tried1 = problems.size;
  accepted1 = accepted.size;
  accepted = new Set();
  problems = new Set();
  submissionDetails2.map((sub) => {
    if (sub.verdict === "OK") {
      accepted.add(sub.contestId + sub.index);
    }
    problems.add(sub.contestId + sub.index);
    return 0;
  });
  tried2 = problems.size;
  accepted2 = accepted.size;
  return [tried1, accepted1, tried2, accepted2];
};

export const getCommonProblemStats = (
  submissionDetails1,
  submissionDetails2
) => {
  const reduced1 = Object.values(submissionDetails1).reduce(
    (res, { contestId, index, verdict }) => {
      res[contestId + index] = res[contestId + index] || {
        key: contestId + index,
        count: 0,
        accepted: false,
      };
      res[contestId + index].count++;
      if (verdict === "OK") {
        res[contestId + index].accepted = true;
      }
      return res;
    },
    {}
  );
  const reduced2 = Object.values(submissionDetails2).reduce(
    (res, { contestId, index, verdict }) => {
      res[contestId + index] = res[contestId + index] || {
        key: contestId + index,
        count: 0,
        accepted: false,
      };
      res[contestId + index].count++;
      if (verdict === "OK") {
        res[contestId + index].accepted = true;
      }
      return res;
    },
    {}
  );
  let tried1 = 0,
    solved1 = 0,
    tried2 = 0,
    solved2 = 0;
  Object.keys(reduced1).forEach((key) => {
    if (reduced2[key]) {
      if (reduced2[key].accepted) {
        solved2++;
      }
      if (reduced1[key].accepted) {
        solved1++;
      }
      tried1++;
      tried2++;
    }
  });
  return [tried1, solved1, tried2, solved2];
};

export const combineCount = (data1, data2) => {
  let keys = new Set();
  Object.keys(data1).forEach((key) => {
    keys.add(key);
    return 0;
  });
  Object.keys(data2).forEach((key) => {
    keys.add(key);
    return 0;
  });
  let count = new Map();
  keys.forEach((key) => {
    if (data1[key] && data2[key]) {
      count.set(key, { user1: data1[key], user2: data2[key] });
    } else if (data1[key]) {
      count.set(key, { user1: data1[key], user2: 0 });
    } else {
      count.set(key, { user1: 0, user2: data2[key] });
    }
  });
  return count;
};
