import nodemailer from 'nodemailer';

import { EMAIL_PASSWORD } from './env.js'

export const account = 'japneetjaskirat7@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: account,
    pass: EMAIL_PASSWORD
  }
})

export default transporter;