export function calcRatingDistribution(subs) {
  const mp = new Map();
  let freq;
  let arr = [];

  // get rating freq's

  subs.forEach((sub) => {
    if (sub.verdict !== "OK" || sub.problem.rating === undefined) return;

    if (mp.has(sub.problem.rating)) freq = mp.get(sub.problem.rating) + 1;
    else freq = 1;
    mp.set(sub.problem.rating, freq);
  });

  // get most solved problems.

  for (const [key, value] of mp) {
    arr.push({ rating: key, frequency: value });
  }

  arr.sort((a, b) => b.frequency - a.frequency);

  if (arr.length > 7) {
    arr.splice(7); // Remove elements starting from index 7 and beyond
  }

  arr.sort((a, b) => a.rating - b.rating);
  return arr;
}

export function calcTagsDistribution(subs) {

  const mp = new Map([
    ["data structures", 0],
    ["strings", 0],
    ["dp", 0],
    ["greedy", 0],
    ["graphs", 0],
    ["trees", 0]
  ]);

  subs.forEach((sub) => {
    if (sub.verdict !== "OK" || sub.problem.rating === undefined) return;

    sub.problem.tags.forEach((tag) => {
      if(mp.has(tag))
        mp.set(tag, mp.get(tag) + 1);
    })
  });

  let arr = [];
  for (const [key, value] of mp) {
    arr.push({ tag: key, frequency: value });
  }
  return arr;
}