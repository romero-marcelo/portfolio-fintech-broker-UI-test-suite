import { test, expect } from '../../fixtures/auth.fixture.js';
import { loginUser } from '../../test-data/users.js';

test.describe('Login Tests', () => {

  // REGULAR USER
  test('Regular User Login, using password and 2FA-APP', async ({ pageObjects, performLogin, page }) => {
    
    await performLogin(loginUser.regular);

    await expect(pageObjects.headerSection.userGreeting()).toHaveText(`Hey, ${loginUser.regular.name}`);
    await expect(page).toHaveURL(/.*dashboard.*/);
  });

  // CORPORATE USER           
  test('Corporate User Login, using password and 2FA-APP', async ({ pageObjects, performLogin, page }) => {
    
    await performLogin(loginUser.corporate);

    // Assert
    await expect(pageObjects.headerSection.userGreeting()).toHaveText(`Hey, ${loginUser.corporate.name}`);
    await expect(pageObjects.page).toHaveURL(/.*dashboard.*/);
  });
});
