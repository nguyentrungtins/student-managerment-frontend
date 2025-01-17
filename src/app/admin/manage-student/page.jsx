"use client";

import { useEffect, useRef, useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFileAdd,
} from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import Toastify, { success, error } from "@/components/toastify";

const ManageStudent = () => {
  // hide/show form add student
  const [isForm, setIsForm] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [student, setStudent] = useState({
    id_student: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    email: "",
    major: "",
    birth_date: "",
  });
  const initialStudentUpdateData = {
    id_student: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    email: "",
    major: "",
    birth_date: "",
    pass_word: "",
    _id: "",
  };
  const [studentUpdate, setStudentUpdate] = useState(initialStudentUpdateData);
  console.log("student update: ", studentUpdate);
  const [image, setImage] = useState(null);

  // button add student
  const handleAddUser = (e) => {
    // console.log(image);

    const formStudent = new FormData();
    formStudent.append("image", image);
    formStudent.append("id_student", student.id_student);
    formStudent.append("first_name", student.first_name);
    formStudent.append("last_name", student.last_name);
    formStudent.append("address", student.address);
    formStudent.append("phone", student.phone);
    formStudent.append("email", student.email);
    formStudent.append("birth_day", student.birth_date);
    formStudent.append("major", student.major);

    console.log(formStudent);

    // axios.post("http://localhost:3030/user/add", formStudent).then((res) => {
    //   console.log(res.data);
    // });

    const url = "http://localhost:3030/user/add";
    axios
      .post(url, formStudent, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        success("Thêm sinh viên thành công");

        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        error("Thêm sinh viên thất bại");
      });

    e.preventDefault();
  };

  // const FileUploader = ({ onFileSelect }) => {
  //   const fileInput = useRef(null);
  //   const handleFileInput = (e) => {
  //     onFileSelect(e.target.files[0]);
  //   };
  // };
  const handleUpdateUser = (e) => {
    // console.log(image);
    e.preventDefault();

    const formStudent = new FormData();
    formStudent.append("image", image ? image : studentUpdate.img);
    formStudent.append("id_student", studentUpdate.id_student);
    formStudent.append("first_name", studentUpdate.first_name);
    formStudent.append("last_name", studentUpdate.last_name);
    formStudent.append("address", studentUpdate.address);
    formStudent.append("phone", studentUpdate.phone);
    formStudent.append("email", studentUpdate.email);
    formStudent.append("birth_day", studentUpdate.birth_date);
    formStudent.append("major", studentUpdate.major);
    // formStudent.append("pass_word", studentUpdate.pass_word);
    formStudent.append("id", studentUpdate._id);

    console.log(formStudent);

    const url = "http://localhost:3030/user/update";
    axios
      .patch(url, formStudent, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        success("Chỉnh sửa thông tin sinh viên thành công");
        setIsUpdateForm(false);
        setStudentUpdate(initialStudentUpdateData);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        error("Chỉnh sửa thông tin sinh viên thất bại");
      });
  };

  const handleDeleteStudent = (e) => {
    const id = e;
    const url = `http://localhost:3030/user/delete/${id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        success("Xóa sinh viên thành công");
        setIsUpdateForm(false);
        setStudentUpdate(initialStudentUpdateData);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        error("Xóa sinh viên thất bại");
      });
  };

  useEffect(() => {
    const url = "http://localhost:3030/user/all";
    if (sessionStorage.getItem("access_token")) {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return redirect("/auth/login");
    }
  }, []);

  return (
    <div className="p-4 sm:ml-64 flex flex-row">
      <Toastify />
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-xl text-gray-900 font-semibold underline">
            {" "}
            Manage student
          </h1>

          <div className="flex justify-end items-center mt-4 gap-x-3">
            <button
              onClick={() => setIsForm((state) => !state)}
              className="px-4 py-2 mr-5 rounded-md bg-primary text-sky-100 hover:bg-sky-600"
            >
              Add student
            </button>
            <div className="relative flex items-center mt-4 md:mt-0">
              <span className="absolute pl-3">
                <BsSearch />
              </span>

              <input
                type="text"
                value=""
                placeholder="Search"
                className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>
          <div
            className={
              isForm
                ? "mt-12 transition-all duration-1000 border-2 rounded-tl-2xl rounded-br-2xl border-gray-700 p-6"
                : "mt-12 hidden"
            }
          >
            <form onSubmit="">
              <h3>Thông tin chi tiết</h3>
              <div className="flex">
                <div className="w-1/3 px-4 mt-8">
                  <div className="flex mt-3 items-center mb-8 ">
                    <h3 className="w-2/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      ID
                    </h3>
                    <input
                      required
                      readOnly=""
                      value={student.id_student}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          id_student: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center mb-8">
                    <h3 className="w-2/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      First name
                    </h3>
                    <input
                      required
                      readOnly=""
                      value={student.first_name}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          first_name: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="flex mt-3 items-center mb-8">
                    <h3 className="w-2/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Last name
                    </h3>
                    <input
                      required
                      readOnly=""
                      value={student.last_name}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          last_name: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center">
                    <h3 className="w-3/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Address
                    </h3>
                    <input
                      required
                      value={student.address}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          address: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="w-1/3 px-4 mt-8">
                  <div className="flex mt-3 items-center mb-8 ">
                    <h3 className="w-3/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Phone
                    </h3>
                    <input
                      type="text"
                      value={student.phone}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          phone: e.target.value,
                        }))
                      }
                      required
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-30 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center">
                    <h3 className="w-3/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Email
                    </h3>
                    <input
                      type="text"
                      value={student.email}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          email: e.target.value,
                        }))
                      }
                      required
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="w-1/3 px-4 mt-8">
                  <div className="flex mt-3 items-center mb-8 ">
                    <h3 className="w-1/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Birthday
                    </h3>
                    <input
                      type="text"
                      value={student.birth_date}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          birth_date: e.target.value,
                        }))
                      }
                      required
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-90 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center">
                    <h3 className="w-1/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Major
                    </h3>
                    <input
                      type="text"
                      value={student.major}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          major: e.target.value,
                        }))
                      }
                      required
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-90 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center">
                    <h3 className="w-1/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Avatar
                    </h3>
                    <input
                      type="file"
                      // value={image}
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-90 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
              </div>

              <div className="flex mt-12 justify-end w-full">
                <button
                  type="button"
                  onClick=""
                  className="mx-8 peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                >
                  <GrUpdate className="w-4 h-4" />
                  <span>Update</span>
                </button>
                <button
                  type="submit"
                  onClick={handleAddUser}
                  className={
                    "mx-8 peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                  }
                >
                  <AiOutlineFileAdd className="w-5 h-5" />
                  <span>Add</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsForm(false)}
                  className="mx-8 flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-400 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-red-500 dark:bg-red-600"
                >
                  <MdCancel className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
          <div
            className={
              isUpdateForm
                ? "mt-12 transition-all duration-1000 border-2 rounded-tl-2xl rounded-br-2xl border-gray-700 p-6"
                : "mt-12 hidden"
            }
          >
            <form onSubmit="">
              <h3>Thông tin chi tiết</h3>
              <div className="flex">
                <div className="w-1/3 px-4 mt-8">
                  <div className="flex mt-3 items-center mb-8 ">
                    <h3 className="w-2/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      ID
                    </h3>
                    <input
                      required
                      readOnly=""
                      value={studentUpdate.id_student}
                      onChange={(e) =>
                        setStudentUpdate((state) => ({
                          ...state,
                          id_student: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center mb-8">
                    <h3 className="w-2/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      First name
                    </h3>
                    <input
                      required
                      readOnly=""
                      value={studentUpdate.first_name}
                      onChange={(e) =>
                        setStudentUpdate((state) => ({
                          ...state,
                          first_name: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="flex mt-3 items-center mb-8">
                    <h3 className="w-2/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Last name
                    </h3>
                    <input
                      required
                      readOnly=""
                      value={studentUpdate.last_name}
                      onChange={(e) =>
                        setStudentUpdate((state) => ({
                          ...state,
                          last_name: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center">
                    <h3 className="w-3/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Address
                    </h3>
                    <input
                      required
                      value={studentUpdate.address}
                      onChange={(e) =>
                        setStudentUpdate((state) => ({
                          ...state,
                          address: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="w-1/3 px-4 mt-8">
                  <div className="flex mt-3 items-center mb-8 ">
                    <h3 className="w-3/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Phone
                    </h3>
                    <input
                      type="text"
                      value={studentUpdate.phone}
                      onChange={(e) =>
                        setStudentUpdate((state) => ({
                          ...state,
                          phone: e.target.value,
                        }))
                      }
                      required
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-30 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center">
                    <h3 className="w-3/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Email
                    </h3>
                    <input
                      type="text"
                      value={studentUpdate.email}
                      onChange={(e) =>
                        setStudentUpdate((state) => ({
                          ...state,
                          email: e.target.value,
                        }))
                      }
                      required
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="w-1/3 px-4 mt-8">
                  <div className="flex mt-3 items-center mb-8 ">
                    <h3 className="w-1/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Birthday
                    </h3>
                    <input
                      type="text"
                      value={studentUpdate.birth_date}
                      onChange={(e) =>
                        setStudentUpdate((state) => ({
                          ...state,
                          birth_date: e.target.value,
                        }))
                      }
                      required
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-90 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center">
                    <h3 className="w-1/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Major
                    </h3>
                    <input
                      type="text"
                      value={studentUpdate.major}
                      onChange={(e) =>
                        setStudentUpdate((state) => ({
                          ...state,
                          major: e.target.value,
                        }))
                      }
                      required
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-90 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="flex mt-3 items-center">
                    <h3 className="w-1/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Avatar
                    </h3>
                    <input
                      type="file"
                      // value={image}
                      onChange={(e) => setImage(e.target.files[0])}
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-90 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
              </div>

              <div className="flex mt-12 justify-end w-full">
                <button
                  type="submit"
                  onClick={handleUpdateUser}
                  className={
                    "mx-8 peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                  }
                >
                  <AiOutlineFileAdd className="w-5 h-5" />
                  <span>Enter</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsUpdateForm(false)}
                  className="mx-8 flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-400 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-red-500 dark:bg-red-600"
                >
                  <MdCancel className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        ID
                      </th>

                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        First Name
                      </th>

                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Last Name
                      </th>

                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Address
                      </th>

                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Phone
                      </th>

                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Email
                      </th>

                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Birthday
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Major
                      </th>

                      {/* <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Image
                      </th> */}

                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                        colspan="3"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {data &&
                      data.map((user) => (
                        <tr>
                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                            <p>{user.id_student}</p>
                          </td>

                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                            <p>{user.first_name}</p>
                          </td>
                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                            <p>{user.last_name}</p>
                          </td>
                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                            <p>{user.address}</p>
                          </td>

                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                            <p>{user.phone}</p>
                          </td>

                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                            <p>{user.email}</p>
                          </td>

                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                            <p>{user.birth_date}</p>
                          </td>

                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                            <p>{user.major}</p>
                          </td>
                          <td className="px-6 py-4 text-center text-lg whitespace-no-wrap border-b border-gray-200">
                            <button
                              className="mx-2"
                              onClick={() => {
                                setIsUpdateForm(true);
                                setIsForm(false);
                                setStudentUpdate(user);
                                setImage(null);
                              }}
                            >
                              <AiOutlineEdit />
                            </button>

                            <button
                              className="mx-2"
                              type="button"
                              onClick={() => {
                                setShowModal(true);
                                setDeleteID(user._id);
                              }}
                            >
                              <AiOutlineDelete />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Page{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-100"></span>
                </div>

                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                  <div className="pointer-events-none flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 rtl:-scale-x-100"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                      />
                    </svg>

                    <span>Previous</span>
                  </div>

                  <div className="pointer-events-none flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>Next</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 rtl:-scale-x-100"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Cảnh báo</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Bạn có chắc là muốn xóa sinh viên này không?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleDeleteStudent(deleteID);
                      setShowModal(false);
                    }}
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};
export default ManageStudent;
