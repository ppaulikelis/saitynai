export function handleListQuery(page: number, count: number) {
  const maxTake = 50;
  let skip;
  let take;
  if (isNaN(count) || count < 1 || count > maxTake) {
    take = maxTake;
  } else {
    take = count;
  }
  if (isNaN(page) || page < 1) {
    skip = 0;
  } else {
    skip = (page - 1) * take;
  }
  return { skip, take };
}
