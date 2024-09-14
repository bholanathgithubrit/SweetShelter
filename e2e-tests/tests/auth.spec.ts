import { test, expect } from '@playwright/test';

const UI_URL="http://localhost:5173/"

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL)
//get the sign in button
  await page.getByRole("link",{name:"Sign In"}).click()

  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible()

  await page.locator("[name=email]").fill("1@1.com")

  await page.locator("[name=password]").fill("password123")

  await page.getByRole("button",{name:"Login"}).click()


  await expect(page.getByText("SignIn Successfull")).toBeVisible()
  await expect(page.getByRole("link",{name:"my-Bookings"})).toBeVisible()
  await expect(page.getByRole("link",{name:"my-hotels"})).toBeVisible()
  await expect(page.getByRole("button",{name:"SignOut"})).toBeVisible()
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test("sholuld allow user to register",async({page})=>{
  const testEmail=`test_register_${Math.floor(Math.random()*90000)+10000}@test.com`
  await page.goto(UI_URL)

  await page.getByRole("link", {name:"Sign In"}).click()
  await page.getByRole("link", {name:"Create your account here"}).click()
  await expect(page.getByRole("heading",{name:"Create Your account"})).toBeVisible()
  await page.locator("[name=firstName]").fill("test_firstName")
  await page.locator("[name=lastName]").fill("test_lastName")
  await page.locator("[name=email]").fill(testEmail)
  await page.locator("[name=password").fill("password123")
  await page.locator("[name=confirmPassword").fill("password123")
  
  await page.getByRole("button",{name:"create Acoount"}).click()
  await expect(page.getByText("Registation Success!")).toBeVisible()
  await expect(page.getByRole("link",{name:"my-Bookings"})).toBeVisible()
  await expect(page.getByRole("link",{name:"my-hotels"})).toBeVisible()
  await expect(page.getByRole("button",{name:"SignOut"})).toBeVisible()

})