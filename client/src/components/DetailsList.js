import { getItem } from '../api/itemApi';
import Navbar from './Navbar'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import SyncLoader from "react-spinners/SyncLoader";
import Footer from './Footer';
export default function DetailsList() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemList] = useState([]);
  useEffect(() => {
     try {
        location.state.data.items.forEach(async element => {
            try {
                const res = await getItem(element.id);
                setItemList(prevData =>[...prevData, res])
            } catch (err) {
                console.log(err);
            }
        });
     } catch(err) {
        console.log(err);
     }
     setLoading(false);
  }, []);
  useEffect(() => {
    console.log(itemsList)
  },[itemsList])
  return (
    <>
    <Navbar></Navbar>
    {loading && (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader loading={loading} color="#4287f5" />
        </div>
      )}
     {!loading && (
         <div className='px-20 py-20' style={{fontFamily:"Inter"}}>
         <div className="px-4 sm:px-0">
           <h3 className="text-2xl font-bold leading-7 text-gray-900">Order Information</h3>
         </div>
         <div className="mt-6 border-t border-gray-100">
           <dl className="divide-y divide-gray-100">
             <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
               <dt className="text-sm font-medium leading-6 text-gray-900">Order Id</dt>
               <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{location.state.data._id}</dd>
             </div>
             <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
               <dt className="text-sm font-medium leading-6 text-gray-900">Timestamp</dt>
               <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{location.state.data.timestamp}</dd>
             </div>
             <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
               <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
               <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{location.state.data.email}</dd>
             </div>
             <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
               <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
               <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
             </div>
             <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
               <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
               <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                 Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                 qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                 pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
               </dd>
             </div>
           </dl>
         </div>
       </div>
     )}
      <div className="h-40 md:h-28">
        <Footer></Footer>
      </div>
    </>
  )
}
