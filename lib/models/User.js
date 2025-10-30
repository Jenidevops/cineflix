import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    resetCode: {
      type: String,
      select: false,
    },
    resetCodeExpiry: {
      type: Date,
      select: false,
    },
    subscription: {
      planId: {
        type: Number,
        default: null,
      },
      planName: {
        type: String,
        default: null,
      },
      status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: null,
      },
      startDate: {
        type: Date,
        default: null,
      },
      paymentMethod: {
        type: String,
        default: null,
      },
      transactionId: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
)

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Method to compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.models.User || mongoose.model('User', UserSchema)
