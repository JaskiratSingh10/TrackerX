export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
        <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center; padding: 30px;">
                <h1 style="color: white; font-size: 48px; margin: 0; font-weight: 800; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🔔 TrackerX</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your Subscription Management Assistant</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px; background-color: #ffffff;">                
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #667eea; font-size: 28px; margin: 0 0 10px 0;">⏰ Renewal Reminder</h2>
                    <div style="width: 50px; height: 3px; background: linear-gradient(90deg, #667eea, #764ba2); margin: 0 auto;"></div>
                </div>
                
                <p style="font-size: 18px; margin-bottom: 25px; color: #555;">Hello <strong style="color: #667eea;">${userName}</strong>,</p>
                
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center;">
                    <p style="font-size: 20px; margin: 0; color: white; font-weight: 600; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
                        Your <strong>${subscriptionName}</strong> subscription renews in <strong>${daysLeft} days</strong>
                    </p>
                    <p style="font-size: 16px; margin: 10px 0 0 0; color: rgba(255,255,255,0.9);">
                        Renewal Date: <strong>${renewalDate}</strong>
                    </p>
                </div>
                
                <table cellpadding="20" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); border-radius: 12px; margin: 25px 0; border-left: 5px solid #667eea;">
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.3); color: #444;">
                            <strong>📦 Plan:</strong> <span style="color: #667eea; font-weight: 600;">${planName}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.3); color: #444;">
                            <strong>💰 Price:</strong> <span style="color: #f5576c; font-weight: 600; font-size: 18px;">${price}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #444;">
                            <strong>💳 Payment Method:</strong> <span style="color: #667eea; font-weight: 600;">${paymentMethod}</span>
                        </td>
                    </tr>
                </table>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${accountSettingsLink}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px; box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                        ⚙️ Manage Subscription
                    </a>
                </div>
                
                <p style="font-size: 16px; margin-bottom: 25px; color: #666; text-align: center; background-color: #f8f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #667eea;">
                    💡 Want to make changes or cancel? Visit your account settings before the renewal date to avoid charges.
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <p style="font-size: 16px; margin: 10px 0; color: #666;">Need assistance?</p>
                    <a href="${supportLink}" style="color: #667eea; text-decoration: none; font-weight: 600; font-size: 16px; border: 2px solid #667eea; padding: 10px 20px; border-radius: 20px; display: inline-block; transition: all 0.3s ease;">
                        🆘 Contact Support
                    </a>
                </div>
                
                <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f0f0;">
                    <p style="font-size: 16px; margin: 0; color: #666;">
                        Best regards,<br>
                        <strong style="color: #667eea; font-size: 18px;">The TrackerX Team</strong> 💜
                    </p>
                </div>
            </td>
        </tr>
        <tr>
            <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 25px; text-align: center; color: white;">
                <p style="margin: 0 0 15px; font-size: 14px; opacity: 0.9;">
                    📍 TrackerX Inc. | 123 Subscription Street, Tech City, TC 12345
                </p>
                <div style="margin: 15px 0;">
                    <a href="#" style="color: white; text-decoration: none; margin: 0 15px; opacity: 0.9; font-size: 14px; border: 1px solid rgba(255,255,255,0.3); padding: 8px 15px; border-radius: 15px; display: inline-block;">📧 Unsubscribe</a>
                    <a href="#" style="color: white; text-decoration: none; margin: 0 15px; opacity: 0.9; font-size: 14px; border: 1px solid rgba(255,255,255,0.3); padding: 8px 15px; border-radius: 15px; display: inline-block;">🔒 Privacy</a>
                    <a href="#" style="color: white; text-decoration: none; margin: 0 15px; opacity: 0.9; font-size: 14px; border: 1px solid rgba(255,255,255,0.3); padding: 8px 15px; border-radius: 15px; display: inline-block;">📋 Terms</a>
                </div>
            </td>
        </tr>
    </table>
</div>
`;

export const emailTemplates = [
  {
    label: "7 days before reminder",
    generateSubject: (data) =>
      `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
  },
  {
    label: "5 days before reminder",
    generateSubject: (data) =>
      `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
  },
  {
    label: "2 days before reminder",
    generateSubject: (data) =>
      `🚀 2 Days Left!  ${data.subscriptionName} Subscription Renewal`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
  },
  {
    label: "1 days before reminder",
    generateSubject: (data) =>
      `📅 Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
  },
];