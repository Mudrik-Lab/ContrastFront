import { test, expect } from "@playwright/test";

async function login({ page }) {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByPlaceholder("User Name").click();
  await page.getByPlaceholder("User Name").fill("try4");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("12345678");
  await page.getByRole("button", { name: "Login" }).click();
}

test("user can login", async ({ page }) => {
  await login({ page });
  expect(await page.getByRole("button", { name: "try4" }).isVisible());
});

test("user can add new paper", async ({ page }) => {
  await login({ page });
  await page.getByRole("link", { name: "Upload New Paper" }).click();
  await page.getByRole("link", { name: "Upload New Paper" }).click();

  await page.getByRole("button", { name: "Add New Paper" }).click();
  await page.getByPlaceholder("Enter New Paper Title").click();
  await page.getByPlaceholder("Enter New Paper Title").fill("TestPaper");
  await page.getByPlaceholder("Enter your DOI identifier").click();
  await page.getByPlaceholder("Enter your DOI identifier").click();
  await page
    .getByPlaceholder("Enter your DOI identifier")
    .fill("10.1177/00225266209748");
  await page.getByPlaceholder("Enter year").click();
  await page.getByPlaceholder("Enter year").fill("2011");
  await page
    .locator("div")
    .filter({ hasText: /^Select or Add Authors$/ })
    .nth(2)
    .click();
  await page.getByText("Aantaa R.", { exact: true }).click();
  await page.getByLabel("Select jurnal").fill("f");
  await page
    .getByText("Cogn. Affect. Behav. Neurosci.", { exact: true })
    .dblclick();
  await page.getByText("Afghanistan", { exact: true }).click();

  await page.getByRole("button", { name: "Save Paper" }).click();
  expect(await page.getByText("Success").isVisible());
});

test("user can edit paper from Uncompleted submissions", async ({ page }) => {
  await login({ page });
  await page.getByRole("link", { name: "Upload New Paper" }).click();
  await page.getByRole("link", { name: "Upload New Paper" }).click();
  await page.getByText("Uncompleted submissions(1)").click();
  await page.getByText("edit", { exact: true }).click();
  await page
    .locator(".css-4xgw5l-IndicatorsContainer2 > div:nth-child(3)")
    .first()
    .click();
  await page.getByText("Cassol H.", { exact: true }).dblclick();
  await page.locator("#react-select-5-input").press("Escape");
  await page.locator("#react-select-5-input").click();
  await page.locator("#react-select-5-input").press("Escape");
  await page.getByRole("button", { name: "Update Paper" }).click();
  expect(await page.getByText("Study's details were updated").isVisible());
});

test("user can add an experiment", async ({ page }) => {
  await login({ page });
  await page.getByRole("link", { name: "Upload New Paper" }).click();
  await page.getByRole("link", { name: "Upload New Paper" }).click();
  await page.getByText("Uncompleted submissions(1)").click();
  await page.getByText("edit", { exact: true }).click();
  await page.getByText("+ Add new experiment").click();
  await page.getByText("Basic Classifications").click();
  await page.getByText("Experiment typeSelect... Was").click();
  await page.getByText("Both", { exact: true }).click();
  await page.getByText("Type of consciousness").click();
  await page
    .locator(
      "#type_of_consciousness > .css-13cymwt-control > .css-art2ul-ValueContainer2 > .css-w9q2zk-Input2"
    )
    .click();
  await page.getByText("Content", { exact: true }).click();
  await page
    .locator(
      "#report > .css-13cymwt-control > .css-art2ul-ValueContainer2 > .css-w9q2zk-Input2"
    )
    .click();
  await page.getByText("No Report", { exact: true }).click();
  await page
    .locator(
      "#theory_driven > .css-13cymwt-control > .css-art2ul-ValueContainer2 > .css-w9q2zk-Input2"
    )
    .click();
  await page.getByText("Mentioning", { exact: true }).click();
  await page
    .locator(
      ".flex > div > div:nth-child(5) > div > .css-b62m3t-container > .css-13cymwt-control > .css-art2ul-ValueContainer2 > .css-w9q2zk-Input2"
    )
    .click();
  await page.getByText("HOT", { exact: true }).click();
  await page.getByRole("button", { name: "Save Experiment" }).click();
  expect(
    await page
      .getByText(
        "New experiment was created successfully Now you can add other classifications"
      )
      .isVisible()
  );
});

test("user can delete paper from Uncompleted submissions", async ({ page }) => {
  await login({ page });
  await page.getByRole("link", { name: "Upload New Paper" }).click();
  await page.getByRole("link", { name: "Upload New Paper" }).click();
  await page.getByText("Uncompleted submissions(1)").click();
  await page.getByText("delete").click();
  await page.getByRole("button", { name: "Yes' Delete it!" }).click();
  expect(await page.getByText("Study was deleted successfully").isVisible());
});

test("user cant add new paper if not all fields r full", async ({ page }) => {
  await login({ page });
  await page.getByRole("link", { name: "Upload New Paper" }).click();
  await page.getByRole("link", { name: "Upload New Paper" }).click();

  await page.getByRole("button", { name: "Add New Paper" }).click();
  await page.getByPlaceholder("Enter New Paper Title").click();
  await page.getByPlaceholder("Enter New Paper Title").fill("TestPaper");
  await page.getByPlaceholder("Enter your DOI identifier").click();
  await page.getByPlaceholder("Enter your DOI identifier").click();
  await page
    .getByPlaceholder("Enter your DOI identifier")
    .fill("10.1177/00225266209743");
  //skip year field
  await page
    .locator("div")
    .filter({ hasText: /^Select or Add Authors$/ })
    .nth(2)
    .click();
  await page.getByText("Aantaa R.", { exact: true }).click();
  await page.getByLabel("Select jurnal").fill("f");
  await page
    .getByText("Cogn. Affect. Behav. Neurosci.", { exact: true })
    .dblclick();
  await page.getByText("Afghanistan", { exact: true }).click();

  expect(await page.getByRole("button", { name: "Save Paper" }).isDisabled());
});
