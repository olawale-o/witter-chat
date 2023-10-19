

const url = "https://api.cloudinary.com/v1_1/" + process.env.REACT_APP_CLOUDINARY_CLOUD_NAME + "/auto/upload";

export const uploadService = async (formData) => {
  return fetch(url, {
    method: "POST",
    body: formData
  }).then((response) => {
    return response.json();
  });
};

