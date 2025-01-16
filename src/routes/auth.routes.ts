import { Router } from 'express';

import { authController} from '../controllers';
import { VerifyLogin } from '../validators';


//AUTH ROUTES//
const router: Router = Router();

//USER LOGIN
router.route('/login').post(VerifyLogin,  authController.login);

//USER FORGOT PASSWORD


//EXPORT
export const AuthRouter = router;
