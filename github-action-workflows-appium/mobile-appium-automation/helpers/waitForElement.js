const timeout = 10000;

export default async function waitForElement(driver, searchString) {
  const element = await driver.$(searchString);
  await element.waitForExist({timeout: timeout});

  return element;
};
