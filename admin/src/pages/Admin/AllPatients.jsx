import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"

const AllPatients = () => {
    const { patients,  getAllPatients} = useContext(AdminContext)
    
    useEffect(() => {        
        getAllPatients()
    })
    return (
         <div className='w-full m-5 '>
        
              <p className='mb-3 text-lg font-medium'>All Patients</p>
        
              <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
                <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1.5fr_2.5fr_1.5fr_1fr_2fr] grid-flow-col py-3 px-6 border-b'>
                  <p>#</p>
                  <p>name</p>
                  <p>dob</p>
                  <p>email</p>
                  <p>phone</p>
                  <p>gender</p>
                  <p>address</p>
                </div>
                {patients.map((item, index) => (
                  <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1.5fr_2.5fr_1.5fr_1fr_2fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                    <p className='max-sm:hidden'>{index+1}</p>
                    <div className='flex items-center gap-2'>
                      <img src={item.image} className='w-8 rounded-full' alt="" /> <p>{item.name}</p>
                    </div> 
                    <p className='max-sm:hidden'>{(item.dob)}</p>
                    <p>{item.email}</p>
                    <p>{item.phone}</p>
                    <p>{item.gender}</p>
                    <p>{item.address.line1}</p>
                  </div>
                ))}
              </div>
        
            </div>
    )
}

export default AllPatients