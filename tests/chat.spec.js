// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://front-end-lvl4.herokuapp.com/login');
});

test.describe('login-lables', () => {
   
  
    test('should display the correct text', async ({ page }) => {
      await page.fill('text=Ваш ник', 're');
      await page.fill('text=Пароль', 'fd');
      await page.locator('text=Войти').click()

      await expect(page.locator('.invalid-feedback')).toHaveText('Неверные имя пользователя или пароль')
    });
});

test.beforeEach(async ({ page }) => {
    await page.goto('https://front-end-lvl4.herokuapp.com/signup');
  });
  
  test.describe('registration-lables', () => {
     
    
      test('should display the correct text', async ({ page }) => {
        await page.fill('text=Имя пользователя', 're');
        await page.fill('text=Пароль', 'fd');
        
        await page.locator('text=Зарегистрироваться').click()
  
        await expect(page.locator('.card-body')).toContainText('От 3 до 20 символов');
        await expect(page.locator('.card-body')).toContainText('Не менее 6 символов')
    
      });
  });