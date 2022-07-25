// ? Default IGDB query (trending page)
export const defaultQuery = {
  fields: 'name, cover.image_id, rating',
  filter: 'where rating != null & cover != null',
  sort: 'sort ',
  limit: 30,
  page: 1,
  search: '',
}
  
// ? IGDB query buiilder
// ? Takes in query object and constructs IGDB query string
export const queryBuilder = (query) => {
  let qs = `fields ${query.fields}; limit ${query.limit}; `;
  qs += `${(query.filter !== 'where ') ? query.filter + '; ' : ''}`;
  qs += `${(query.sort !== 'sort ') ? query.sort + '; ' : ''}`;
  qs += `${(query.page !== 1) ? 'offset ' + (query.page * query.limit) + '; ' : ''}`;
  qs += `${(query.search.trim() !== '') ? 'search "' + query.search.trim() + '";' : ''}`;
  
  console.log(qs);
  const finalQuery = {query: query, queryString: qs.trim()};
  return finalQuery;
};

//? IGDB images url
export const imgPath = 'https://images.igdb.com/igdb/image/upload/t_1080p';

// User must begin with a letter, followed by 3-23 combination of letters, numbers, -, or _
export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

// Must contain 1 lower, 1 upper, 1 number, 1 special character, 8-24 characters long
export const PASS_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%])[a-zA-Z0-9!@#$%]{8,24}$/;

// Email regex of form: (yourname) @ (domain) . (extension)(.again)
export const EMAIL_REGEX = /^([a-zA-Z\d\.-]+)@([a-zA-Z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

// Check validity of input forms
export const validCheck = (validUsername, validEmail, validPassword, validConfirm) => {
  // Invalid username
  if (!validUsername) {
    return 'Invalid username';
  }
  // Invalid email
  if (!validEmail) {
    return 'Invalid email';
  }
  // Invalid password
  if (!validPassword) {
    return 'Invalid password';
  }
  // Passwords do not match
  if (!validConfirm) {
    return 'Passwords do not match';
  }
}