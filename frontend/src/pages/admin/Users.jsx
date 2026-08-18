import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getAdminUsers,
    deleteUser,
} from "../../services/adminService";

function Users() {
    const [users, setUsers] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const fetchUsers = async () => {
        try {
            const { data } = await getAdminUsers();
            setUsers(data.users);

        } catch (error) {

            console.log(error);
            toast.error("Unable To Load Users");

        }
    };

    const handleDelete = async () => {
        try {

            await deleteUser(deleteId);
            toast.success("User Deleted Successfully");
            setDeleteId(null);
            fetchUsers();

        } catch (error) {

            console.log(error);
            toast.error(
                error.response?.data?.message || "Unable To Delete User"
            );

        }

    };


    useEffect(() => {

        fetchUsers();

    }, []);

    const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const indexOfLastUser = currentPage * usersPerPage;

    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const currentUsers = filteredUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    return (
        <div className="container py-5 admin-users-page">
            <h2 className="fw-bold mb-4">

                Manage Users

            </h2>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search User by Name or Email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                      <tbody>
                            {
                                currentUsers.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{indexOfFirstUser + index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === "admin"
                                                ? <span className="badge bg-danger">Admin</span>
                                                : <span className="badge bg-success">User</span>
                                            }
                                        </td>

                                        <td>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => setDeleteId(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-center mt-4">
                        <button
                            className="btn btn-outline-primary me-2"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>

                        <span className="align-self-center fw-bold">

                            Page {currentPage} of {totalPages}

                        </span>

                        <button
                            className="btn btn-outline-primary ms-2"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>

                    </div>

                   {
                        deleteId && (
                            <div
                                className="modal fade show"
                                style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
                            >
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">
                                                
                                                Delete User

                                            </h5>

                                            <button
                                                className="btn-close"
                                                onClick={() => setDeleteId(null)}
                                            ></button>

                                        </div>
                                        <div className="modal-body">
                                            <p>

                                                Are you sure you want to delete this user?

                                            </p>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => setDeleteId(null)}
                                            >

                                                Cancel

                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                onClick={handleDelete}
                                            >

                                                Delete

                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Users;