import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className="p-6 sm:p-12">
            <div className="flex flex-col sm:flex-row gap-8">

                {/* Profile Image */}
                <div className="sm:w-64 w-full flex-shrink-0">
                    <img
                        className="w-full rounded-2xl object-cover bg-primary/80"
                        src={profileData.image}
                        alt={profileData.name}
                    />
                </div>

                {/* Profile Details */}
                <div className="flex-1 bg-white border border-stone-200 rounded-2xl shadow-sm p-6 space-y-5">

                    {/* Name, Degree & Speciality */}
                    <div>
                        <p className="text-2xl sm:text-3xl font-semibold text-gray-800">{profileData.name}</p>
                        <div className="flex items-center gap-3 text-gray-600 mt-1">
                            <span>{profileData.degree} - {profileData.speciality}</span>
                            <span className="px-2 py-0.5 text-xs bg-gray-100 border rounded-full">{profileData.experience}</span>
                        </div>
                    </div>

                    {/* About Section */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-1">About:</h3>
                        {
                            isEdit ? (
                                <textarea
                                    className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-primary resize-none"
                                    rows={6}
                                    value={profileData.about}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                />
                            ) : (
                                <p className="text-sm text-gray-600">{profileData.about}</p>
                            )
                        }
                    </div>

                    {/* Fees */}
                    <div>
                        <p className="text-sm text-gray-700 font-medium">
                            Appointment Fee:
                            <span className="text-gray-900 ml-1">
                                {currency} {
                                    isEdit ? (
                                        <input
                                            type="number"
                                            className="inline-block w-24 ml-2 border border-gray-200 rounded px-2 py-1 text-sm outline-primary"
                                            value={profileData.fees}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                        />
                                    ) : profileData.fees
                                }
                            </span>
                        </p>
                    </div>

                    {/* Address */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Address:</h4>
                        {
                            isEdit ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm outline-primary"
                                        value={profileData.address.line1}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                    />
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm outline-primary"
                                        value={profileData.address.line2}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                    />
                                </div>
                            ) : (
                                <p className="text-sm text-gray-600">
                                    {profileData.address.line1}<br />
                                    {profileData.address.line2}
                                </p>
                            )
                        }
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={profileData.available}
                            onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                            className="h-4 w-4 text-primary border-gray-300 rounded"
                        />
                        <label className="text-sm text-gray-700">Available</label>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3">
                        {
                            isEdit ? (
                                <button
                                    onClick={updateProfile}
                                    className="px-5 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all text-sm"
                                >
                                    Save Changes
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEdit(prev => !prev)}
                                    className="px-5 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all text-sm"
                                >
                                    Edit Profile
                                </button>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )

}

export default DoctorProfile