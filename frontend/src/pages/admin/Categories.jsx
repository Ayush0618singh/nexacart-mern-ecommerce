import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
} from "../../services/categoryService";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 5;

    const fetchCategories = async () => {

        try {

            const { data } = await getCategories();

            setCategories(data.categories);

        } catch (error) {

            console.log(error);

            toast.error("Unable To Load Categories");

        }

    };

    const handleAddCategory = async () => {
        if (!name.trim()) {
            return toast.error("Category Name Required");
        }

        try {
            await addCategory({
                name,
                parent: parent || null,
            });

            toast.success(
                parent
                    ? "Subcategory Added Successfully"
                    : "Category Added Successfully"
            );

            setName("");
            setParent("");
            fetchCategories();

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Unable To Add Category"
            );
        }
    };

    const handleUpdateCategory = async () => {

    if (!editName.trim()) {

        return toast.error("Category Name Required");

    }
        try {
            await updateCategory(editId, {
                name: editName,
            });
            toast.success("Category Updated Successfully");
            setEditId(null);
            setEditName("");
            fetchCategories();

        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||
                "Unable To Update Category"
            );
        }

    };

    const handleDeleteCategory = async (id) => {

        try {

            await deleteCategory(id);

            toast.success("Category Deleted Successfully");

            fetchCategories();

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Unable To Delete Category"
            );

        }

    };

    useEffect(() => {

        fetchCategories();

    }, []);

    const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(
        filteredCategories.length / categoriesPerPage
    );

    const indexOfLastCategory = currentPage * categoriesPerPage;

    const indexOfFirstCategory =
        indexOfLastCategory - categoriesPerPage;

    const currentCategories = filteredCategories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
    );

    return (
        <div className="container py-5 admin-categories-page">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">

                    Manage Categories

                </h2>

               <div className="d-flex gap-2">
                    <select
                        className="form-select"
                        value={parent}
                        onChange={(e) => setParent(e.target.value)}
                    >
                        <option value="">
                            Main Category
                        </option>

                        {
                            categories
                            .filter((category) => !category.parent)
                            .map((category) => (
                                <option
                                    key={category._id}
                                    value={category._id}
                                >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Category / Subcategory"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button
                        className="btn btn-success"
                        onClick={handleAddCategory}
                    >
                        Add
                    </button>

                </div>
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>
            
            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Parent</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                currentCategories.map((category, index) => (
                                    <tr key={category._id}>
                                        <td>
                                           {indexOfFirstCategory + index + 1}
                                        </td>

                                        <td>
                                            {category.name}
                                        </td>

                                        <td>
                                            {
                                                category.parent
                                                ? "Subcategory"
                                                : "Main Category"
                                            }
                                        </td>

                                        <td>
                                            {
                                                category.parent?.name || "-"
                                            }
                                        </td>

                                        <td>
                                            <button 
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => {
                                                setEditId(category._id);
                                                setEditName(category.name);
                                            }}
                                            >

                                                Edit

                                            </button>

                                            <button 
                                                className="btn btn-danger btn-sm"
                                                 onClick={() => {
                                                    if (window.confirm("Delete this category?")) {
                                                        handleDeleteCategory(category._id);

                                                    }
                                                }}
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
                </div>
            </div>

            {
            editId && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        background: "rgba(0,0,0,0.5)"
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">

                                    Edit Category

                                </h5>

                                <button
                                    className="btn-close"
                                    onClick={() => setEditId(null)}
                                ></button>
                            </div>

                            <div className="modal-body">

                                <input
                                    type="text"
                                    className="form-control"
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                />

                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setEditId(null)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={handleUpdateCategory}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        </div>
    );
}

export default Categories;