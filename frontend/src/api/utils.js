//? IGDB images url
export const imgPath = 'https://images.igdb.com/igdb/image/upload/t_1080p';

// User must begin with a letter, followed by 3-23 combination of letters, numbers, -, or _
export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

// Must contain 1 lower, 1 upper, 1 number, 1 special character, 8-24 characters long
export const PASS_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%])[a-zA-Z0-9!@#$%]{8,24}$/;

// Email regex of form: (yourname) @ (domain) . (extension)(.again)
export const EMAIL_REGEX = /^([a-zA-Z\d\.-]+)@([a-zA-Z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

export const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

//? Apply correct color based on game rating
export const getRatingColor = (rating) => {
  if (rating >= 95)
    return { backgroundColor: 'gold', color: 'black' };
  else if (rating >= 90)
    return { color: 'lime' };
  else if (rating >= 80)
    return { color: 'limegreen' };
  else if (rating >= 70)
    return { color: 'yellow' };
  else if (rating >= 60)
    return { color: 'orange' };
  else
    return { color: 'crimson' };
}