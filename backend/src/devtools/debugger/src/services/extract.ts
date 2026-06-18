import axios from "axios";

export async function extract(
  file: File
) {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axios.post(

      "http://localhost:3000/api/extract",

      formData,

      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

  return response.data;
}