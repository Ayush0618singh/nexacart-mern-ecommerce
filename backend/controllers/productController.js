const Product = require("../models/Product");

//Add Product
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            brand,
            stock,
            isFeatured,

        } = req.body;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                success: false,
                message: " Please fill all required fields"
            });
        }

        //Image Path
        //req.file -> Multer gives uploads file
        let image = "";

        if (req.file) {
            console.log(req.file);
            image = req.file.path;
        }

        //Create Product
        const product = await Product.create({
            name,
            description,
            price,
            category,
            brand,
            stock,
            image,
            isFeatured,
        });

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product,
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

//Get All Product
const getProducts = async ( req, res) => {
    try {
        const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,       //$regex = Search matching text
                $options: "i",          // Case Insensitive (Samsung = samsung = SAMSUNG)
            },
        }
        : {};     // If no Keyword, return all products

        //Category Filter
        const category = req.query.category
            ? {
                category: req.query.category,  
            }
            : {};

            //Price Filter

            const priceFilter =
            req.query.minPrice || req.query.maxPrice
            ? {
                    price: {
                        ...(req.query.minPrice && {
                            $gte: Number(req.query.minPrice),

                    }),

                        ...(req.query.maxPrice && {
                            $lte: Number(req.query.maxPrice),
                        }),
                        },
                    }
                    : {};
                    const sortOption = req.query.sort
                    ? req.query.sort
                    : "-createdAt";   //Default Latest product First

                    //Pagination
                    //Current Page
                    // Example:  /api/products?page=2
                    const page = Number(req.query.page) || 1;

                    //Number of Products Per Page
                    //Example: /api/products?limit=5
                    const limit = Number(req.query.limit) || 5;

                    //Skip Products
                    //Formula: (Current Page - 1) * limit
                    const skip = (page -1) * limit;

                    //Total Products Count
                    const totalProducts = await Product.countDocuments({
                        ...keyword,
                        ...category,
                        ...priceFilter,
                    });

        //Fetch Products using Search + Category + Price Filter + Sorting
        const products = await Product.find({

            ...keyword,
            ...category,
            ...priceFilter,
        })
        .populate("category")
        .sort(sortOption)
        .skip(skip)          //Skip Previous Page Products
        .limit(limit);       //Number of Products Per Page

        res.status(200).json({
            success: true,
            page,
            limit,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            count: products.length,
            products,
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get Single Product
const getSingleProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id).populate("category");

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

//Delete Product
const deleteProduct = async ( req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json ({
                success: false,
                message: "Product Not Found",
                
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: " Product Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Update product(Admin)
const updateProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }
        //Update product
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate("category");

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product: updatedProduct,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get Featured products
const getFeaturedProducts = async (req, res) => {
    try{

        //Fetch Only Featured Products
        const products = await Product.find({
            isFeatured: true,

        })
        .populate("category") //show category Details
        .sort("-createdAt");  //latest featured Products First

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message: error.message,
        });
    }
};

//Get Latest Products
const getLatestProducts = async (req, res) => {
    try{ 
        const products= await Product.find()
        .populate("category")
        .sort("-createdAt")
        .limit(8);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });

    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//get Top Rated Products
const getTopRatedProducts = async (req, res) => {
    try{
        const products = await Product.find()
        .populate("category")
        .sort("-rating")
        .limit(8);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch(error) {
        
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get related Products
const getRelatedProducts = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not  Found",
            });
        }

        //Same Category products
        const relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id },   //$ne = Not Equal
        })
        .populate("category")
        .limit(4);

        res.status(200).json({
            success: true,
            count: relatedProducts.length,
            products: relatedProducts,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    getFeaturedProducts,
    getLatestProducts,
    getTopRatedProducts,
    getRelatedProducts,
};

