import { ProductRegSchema } from "./productValidator";
import { UserRegSchema , UserLoginSchema} from "./userValidator"
import Express, {Request, Response, NextFunction} from "express"


const VerifyUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {error} = UserRegSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    next();

}


const VerifyLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {error} = UserLoginSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();

}


const VerifyProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {error} = ProductRegSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    next();

}

export {VerifyUser,  VerifyProduct, VerifyLogin};
