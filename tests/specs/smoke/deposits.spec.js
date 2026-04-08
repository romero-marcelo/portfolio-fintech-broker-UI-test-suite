import { test, expect } from '../../fixtures/auth.fixture.js';
import { paymentUser } from '../../test-data/users.js';
import { DepositsPage } from '../../pageObjectModel/pages/index.js';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();
  
test('Deposit flow and Payment Gateway handshake', async ({ performLogin, pageObjects: { dashboardPage }, page }) => {
  
  const depositPage = new DepositsPage(page);
  const amount = faker.finance.amount(100, 500, 2);
  
  await performLogin(paymentUser.deposit);  

  await dashboardPage.clickDepositActionCard();
  await depositPage.clickDepositTypeDropdown();
  await depositPage.selectBitcoinCurrency();
  await depositPage.clickSelectWalletDropdown();
  await depositPage.selectUsdWallet();
  await depositPage.selectAmount();
  await depositPage.enterAmount(amount);
  await depositPage.clickGoToPayment();

  // Assert: Payment Gateway connection
  await depositPage.gatewayBitcoinPaymentTitle().waitFor({ state: 'visible' });
  await expect(depositPage.gatewayBitcoinPaymentTitle()).toContainText('Crypto Deposit - Bitcoin');
  await expect(page).toHaveURL(/.*payments-gateway.*/);
});
