import dotenv from 'dotenv';
dotenv.config();

export class TransfersPage {
  constructor(page) {
    this.page = page;
  }

  //LOCATORS
  // Transfers Form
  headerTitle = () => this.page.getByRole('heading', { name: 'Internal Transfer', exact: true });
  transferTypeLabel = () => this.page.getByTestId('InputLabel').filter({ hasText: 'Transfer Type' });
  transferTypeDropdown = () => this.page.getByText('Select a Transfer Type');
  walletToWalletOption = () =>
    this.page
      .locator('div')
      .filter({ hasText: /^Wallet to Wallet$/ })
      .first();
  transferFromLabel = () => this.page.getByTestId('InputLabel').filter({ hasText: 'Transfer From' });
  transferFromDropdown = () => this.page.locator('#transferFrom').getByText('Select...');
  usdWalletOption = () => this.page.getByText(/^USD - /).first();
  transferToLabel = () => this.page.getByTestId('InputLabel').filter({ hasText: 'Transfer to' });
  transferToDropdown = () => this.page.getByText('Select...');
  eurWalletOption = () => this.page.getByText(/^EUR - /).first();
  amountToTransferLabel = () => this.page.getByTestId('InputLabel').filter({ hasText: 'Amount to Transfer' });
  amountToTransferInput = () => this.page.getByRole('textbox', { name: 'amount' });
  requestTransferButton = () => this.page.getByRole('button', { name: 'Request Transfer' });

  // Confirmation window
  transferConfirmationHeader = () => this.page.getByRole('heading', { name: 'Transfer Confirmation' });
  transferConfirmationParagraph = () => this.page.getByTestId('transfer-confirm');
  cancelButton = () => this.page.getByRole('button', { name: 'Cancel' });
  transferButton = () => this.page.getByRole('button', { name: 'Transfer' });

  // History Section
  historyHeader = () => this.page.getByRole('heading', { name: 'History' });
  typeTableHeader = () => this.page.getByRole('columnheader', { name: 'Type' });
  typeCellContent = () => this.page.getByText('Wallet to Wallet').first();

  // Confirmation message
  confirmationMessage = () => this.page.getByText('Transfer completed!');

  
  // ACTIONS
  async goto() {
    await this.page.goto(`${env.baseUrl}/dashboard/transfers`);
  }
  async clickTransferTypeDropdown() {
    await this.transferTypeDropdown().click();
  }

  async selectWalletToWalletOption() {
    await this.walletToWalletOption().click();
  }

  async clickTransferFromDropdown() {
    await this.transferFromDropdown().click();
  }

  async selectUsdWalletOption() {
    await this.usdWalletOption().click();
  }

  async clickTransferToDropdown() {
    await this.transferToDropdown().click();
  }

  async selectEurWalletOption() {
    await this.eurWalletOption().click();
  }

  async enterAmountToTransfer(amount) {
    await this.amountToTransferInput().click();
    await this.amountToTransferInput().fill(amount);
  }

  async clickRequestTransferButton() {
    await this.requestTransferButton().click();
  }

  async clickTransferButton() {
    await this.transferButton().click();
  }
}
