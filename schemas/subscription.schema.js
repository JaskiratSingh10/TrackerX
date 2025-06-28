import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: [true, 'Subscription price is required'],
    min: [0, 'Price must be greater than 0']
  },
  currency: {
    type: String,
    enum: ['USD', 'INR'],
    default: 'INR'
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
  },
  category: {
    type: String,
    enum: ['entertainment', 'utilities', 'food', 'health', 'education','sports', 'other'],
    default: 'other'
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value <= new Date(),
      message: 'Start date must be before or equal to today',
    }
  },
  renewalDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: 'Renewal date must be after the start date',
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  //Creates a reference to the 'User' model in our database(user.schema.js)
    required: true,
    index: true, //Creates a database index i.e "find all subscriptions for user X"
  }
}, { timestamps: true });


// additional useful pre-save hooks

subscriptionSchema.pre('save', function (next) {
  // Auto-calculate renewal date if missing.
  if(!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next();
});

// Add virtual for monthly cost (normalize all frequencies to monthly)
subscriptionSchema.virtual('monthlyCost').get(function() {
  if (!this.price) return 0;
  
  const monthlyMultiplier = {
    daily: 30,
    weekly: 4.33,
    monthly: 1,
    yearly: 1/12,
  };
  
  return this.price * (monthlyMultiplier[this.frequency] || 1);
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;