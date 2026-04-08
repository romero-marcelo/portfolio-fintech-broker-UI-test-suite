import { test, expect } from '../../fixtures/auth.fixture.js';
import { paymentUser } from '../../test-data/users.js';
import { WithdrawPage } from '../../pageObjectModel/pages/index.js';
import dotenv from 'dotenv';
dotenv.config();

test('Withdraw flow and Payment Gateway handshake', async ({ pageObjects, performLogin, page }) => {

  const withdrawPage = new WithdrawPage(page);
  
  await performLogin(paymentUser.withdraw);

  await pageObjects.dashboardPage.clickWithdrawActionCard();
  await withdrawPage.clickWithdrawTypeDropdown();
  await withdrawPage.selectBitcoinCurrency();
  await withdrawPage.clickSelectWalletDropdown();
  await withdrawPage.selectUsdWallet();
  await withdrawPage.selectAmount();
  await withdrawPage.enterAmount(1);
  await withdrawPage.clickRequestWithdrawal();
  await withdrawPage.clickNormalWithdrawalCard();
  await withdrawPage.clickWithdraw();

  // Assert: Payment Gateway connection
  await withdrawPage.gatewayPaymentTitle().waitFor({ state: 'visible' });
  await expect(withdrawPage.gatewayPaymentTitle()).toContainText('Enter  address you wish to withdraw funds to');
  await expect(page).toHaveURL(/.*payments-gateway\.crmdevz\.com\/withdraw.*/);
});
