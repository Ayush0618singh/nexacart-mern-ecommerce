import React from "react";

function CategorySection({ categories }) {
    return (
        <section className="container my-5">
            <h2 className="mb-4">

                Shop By Categories

            </h2>

            <div className="row">
                {
                    categories.map((category)=>(
                        <div
                            key={category._id}
                            className="col-md-3 mb-3"
                        >
                            <div className="card p-3 text-center">
                                
                                {category.name}

                            </div>
                    
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

export default CategorySection;