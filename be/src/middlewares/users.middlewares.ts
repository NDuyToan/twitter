import { type Request, type Response, type NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import usersService from '~/services/users.services'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing email or password'
    })
  }
  next()
}

export const registerValidator = checkSchema({
  name: {
    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: 'Name must be between 1 and 100 characters'
    },
    notEmpty: {
      errorMessage: 'Name is required'
    },
    trim: true,
    isString: true,
  },
  email: {
    isEmail: {
      errorMessage: 'Email is not valid'
    },
    notEmpty: {
      errorMessage: 'Email is required'
    },
    trim: true,
    custom: {
      options: async (value) => {
        const isEmailExist = await usersService.checkEmailExist(value)
        if (isEmailExist) {
          throw new Error('Email already exist')
        }
        return true
      },

    }
  },
  password: {
    isLength: {
      options: {
        min: 6,
        max: 50
      },
      errorMessage: 'Password must be between 6 and 50 characters'
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage: 'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    }
  },
  confirm_password: {
    notEmpty: {
      errorMessage: 'Confirm password is required'
    },
    custom: {
      options: (value, { req }) => {
        return value === req.body.password
      },
      errorMessage: 'Confirm password does not match password'
    }
  },
  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true,
      },
      errorMessage: 'Date of birth must be a valid date'
    }
  }
})