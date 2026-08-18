import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import { toast } from "react-toastify";

import {
    FaTicketAlt,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaPowerOff,
} from "react-icons/fa";

import {
    getAdminCoupons,
    createAdminCoupon,
    updateAdminCoupon,
    deleteAdminCoupon,
} from "../../services/couponService";

import "../../styles/admin.css";


function Coupons() {

    const [coupons, setCoupons] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [editingId, setEditingId] =
        useState(null);

    const [showForm, setShowForm] =
        useState(false);

    const emptyForm = {
        code: "",
        discountType: "percentage",
        discountValue: "",
        minOrderAmount: "",
        expiresAt: "",
        usageLimit: "",
    };

    const [form, setForm] =
        useState(emptyForm);


    // =====================================================
    // FETCH
    // =====================================================

    const fetchCoupons = async () => {

        try {

            setLoading(true);

            const { data } =
                await getAdminCoupons();

            setCoupons(
                data.coupons || []
            );

        } catch (error) {

            console.error(
                "Coupon fetch error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to load coupons"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        fetchCoupons();
    }, []);


    // =====================================================
    // FORM
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "code"
                    ? value.toUpperCase()
                    : value,
        }));

    };


    const resetForm = () => {

        setForm(
            emptyForm
        );

        setEditingId(null);
        setShowForm(false);

    };


    // =====================================================
    // CREATE / UPDATE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (saving) {
            return;
        }

        try {

            setSaving(true);

            const payload = {
                code:
                    form.code.trim(),
                discountType:
                    form.discountType,
                discountValue:
                    Number(
                        form.discountValue
                    ),
                minOrderAmount:
                    Number(
                        form.minOrderAmount || 0
                    ),
                expiresAt:
                    form.expiresAt,
                usageLimit:
                    Number(
                        form.usageLimit || 0
                    ),
            };


            if (editingId) {

                const { data } =
                    await updateAdminCoupon(
                        editingId,
                        payload
                    );

                toast.success(
                    data.message
                );

            } else {

                const { data } =
                    await createAdminCoupon(
                        payload
                    );

                toast.success(
                    data.message
                );

            }

            resetForm();

            await fetchCoupons();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to save coupon"
            );

        } finally {

            setSaving(false);

        }
    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (coupon) => {

        const expiry =
            coupon.expiresAt
                ? new Date(
                    coupon.expiresAt
                )
                    .toISOString()
                    .split("T")[0]
                : "";

        setForm({
            code:
                coupon.code || "",
            discountType:
                coupon.discountType ||
                "percentage",
            discountValue:
                coupon.discountValue || "",
            minOrderAmount:
                coupon.minOrderAmount || "",
            expiresAt:
                expiry,
            usageLimit:
                coupon.usageLimit || "",
        });

        setEditingId(
            coupon._id
        );

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (
        id
    ) => {

        const confirmed =
            window.confirm(
                "Delete this coupon?"
            );

        if (!confirmed) {
            return;
        }

        try {

            const { data } =
                await deleteAdminCoupon(
                    id
                );

            toast.success(
                data.message
            );

            await fetchCoupons();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to delete coupon"
            );

        }

    };


    // =====================================================
    // ACTIVE / INACTIVE
    // =====================================================

    const handleToggle = async (
        coupon
    ) => {

        try {

            const { data } =
                await updateAdminCoupon(
                    coupon._id,
                    {
                        isActive:
                            !coupon.isActive,
                    }
                );

            toast.success(
                data.message
            );

            await fetchCoupons();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to update coupon"
            );

        }

    };


    // =====================================================
    // FILTER
    // =====================================================

    const filteredCoupons =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();

            if (!query) {
                return coupons;
            }

            return coupons.filter(
                (coupon) =>
                    coupon.code
                        ?.toLowerCase()
                        .includes(query)
            );

        }, [coupons, search]);


    // =====================================================
    // SUMMARY
    // =====================================================

    const activeCount =
        coupons.filter(
            (coupon) =>
                coupon.isActive &&
                new Date(
                    coupon.expiresAt
                ) > new Date()
        ).length;

    const expiredCount =
        coupons.filter(
            (coupon) =>
                new Date(
                    coupon.expiresAt
                ) <= new Date()
        ).length;


    return (
        <div className="admin-coupons-page">

            <div className="admin-coupons-shell">


                {/* HEADER */}

                <div className="admin-coupons-header">

                    <div>

                        <span className="admin-section-eyebrow">
                            PROMOTIONS
                        </span>

                        <h1>Coupons</h1>

                        <p>
                            Manage promotional offers
                            across your NexaCart store.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="admin-primary-action"
                        onClick={() => {
                            if (showForm) {
                                resetForm();
                            } else {
                                setShowForm(true);
                            }
                        }}
                    >
                        <FaPlus />

                        {showForm
                            ? "Close Form"
                            : "Create Coupon"
                        }
                    </button>

                </div>


                {/* SUMMARY */}

                <div className="admin-coupon-summary">

                    <div className="admin-coupon-summary-card">
                        <span>Active Coupons</span>
                        <strong>
                            {activeCount}
                        </strong>
                    </div>

                    <div className="admin-coupon-summary-card">
                        <span>Total Coupons</span>
                        <strong>
                            {coupons.length}
                        </strong>
                    </div>

                    <div className="admin-coupon-summary-card">
                        <span>Expired</span>
                        <strong>
                            {expiredCount}
                        </strong>
                    </div>

                </div>


                {/* FORM */}

                {showForm && (

                    <section className="admin-coupon-form-card">

                        <div className="admin-coupon-form-header">

                            <div>
                                <span>
                                    {editingId
                                        ? "EDIT PROMOTION"
                                        : "NEW PROMOTION"
                                    }
                                </span>

                                <h2>
                                    {editingId
                                        ? "Update Coupon"
                                        : "Create Coupon"
                                    }
                                </h2>
                            </div>

                            <FaTicketAlt />

                        </div>


                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="admin-coupon-form-grid">

                                <div>
                                    <label>
                                        Coupon Code
                                    </label>

                                    <input
                                        type="text"
                                        name="code"
                                        value={
                                            form.code
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="WELCOME10"
                                        required
                                        disabled={
                                            Boolean(
                                                editingId
                                            )
                                        }
                                    />
                                </div>


                                <div>
                                    <label>
                                        Discount Type
                                    </label>

                                    <select
                                        name="discountType"
                                        value={
                                            form.discountType
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >
                                        <option value="percentage">
                                            Percentage
                                        </option>

                                        <option value="fixed">
                                            Fixed Amount
                                        </option>
                                    </select>
                                </div>


                                <div>
                                    <label>
                                        Discount Value
                                    </label>

                                    <input
                                        type="number"
                                        name="discountValue"
                                        value={
                                            form.discountValue
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        min="1"
                                        required
                                    />
                                </div>


                                <div>
                                    <label>
                                        Minimum Order
                                    </label>

                                    <input
                                        type="number"
                                        name="minOrderAmount"
                                        value={
                                            form.minOrderAmount
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>


                                <div>
                                    <label>
                                        Expiry Date
                                    </label>

                                    <input
                                        type="date"
                                        name="expiresAt"
                                        value={
                                            form.expiresAt
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </div>


                                <div>
                                    <label>
                                        Usage Limit
                                    </label>

                                    <input
                                        type="number"
                                        name="usageLimit"
                                        value={
                                            form.usageLimit
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        min="0"
                                        placeholder="0 = unlimited"
                                    />
                                </div>

                            </div>


                            <div className="admin-coupon-form-actions">

                                <button
                                    type="button"
                                    className="admin-secondary-action"
                                    onClick={
                                        resetForm
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="admin-primary-action"
                                    disabled={
                                        saving
                                    }
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId
                                        ? "Update Coupon"
                                        : "Save Coupon"
                                    }
                                </button>

                            </div>

                        </form>

                    </section>
                )}


                {/* LIST */}

                <section className="admin-coupon-list-card">

                    <div className="admin-coupon-list-header">

                        <div>
                            <h2>
                                Coupon List
                            </h2>

                            <p>
                                All promotional codes
                                created in your store.
                            </p>
                        </div>


                        <div className="admin-coupon-search">

                            <FaSearch />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search coupon..."
                            />

                        </div>

                    </div>


                    {loading ? (

                        <div className="admin-coupon-loading">
                            Loading coupons...
                        </div>

                    ) : filteredCoupons.length === 0 ? (

                        <div className="admin-coupon-empty">

                            <div className="admin-coupon-empty-icon">
                                <FaTicketAlt />
                            </div>

                            <h3>
                                No coupons found
                            </h3>

                            <p>
                                Create your first coupon
                                and start running promotions.
                            </p>

                            <button
                                type="button"
                                className="admin-primary-action"
                                onClick={() =>
                                    setShowForm(true)
                                }
                            >
                                <FaPlus />
                                Create Coupon
                            </button>

                        </div>

                    ) : (

                        <div className="admin-coupon-table-wrapper">

                            <table className="admin-coupon-table">

                                <thead>

                                    <tr>
                                        <th>Code</th>
                                        <th>Discount</th>
                                        <th>Min Order</th>
                                        <th>Expires</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredCoupons.map(
                                        (coupon) => {

                                            const expired =
                                                new Date(
                                                    coupon.expiresAt
                                                ) <= new Date();

                                            return (
                                                <tr
                                                    key={
                                                        coupon._id
                                                    }
                                                >

                                                    <td>
                                                        <span className="coupon-code">
                                                            {
                                                                coupon.code
                                                            }
                                                        </span>
                                                    </td>


                                                    <td>
                                                        <strong>
                                                            {
                                                                coupon.discountValue
                                                            }
                                                            {
                                                                coupon.discountType ===
                                                                "percentage"
                                                                    ? "%"
                                                                    : " ₹"
                                                            }
                                                        </strong>
                                                    </td>


                                                    <td>
                                                        ₹
                                                        {Number(
                                                            coupon.minOrderAmount ||
                                                            0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </td>


                                                    <td>
                                                        {new Date(
                                                            coupon.expiresAt
                                                        ).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </td>


                                                    <td>

                                                        <span
                                                            className={`coupon-status ${
                                                                coupon.isActive &&
                                                                !expired
                                                                    ? "active"
                                                                    : "inactive"
                                                            }`}
                                                        >
                                                            {coupon.isActive &&
                                                            !expired
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </span>

                                                    </td>


                                                    <td>

                                                        <div className="coupon-action-buttons">

                                                            <button
                                                                type="button"
                                                                title="Edit"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        coupon
                                                                    )
                                                                }
                                                            >
                                                                <FaEdit />
                                                            </button>


                                                            <button
                                                                type="button"
                                                                title={
                                                                    coupon.isActive
                                                                        ? "Disable"
                                                                        : "Enable"
                                                                }
                                                                onClick={() =>
                                                                    handleToggle(
                                                                        coupon
                                                                    )
                                                                }
                                                            >
                                                                <FaPowerOff />
                                                            </button>


                                                            <button
                                                                type="button"
                                                                title="Delete"
                                                                className="danger"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        coupon._id
                                                                    )
                                                                }
                                                            >
                                                                <FaTrash />
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

            </div>

        </div>
    );
}

export default Coupons;