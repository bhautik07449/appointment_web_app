import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            // console log formdata            
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className="max-w-6xl mx-auto p-6 min-h-screen overflow-auto h-32">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Doctor</h2>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">
                    {/* Profile Picture Upload */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="doc-img" className="cursor-pointer">
                            <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-300 hover:border-primary transition-colors">
                                {docImg ? (
                                    <img src={URL.createObjectURL(docImg)} alt="Doctor preview" className="w-full h-full object-cover" />
                                ) : (
                                    <img src={assets.upload_area} alt="Upload area" className="w-full h-full object-contain p-3" />
                                )}
                            </div>
                        </label>
                        <div>
                            <p className="font-medium text-gray-700">Upload doctor picture</p>
                            <p className="text-sm text-gray-500">JPEG, PNG (Max 2MB)</p>
                        </div>
                        <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" className="hidden" accept="image/*" />
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    type="text"
                                    placeholder="Dr. John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    type="email"
                                    placeholder="doctor@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                                <select
                                    onChange={e => setExperience(e.target.value)}
                                    value={experience}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={`${i + 1} Year${i > 0 ? 's' : ''}`}>
                                            {i + 1} Year{i > 0 ? 's' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fees</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        onChange={e => setFees(e.target.value)}
                                        value={fees}
                                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                        type="number"
                                        placeholder="150"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
                                <select
                                    onChange={e => setSpeciality(e.target.value)}
                                    value={speciality}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                >
                                    <option value="General physician">General Physician</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatricians">Pediatrician</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Degree</label>
                                <input
                                    onChange={e => setDegree(e.target.value)}
                                    value={degree}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    type="text"
                                    placeholder="MD, MBBS, etc."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Address</label>
                                <input
                                    onChange={e => setAddress1(e.target.value)}
                                    value={address1}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    type="text"
                                    placeholder="Street address"
                                    required
                                />
                                <input
                                    onChange={e => setAddress2(e.target.value)}
                                    value={address2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    type="text"
                                    placeholder="City, State, ZIP"
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">About the Doctor</label>
                        <textarea
                            onChange={e => setAbout(e.target.value)}
                            value={about}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                            rows={4}
                            placeholder="Brief professional bio, specialties, achievements..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Add Doctor
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddDoctor