import Express , {Request, Response, NextFunction} from 'express';
import Products from '../models/products.model';


const CreateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {productId, title, description, quantity} = req.body;
        if(!productId || !title || !description ) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }
        const Product =  new Products({
            productId, title, description, quantity

        })

  const savedProduct =  await Product.save();
  res.status(200).json({ message: 'product created successfully. OTP sent for verification.',savedProduct});
} catch (error) {
  next(error);
}

};

const GetAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const allProducts  =  await Products.find();
        if (allProducts == null) {
            res.status(400).json("No product entry available")

        }
        res.status(200).json(allProducts)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return ;
    }

}
const GetSingleProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const productId =  req?.params?.productId;
        const productDetails =  await Products.find({productId });
        if(!productDetails) {
            res.status(400).json({
                err: "Product details aren't available"

            })
        }
        res.status(200).json(productDetails);


    }
     catch(err) {
        console.log(err);
        res.status(500).json(err);
        return ;

    }

}
const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const productId  : String =  req?.params?.productId;
        const productDetails: Object =  await Products.find({_id: productId });
        if(!productDetails) {
            res.status(400).json({
                err: "Product details aren't available"

            })
        }
        await Products.deleteOne({productId});

        res.status(200).json({msg: "Product successfully deleted"});

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return ;

    }

}


const UpdateProduct  = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const productInfo : String = req.params.productId;
        const {title, description, quantity, productId} = req.body;

        if(!productId) {
            res.status(400).json(" incorrect product information")
        }
        const updateProduct = await Products.findByIdAndUpdate({_id: productInfo}, {
            title, description, quantity, productId
        }, {new: true})
        if(!updateProduct) {
            res.status(400).json("unable to update product info. Please try again later")
        }

        res.status(200).json("product successfully updated");

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
        return ;
    }
}
export default {CreateProduct, GetAllProducts, GetSingleProduct, deleteProduct, UpdateProduct
}