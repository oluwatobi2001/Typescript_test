import Express, {Router} from 'express'

import { ProductController } from '../controllers';

import { VerifyProduct } from '../validators';
import { AuthenticaticateUser } from '../middlewares/authMiddleware';
import { CheckAdmin } from '../middlewares/permissionMiddleware';
const router =  Router();

router.route('/create-product').post( AuthenticaticateUser, VerifyProduct, CheckAdmin, ProductController.CreateProduct)
router.route('/get-products').get( AuthenticaticateUser, ProductController.GetAllProducts)
router.route('/get-products/:productId').get( AuthenticaticateUser,  ProductController.GetSingleProduct)
router.route('/delete-product/:productId' ).delete( AuthenticaticateUser, CheckAdmin,  ProductController.deleteProduct);


router.route('/update-product/:productId').put(VerifyProduct, CheckAdmin, ProductController.UpdateProduct)

export const ProductRouters =  router;