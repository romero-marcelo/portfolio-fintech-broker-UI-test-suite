import { faker } from '@faker-js/faker';
import { env } from '../../../test-data/env.js';

export class WithdrawPage {
  constructor(page) {
    this.page = page;
  }

  // LOCATORS
  // Withdraw Form
  headerTitle = () => this.page.getByRole('heading', { name: 'Withdraw', exact: true });
  withdrawTypeDropdown = () => this.page.locator('.react_select__control').filter({ hasText: 'Select...' }).first();
  bitcoinCurrencyOption = () => this.page.getByText('Bitcoin (BTC)', { exact: true }).first();
  selectWalletDropdown = () => this.page.locator('.react_select__control').filter({ hasText: 'Select...' }).first();
  usdWallet = () => this.page.locator('.react_select__menu').getByText(/USD -/i);
  usdAmountTextBox = () => this.page.getByRole('textbox', { name: 'amount' });
  requestWithdrawalButton = () => this.page.getByRole('button', { name: 'Request Withdrawal' });

  // Withdrawal Confirmation
  withdrawalRequestTitle = () => this.page.getByRole('heading', { name: 'Withdrawal Request' });
  normalWithdrawalCard = () => this.page.getByText('Normal Withdrawal');
  withdrawalConfirmationTitle = () => this.page.getByRole('heading', { name: 'Withdrawal Confirmation' });
  withdrawButton = () => this.page.getByRole('button', { name: 'Withdraw' });

  // External Gateway Payment Page
  gatewayPaymentTitle = () => this.page.getByText('Enter  address you wish to withdraw funds to');
  goBacktoWithdrawalsPageLink = () => this.page.getByRole('link', { name: /Go Back to/i });

  // History Section
  historyHeader = () => this.page.getByRole('heading', { name: 'History' });
  actionCancelButton = () => this.page.getByRole('button', { name: 'Cancel' }).first();
  cancelWithdrawalButton = () => this.page.getByRole('button', { name: 'Cancel Withdrawal' });

  // ACTIONS
  async goto() {
    await this.page.goto(`${env.baseUrl}/withdrawals`);
  }

  async clickWithdrawTypeDropdown() {
    await this.withdrawTypeDropdown().waitFor({ state: 'visible' });
    await this.withdrawTypeDropdown().click();
  }

  async selectBitcoinCurrency() {
    await this.bitcoinCurrencyOption().waitFor({ state: 'visible' });
    await this.bitcoinCurrencyOption().click();
  }

  async clickSelectWalletDropdown() {
    await this.selectWalletDropdown().waitFor({ state: 'visible' });
    await this.selectWalletDropdown().click();
  }

  async selectUsdWallet() {
    await this.usdWallet().waitFor({ state: 'visible' });
    await this.usdWallet().click();
  }

  async selectAmount() {
    await this.usdAmountTextBox().click();
  }

  async enterAmount(amount) {
    await this.usdAmountTextBox().click();
    await this.usdAmountTextBox().fill(amount);
  }

  async clickRequestWithdrawal() {
    await this.requestWithdrawalButton().click();
  }

  async clickNormalWithdrawalCard() {
    await this.normalWithdrawalCard().click();
  }

  async clickWithdraw() {
    await this.withdrawButton().click();
  }

  async clickGoBackToWithdrawalsPage() {
    await this.goBacktoWithdrawalsPageLink().click();
  }

  async clickCancelTransaction() {
    await this.actionCancelButton().click();
  }

  async clickCancelWithdrawal() {
    await this.cancelWithdrawalButton().click();
  }
}
