const containTitle = async (value) => {
  await expect(browser).toHaveTitleContaining(value);
};

const CommonComponents = {
  containTitle: (value) => containTitle(value),
};

export default CommonComponents;
