export default class ApiService {
    constructor(token, notify) {
      this.token = token;
      this.notify = notify;
      this.baseUrl = 'https://localhost:7263/';
    }
  
    async request(endpoint, method = 'GET', data = null) {
      const options = {
        method,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      };
  
      if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
      }
  
      try {
        const response = await fetch(this.baseUrl + endpoint, options);
        const responseJson = await response.json();
  
        if (responseJson.errors) {
          if (this.notify) {
            this.notify({ title: 'Error', message: responseJson.errors[0], type: 'error' });
          }else{
            throw new Error(responseJson.errors[0]);
          }
        }
  
        return responseJson;
      } catch (error) {
        if (this.notify) {
          this.notify({ title: 'Connection error', message: error.message, type: 'error' });
        }else{
          throw error;
        }
    }
    }
  
    get(endpoint, params = {}) {
      const query = new URLSearchParams(params).toString();
      return this.request(endpoint + (query ? '?' + query : ''), 'GET');
    }
  
    post(endpoint, data) {
      return this.request(endpoint, 'POST', data);
    }
  
    put(endpoint, data) {
      return this.request(endpoint, 'PUT', data);
    }
  
    delete(endpoint) {
      return this.request(endpoint, 'DELETE');
    }
  }