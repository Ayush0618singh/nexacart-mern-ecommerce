import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getAllReviews,
    deleteReview,
} from "../../services/reviewService";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const fetchReviews = async () => {
        try {
            const { data } = await getAllReviews();
            console.log(data);
            setReviews(data.reviews);

        } catch (error) {

            console.log(error);
            toast.error("Unable To Load Reviews");

        }

    };

    const handleDelete = async (id) => {
        try {
            const { data } = await deleteReview(id);
            toast.success(data.message);
            fetchReviews();
            setDeleteId(null);

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Unable To Delete Review"
            );
        }
    };

    useEffect(() => {

        fetchReviews();

    }, []);

    return (

        <div className="container py-5 admin-reviews-page">
            <h2 className="fw-bold mb-4">

                Manage Reviews

            </h2>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Product</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    
                    {
                        reviews.map((review, index) => (

                            <tr key={review._id}>

                                <td>{index + 1}</td>

                                <td>{review.user?.name}</td>

                                <td>{review.product?.name}</td>

                                <td>⭐ {review.rating}</td>

                                <td>{review.comment}</td>

                                <td>

                                    {new Date(review.createdAt)
                                        .toLocaleDateString("en-GB")}

                                </td>

                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => setDeleteId(review._id)}
                                    >

                                        Delete

                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                deleteId && (
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

                                        Delete Review

                                    </h5>

                                    <button
                                        className="btn-close"
                                        onClick={() => setDeleteId(null)}
                                    ></button>

                                </div>

                                <div className="modal-body">
                                    <p>

                                        Are you sure you want to delete this review?

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
                                        onClick={() => handleDelete(deleteId)}
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
    );
}

export default Reviews;