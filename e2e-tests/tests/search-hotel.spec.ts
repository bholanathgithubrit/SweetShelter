import {test, expect} from "@playwright/test"
import path from "path"
const UI_URL="http://localhost:5173/"

test.beforeEach(async ({page})=>{
 await page.goto(UI_URL)
 //get the sign in button
  await page.getByRole("link",{name:"Sign In"}).click()

  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible()

  await page.locator("[name=email]").fill("1@1.com")

  await page.locator("[name=password]").fill("password123")

  await page.getByRole("button",{name:"Login"}).click()


  await expect(page.getByText("SignIn Successfull")).toBeVisible()
})


test("should show hotel search result",async ({page})=>{
    await page.goto(UI_URL)

    await page.getByPlaceholder("where are you going?").fill("Test City")
    await page.getByRole("button",{name:"Search"}).click()

    await expect(page.getByText("Hotels found in Test City")).toBeVisible()
    await expect(page.getByText("Test Hotel Updated")).toBeVisible()
})

test("should show hotel details",async({page})=>{
    await page.goto(UI_URL)
    await page.getByPlaceholder("where are you going?").fill("Test City")
    await page.getByRole("button",{name:"Search"}).click()
    await page.getByText("Test City").click()
    await expect(page).toHaveURL(/detail/)
    await expect(page.getByRole("button",{name:"Book Now"})).toBeVisible()
})