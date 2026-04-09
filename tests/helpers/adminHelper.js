import { request } from '@playwright/test';
import { getOtpfromAPP } from './authenticator.js';
import { env } from '../test-data/env.js';
import { adminUser } from '../test-data/users.js';
import dotenv from 'dotenv';
dotenv.config();

async function getAdminToken(apiContext) {
  const otp = getOtpfromAPP({ totpSecret: process.env.TOTP_SECRET_ADMIN_USER });
  const response = await apiContext.post('/authentication', {
    data: {
      email: adminUser.email,
      password: process.env.ADMIN_PASSWORD,
      recaptcha: process.env.ADMIN_RECAPTCHA,
      totp: otp,
    },
  });
  if (!response.ok()) {
    throw new Error(`Admin authentication failed: ${response.status()}`);
  }
  const json = await response.json();
  return json.token || json.accessToken;
}

export async function resetKycUser(userId) {
  const apiContext = await request.newContext({ baseURL: env.apiUrl });
  try {
    const token = await getAdminToken(apiContext);
    const res = await apiContext.post(`/admin/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        kyc: 'NOT_VERIFIED',
        status: 'APPROVED',
        roles: ['_u_._normal_'],
      },
    });
    if (!res.ok()) {
      throw new Error(`Failed to reset user: ${res.status()}`);
    }
    return await res.json();
  } finally {
    await apiContext.dispose();
  }
}
