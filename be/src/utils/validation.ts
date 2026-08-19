import { type Request, type Response, type NextFunction } from 'express';
import { validationResult, type ContextRunner } from 'express-validator';

// can be reused by many routes
export const validate = (validations: ContextRunner[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {


        for (const validation of validations) {
            await validation.run(req)

        }
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            })
        }

        next();
    };
};

