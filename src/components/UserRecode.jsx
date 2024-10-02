import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserRecode() {

    let [users, setUsers] = useState([]);
    let navigator = useNavigate();
    
    useEffect(() => {
        fetchRecode();
    }, []);

    let fetchRecode = () => {
        fetch('http://localhost:3000/user', {
            method: 'get'
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setUsers(data);
        }).catch((error) => {
            console.error(error);
        });
    };

    let deleteData = (id) => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: "DELETE"
        }).then(() => {
            fetchRecode();
        }).catch((err) => {
            console.log(err);
        });
    };

    let editData = (id) => {
        navigator(`/edit/${id}`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100 ">
            <div className="w-3/4 mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Records</h2>
                    <Link to="/" className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                        Add Record
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm text-left text-gray-500 bg-white shadow-md rounded-lg">
                        <thead className="bg-blue-600 text-white text-lg uppercase">
                            <tr>
                                <th className="font-normal ps-4 py-2">Username</th>
                                <th className="font-normal px-4 py-2">Email</th>
                                <th className="font-normal px-4 py-2">Password</th>
                                <th className="font-normal px-4 py-2">Gender</th>
                                <th className="font-normal px-4 py-2">Hobby</th>
                                <th className="font-normal px-4 py-2">City</th>
                                <th className="font-normal px-4 py-2">Address</th>
                                <th className="font-normal ps-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-3">{user.username}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.password}</td>
                                    <td className="px-4 py-3">{user.gender}</td>
                                    <td className="px-4 py-3">{user.hobby ? user.hobby.toString() : ''}</td>
                                    <td className="px-4 py-3">{user.city}</td>
                                    <td className="px-4 py-3">{user.address}</td>
                                    <td className="px-4 py-3 flex space-x-2">
                                        <button
                                            onClick={() => deleteData(user.id)}
                                            className="text-white bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => editData(user.id)}
                                            className="text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserRecode;
