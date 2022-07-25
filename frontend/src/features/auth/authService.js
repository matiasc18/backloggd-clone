import axios from '../../api/axios';

//? Register user
const register = async (userData) => {
  // Make axios request
  const response = await axios.request({
    method: 'post',
    url: 'users/register',
    data: userData
  });

  // Save and return JWT from response if it exists
  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//? Login user
const login = async (userData) => {
  // Make axios request
  const response = await axios.request({
    method: 'post',
    url: 'users/login',
    data: userData
  });

  // Save and return JWT from response if it exists
  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//? Logout user
const logout = () => {
  localStorage.removeItem('user');
}

const authService = {
  register,
  login,
  logout
};

export default authService;