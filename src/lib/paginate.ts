export function getOffsetParams(page: number, limit = 20) {
  return `offset=${page * limit}&limit=${limit}`;
}
