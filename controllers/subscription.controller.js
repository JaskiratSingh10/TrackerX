import Subscription from '../schemas/subscription.schema.js'
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    // Trigger the workflow to send a reminder
        const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v0/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    })

    res.status(201).json({ success: true, data: { subscription, workflowRunId } });
  } catch (e) {
    next(e);
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if(req.user.id !== req.params.id) {
      const error = new Error('');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
}

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({}).populate('user', 'username email');
    
    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
}

export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate('user', 'username email');
    
    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
}

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    // Check if the user owns this subscription
    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized - You can only update your own subscriptions');
      error.status = 403;
      throw error;
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'username email');

    res.status(200).json({ success: true, data: updatedSubscription });
  } catch (e) {
    next(e);
  }
}

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    // Check if the user owns this subscription
    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized - You can only delete your own subscriptions');
      error.status = 403;
      throw error;
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
  } catch (e) {
    next(e);
  }
}

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    // Check if the user owns this subscription
    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized - You can only cancel your own subscriptions');
      error.status = 403;
      throw error;
    }

    const cancelledSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'cancelled',
        cancelledAt: new Date()
      },
      { new: true, runValidators: true }
    ).populate('user', 'username email');

    res.status(200).json({ success: true, data: cancelledSubscription });
  } catch (e) {
    next(e);
  }
}