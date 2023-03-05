const timeout = 10000

const poll = async (driver, startTime, context) => {
  const currentTime = Date.now()
  if (Math.abs(startTime - currentTime) > timeout) {
    throw `Context did not become available within ${timeout / 1000} seconds`
  }

  const contexts = await driver.getContexts()

  switch (context) {
    case 'native':
      return contexts[0]
      break
    case 'web':
      if (contexts.length > 1) {
        return contexts[contexts.length - 1]
      } else {
        return await poll(driver, startTime, context)
      }
      break
    default:
      throw `Unrecognized context "${context}"`
  }
}

export async function waitForWebContext (driver) {
  const startTime = Date.now()
  const c = await driver.getContext()
  console.log("--- CURRENT CONTEXT IS: ", c)

  return await poll(driver, startTime, 'web')
}

export async function waitForNativeContext (driver) {
  const startTime = Date.now()
  const c = await driver.getContext()
  console.log("--- CURRENT CONTEXT IS: ", c)

  return await poll(driver, startTime, 'native')
}
