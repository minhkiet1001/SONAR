// API base URL - adjust this based on your backend configuration
const API_BASE_URL = 'http://localhost:8080/api/auth';
const USER_API_BASE_URL = 'http://localhost:8080/api/user';

class AuthService {
  /**
   * Send OTP to email for registration
   * @param {string} email 
   * @returns {Promise<Object>}
   */
  async sendOtp(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      return data;
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    }
  }

  /**
   * Register a new user
   * @param {Object} userData 
   * @returns {Promise<Object>}
   */
  async register(userData) {
    try {
      // Transform frontend data to match backend DTO
      const registerData = {
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        phone: userData.phone,
        gender: userData.gender?.toUpperCase(), // Convert to backend enum format
        birthdate: userData.dateOfBirth || null,
        address: userData.address || null,
        otp: userData.otp,
      };

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
        }));
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Login user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>}
   */
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
        }));
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  /**
   * Get current user from localStorage
   * @returns {Object|null}
   */
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Get auth token from localStorage
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  /**
   * Get user role
   * @returns {string|null}
   */
  getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  /**
   * Get dashboard path based on user role
   * @returns {string}
   */
  getDashboardPath() {
    const role = this.getUserRole();
    if (!role) return '/login';

    switch (role) {
      case 'CUSTOMER':
        return '/customer/dashboard';
      case 'DOCTOR':
        return '/doctor/dashboard';
      case 'STAFF':
        return '/staff';
      case 'MANAGER':
        return '/manager';
      case 'ADMIN':
        return '/admin';
      default:
        return '/customer/dashboard';
    }
  }

  /**
   * Make authenticated API request
   * @param {string} url 
   * @param {Object} options 
   * @returns {Promise<Response>}
   */
  async authenticatedFetch(url, options = {}) {
    const token = this.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, {
      ...options,
      headers,
    });
  }

  /**
   * Get current user profile from backend
   * @returns {Promise<Object>}
   */
  async getUserProfile() {
    try {
      const response = await this.authenticatedFetch(`${USER_API_BASE_URL}/profile`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user profile');
      }

      return data.data; // Return the profile data
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  }

  /**
   * Update current user profile
   * @param {Object} profileData 
   * @returns {Promise<Object>}
   */
  async updateUserProfile(profileData) {
    try {
      const response = await this.authenticatedFetch(`${USER_API_BASE_URL}/profile`, {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Update localStorage with new user info
      const currentUser = this.getCurrentUser();
      if (currentUser && data.data) {
        const updatedUser = {
          ...currentUser,
          name: data.data.name || currentUser.name,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      return data.data; // Return the updated profile data
    } catch (error) {
      console.error('Update user profile error:', error);
      throw error;
    }
  }

  /**
   * Get current user basic info from backend
   * @returns {Promise<Object>}
   */
  async getCurrentUserInfo() {
    try {
      const response = await this.authenticatedFetch(`${USER_API_BASE_URL}/me`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user info');
      }

      // Update localStorage with fresh user info
      if (data.data) {
        localStorage.setItem('user', JSON.stringify(data.data));
      }

      return data.data;
    } catch (error) {
      console.error('Get current user info error:', error);
      throw error;
    }
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService; 