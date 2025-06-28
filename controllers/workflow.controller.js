import dayjs from 'dayjs' // dayjs for date manipulation
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express"); //upstash workflow was written in CommonJS
import Subscription from '../schemas/subscription.schema.js';
import { sendReminderEmail } from '../utils/send-email.js'

const DAYS = [8, 4, 2, 1]

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);
  if(!subscription || subscription.status !== 'active') return;
  const renewalDate = dayjs(subscription.renewalDate);
  if(renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}. workflow ended.`);
    return;
  }
  
  // checks passed, now we can send reminders
  for (const daysBefore of DAYS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');

    //sleep until we reach the reminder date 
    if(reminderDate.isAfter(dayjs())) {
      await sleep(context, `Reminder ${daysBefore} days before`, reminderDate);
    }

    if (dayjs().isSame(reminderDate, 'day')) {
      console.log(`📧 Sending reminder for ${daysBefore} days before`);
      await sendReminder(context, `${daysBefore} days before reminder`, subscription);
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {

  return await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email');
  })
}

const sleep = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
  
}

const sendReminder = async (context, label, subscription) => {
  console.log(`Triggering ${label} reminder`);
  return await context.run(label, async () => {
    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    })
  })
}