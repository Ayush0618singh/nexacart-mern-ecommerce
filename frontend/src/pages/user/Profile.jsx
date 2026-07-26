import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Profile() {

    const { user } = useContext(AuthContext);

    return (

        <div className="container py-5">

            <div className="card shadow-sm">

                <div className="card-body">

                    <h2 className="mb-4">

                        My Profile

                    </h2>

                    <hr />

                    <h5>

                        Name

                    </h5>

                    <p>

                        {user?.name}

                    </p>

                    <h5>

                        Email

                    </h5>

                    <p>

                        {user?.email}

                    </p>

                    <h5>

                        Role

                    </h5>

                    <p className="text-capitalize">

                        {user?.role}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Profile;