import React, { useState } from "react";
import ReactInput from "./ReactInput";
import ReactButton from "./ReactButton";
import urlConfig from "../../config/urlConfig";
import axios from "axios";

const CreateProfileForm = ({
  data,
  getProfileData,
  btnText,
  setButtnText,
  setMessage,
}) => {
  const userId = localStorage.getItem("userId");
  const { userName, occupation, description, image, formattedDate } =
    data || {};
  const [formData, setFormData] = useState({
    image: image || "",
    userName: userName || "",
    occupation: occupation || "",
    dob: formattedDate || "",
    description: description || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(image || "");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    if (!imageFile && !formData.image) {
      formErrors.image = "Image required";
    }
    if (!formData.userName.trim()) {
      formErrors.userName = "User Name is required";
    }
    if (!formData.occupation.trim()) {
      formErrors.occupation = "Occupation is required";
    }
    if (!formData.dob) {
      formErrors.dob = "Date is required";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dob)) {
      formErrors.dob = "Date must be in YYYY-MM-DD format";
    }
    if (!formData.description.trim()) {
      formErrors.description = "Description is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let updateData;

        if (btnText === "Create Profile") {
          updateData = await axios.post(
            `${urlConfig.baseUrl}${urlConfig.createProfile}`,
            { ...formData, image: imageFile || image, userId: userId },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (updateData.status === 200) {
            setMessage("Profile Created Successfully!!");
          }
        } else if (btnText === "Show Profile") {
          updateData = await axios.put(
            `${urlConfig.baseUrl}${urlConfig.updateProfile}${userId}`,
            { ...formData, image: imageFile || image, userId: userId },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (updateData.status === 200) {
            setMessage("Profile Updated Successfully!!");
          }
        }

        if (updateData && updateData.status === 200) {
          setButtnText("Show Profile");
          getProfileData();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {previewImage && (
        <img
          src={previewImage}
          alt="Profile Preview"
          className="img-thumbnail mb-3 text-center"
          style={{ maxWidth: "150px" }}
        />
      )}
      <ReactInput
        type="file"
        name="image"
        label="Upload Image"
        placeholder="Choose image"
        onChange={handleChange}
        error={errors.image}
      />

      <ReactInput
        type="text"
        name="userName"
        label="User Name"
        placeholder="Enter user name"
        value={formData.userName}
        onChange={handleChange}
        error={errors.userName}
      />

      <ReactInput
        type="text"
        name="occupation"
        label="Occupation"
        placeholder="Enter occupation"
        value={formData.occupation}
        onChange={handleChange}
        error={errors.occupation}
      />

      <ReactInput
        type="date"
        name="dob"
        label="Date"
        placeholder="Enter date (YYYY-MM-DD)"
        value={formData.dob}
        onChange={handleChange}
        error={errors.dob}
      />

      <ReactInput
        type="text"
        name="description"
        label="Description"
        placeholder="Enter description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
      />

      <ReactButton
        btnText={"Submit"}
        btnType="submit"
        btnClass={"btn-primary mt-3"}
      />
    </form>
  );
};

export default CreateProfileForm;
