export function isHand(spaceId, color) {
  switch(color) {
    case "red":
      return spaceId > 100 && spaceId < 105;
    case "blue":
      return spaceId > 200 && spaceId < 205;
    case "green":
      return spaceId > 300 && spaceId < 305;
    case "yellow":
      return spaceId > 400 && spaceId < 405;
    default:
      return false;
  }
};

export function isCamp(spaceId, color) {
  switch(color) {
    case "red":
      return spaceId < 100 && spaceId % 10 === 1;
    case "blue":
      return spaceId < 100 && spaceId % 10 === 6;
    case "green":
      return spaceId > 11 && spaceId < 16;
    case "yellow":
      return spaceId > 61 && spaceId < 66;
    default:
      return false;
  }
};

export function isBoard(spaceId) {
  return spaceId > 11 && spaceId < 66
};