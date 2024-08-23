import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import CreateProfileForm from "../app/components/CreateProfileForm";
import ReactButton from "../app/components/ReactButton";
import urlConfig from "../config/urlConfig";

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [buttnText, setButtnText] = useState("Update Profile");
  const [message, setMessage] = useState("");
  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      const response = await axios.get(
        `${urlConfig.baseUrl}${urlConfig.getProfile}${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setProfileData(response.data);
      } else {
        setProfileData(null);
      }
    } catch (err) {
      setError("Failed to fetch data.");
      setProfileData(null);
    }
  };

  const onShowForm = () => {
    setShowForm(!showForm);
    setMessage("");
    showForm ? setButtnText("Update Profile") : setButtnText("Show Profile");
  };

  const btnText =
    !profileData || !profileData.data || profileData.data.length === 0
      ? "Create Profile"
      : buttnText;
  const { userName, occupation, description, dob, image } =
    profileData?.data?.[0] || {};

  const date = dob ? new Date(dob) : null;
  const formattedDate = date ? date.toISOString().split("T")[0] : "";

  const userData = {
    userName,
    occupation,
    description,
    formattedDate,
    image,
  };

  return (
    <MainLayout>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            {showForm || !profileData ? (
              <div className="row justify-content-center mb-5">
                <div className="col-md-8 col-lg-6">
                  <div className="card shadow-sm p-4">
                    <CreateProfileForm
                      data={userData}
                      btnText={btnText}
                      getProfileData={getProfileData}
                      setButtnText={setButtnText}
                      setMessage={setMessage}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-5">
                {profileData && profileData.data.length > 0 && (
                  <div className="card p-3 py-4">
                    <div className="text-center">
                      <img
                        src={image}
                        width="100"
                        className="rounded-circle"
                        alt="Profile"
                      />
                    </div>

                    <div className="text-center mt-3">
                      <span className="bg-secondary p-1 px-4 rounded text-white">
                        {userName}
                      </span>
                      <h5 className="mt-2 mb-0">{occupation}</h5>
                      <span>{formattedDate}</span>

                      <div className="px-4 mt-1">
                        <p className="fonts">{description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <ReactButton
              reactBtnOuterDiv={"mt-4"}
              btnText={btnText}
              btnClass={"btn-dark"}
              onClickfn={onShowForm}
            />
            {message && (
              <div className="fw-bold text-center text-success mt-3">
                {message}
              </div>
            )}
            {error && (
              <div className="fw-bold text-center text-danger mt-3">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
