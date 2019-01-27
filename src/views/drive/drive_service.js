import axios from 'axios';

class DriveService {
  // METHODS
  getDrives() {
    const URL = 'https://s3.amazonaws.com/waysily-img/trips.json';

    return axios.get(URL).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    }).catch((error) => {
      console.log(error);
    });
  }
}

// MAIN EXPORTS
export default new DriveService();
