import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [image, setImage] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  // Function to update user profile data using API
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6 mt-10 text-sm text-gray-700">
      <div className="flex flex-col items-center gap-4">
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer group">
            <img
              className="w-36 h-36 object-cover rounded-full border-4 border-gray-200 group-hover:opacity-70 transition"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
            {!image && (
              <img
                className="w-10 absolute bottom-2 right-2 bg-white rounded-full p-1"
                src={assets.upload_icon}
                alt="Upload Icon"
              />
            )}
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-36 h-36 object-cover rounded-full border-4 border-gray-200"
            src={userData.image}
            alt="Profile"
          />
        )}

        {isEdit ? (
          <input
            className="text-center text-xl font-medium rounded-md py-2 px-3 focus:outline-none w-full max-w-xs border border-b"
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userData.name}
          />
        ) : (
          <div className="bg-gray-100 rounded-md py-2 px-4 text-center text-xl font-medium w-full max-w-xs">
            {userData.name}
          </div>
        )}
      </div>

      <div className="border border-b p-4 rounded-[12px]">
        <p className="text-xl text-gray-500 font-semibold mb-2">
          CONTACT INFORMATION
        </p>
        <div className="space-y-3">
          
          <div>
            <p className="mb-1 font-medium">Email</p>
            <div className="text-[16px] bg-gray-100 rounded-[8px] px-3 py-3 w-full border border-b">
              {userData.email}
            </div>
          </div>

          <div>
            <p className="mb-1 font-medium">Phone</p>
            {isEdit ? (
              <input
                className="text-[16px] rounded-[8px] px-3 py-3 w-full border border-b"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                value={userData.phone}
              />
            ) : (
              <div className="text-[16px] bg-gray-100 rounded-[8px] px-3 py-3 w-full border border-b">
                {userData.phone}
              </div>
            )}
          </div>

          <div>
            <p className="mb-1 font-medium">Address</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  className="text-[16px] rounded-[8px] px-3 py-3 w-full border border-b"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                  placeholder="Line 1"
                />
                {/* <input
                  className="text-[16px] bg-gray-100 rounded-[8px] px-3 py-3 w-full border border-b"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                  placeholder="Line 2"
                /> */}
              </div>
            ) : (
              <div className="text-[16px] bg-gray-100 rounded-[8px] px-3 py-3 w-full border border-b">
                {userData.address.line1}
                <br />
                {/* {userData.address.line2} */}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border border-b p-4 rounded-[12px]">
        <p className="text-xl text-gray-500 font-semibold mb-2">
          BASIC INFORMATION
        </p>
        <div className="space-y-3">
          
          <div>
            <p className="mb-1 font-medium">Gender</p>
            {isEdit ? (
              <select
                className="text-[16px] rounded-[8px] px-3 py-3 w-full border border-b"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <div className="text-[16px] bg-gray-100 rounded-[8px] px-3 py-3 w-full border border-b">
                {userData.gender}
              </div>
            )}
          </div>

          <div>
            <p className="mb-1 font-medium">Birthday</p>
            {isEdit ? (
              <input
                className="text-[16px] rounded-[8px] px-3 py-3 w-full border border-b"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <div className="text-[16px] bg-gray-100 rounded-[8px] px-3 py-3 w-full border border-b">
                {userData.dob}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-primary text-white px-6 py-2 rounded-full w-full max-w-xs hover:bg-opacity-90 transition-all"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary text-primary px-6 py-2 rounded-full w-full max-w-xs hover:bg-primary hover:text-white transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;
