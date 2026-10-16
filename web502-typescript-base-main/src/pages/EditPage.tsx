import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface JobFormData {
  title: string;
  company: string;
  location: string;
  salary: number;
  employmentType: string;
  description: string;
}
function EditPage() {
    const { id } = useParams(); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<JobFormData>();

  useEffect(()=>{
    if(id){
    axios.get(`http://localhost:3000/jobs/${id}`).then((res)=>{
        reset(res.data)
    });
}
  },[id,reset]);

  const onSubmit = (data: JobFormData) =>{
    const formattedData = {
      ...data,
      salary: Number(data.salary)
    };
    axios.put(`http://localhost:3000/jobs/${id}`, formattedData).then(()=>{
      alert("Sửa thành công");
      navigate("/")
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Chỉnh sửa</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Tên công việc
          </label>
          <input
            {...register("title", {
              required: "Không được để trống"
            })}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.title && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.title.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Công ty tuyển dụng
          </label>
          <input
          {...register("company", {
              required: "Không được để trống"
            })}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.company && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.company.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Địa điểm
          </label>
          <input
          {...register("location", {
              required: "Không được để trống"
            })}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.location && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.location.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Mức lương
          </label>
          <input
          {...register("salary", {
              required: "Không được để trống",
              validate: (value) => {
                if (value === undefined || value === null) {
                  return "Không được để trống";
                }
                const num = Number(value);
                if (isNaN(num) || num <= 0) {
                  return "Lương phải lớn hơn 0";
                }
                return true;
              },
            })}
            type="number"
            id="salary"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.salary && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.salary.message}
            </span>
          )}
        </div>

        {/* Select */}
        <div>
          <label htmlFor="selectOption" className="block font-medium mb-1">
            Hình thức làm việc
          </label>
          <select
          {
              ...register("employmentType",{
                required:"Không được để trống"
              })
            }
            id="employmentType"
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Mô tả
          </label>
          <input
          {...register("description", {
              required: "Không được để trống"
            })}
            type="text"
            id="description"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.description && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Cập nhập
        </button>
      </form>
    </div>
  );
}

export default EditPage;
