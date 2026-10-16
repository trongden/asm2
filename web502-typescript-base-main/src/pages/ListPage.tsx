import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: number;
  employmentType: string;
  description: string;
}
function ListPage() {
  const [jobs,setJobs] = useState<Job[]>([])

  const navigate = useNavigate();

  function getJobs() {
    axios.get(`http://localhost:3000/jobs`).then((res)=>{
      setJobs(res.data);
    });
  }
  useEffect (() =>{
    getJobs();
  },[])

  function deleteJobs(id:number){
    if(window.confirm("bạn có chắc chắn muốn xóa?")) {
    axios.delete(`http://localhost:3000/jobs/${id}`).then(()=>{
      getJobs();
    });
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>
      <button
          onClick={() => navigate("/add")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-fit font-medium"
        >
          + Thêm phim mới
        </button>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">STT</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Tên công việc
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Công ty tuyển dụng
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Địa điểm
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Mức lương
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Hình thức làm việc
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Mô tả
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((item : Job, index: number) => {
              return (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">{index+1}</td>
              <td className="px-4 py-2 border border-gray-300">{item.title}</td>
              <td className="px-4 py-2 border border-gray-300">{item.company}</td>
              <td className="px-4 py-2 border border-gray-300">{item.location}</td>
              <td className="px-4 py-2 border border-gray-300">{item.salary}</td>
              <td className="px-4 py-2 border border-gray-300">{item.employmentType}</td>
              <td className="px-4 py-2 border border-gray-300">{item.description}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="border" onClick={()=> deleteJobs(item.id)}> Delete</button>
                <button className="border" onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
              </td>
            </tr>
            )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
