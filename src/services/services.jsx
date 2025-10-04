import axios from "axios";
const API_URL = "http://localhost:5000/api/projects";
const Services = {
  fetchProjects: async () => {
    try {
      const response = await axios.get(`${API_URL}/getallprojects`);
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  addNewData: async (newData) => {
    try {
      const formData = new FormData();
      formData.append('title', newData.title);
      formData.append('link', newData.link);
      formData.append('description', newData.description);
      formData.append('image', newData.file); // instead of 'file'

      const response = await axios.post(
        `${API_URL}/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding new project:", error);
      throw error;
    }
  },

  updateData: async (updatedData) => {
    try {
      const formData = new FormData();
      formData.append('title', updatedData.title);
      formData.append('link', updatedData.link);
      formData.append('description', updatedData.description);
      if (updatedData.file) {
        formData.append('image', updatedData.file); // instead of 'file'
      }

      const response = await axios.put(
        `${API_URL}/update/${updatedData._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  deleteData: async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      return id;
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }
};

export default Services;