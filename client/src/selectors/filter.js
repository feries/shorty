module.exports = (results, targetExternalId) =>
  results.filter((record) => record.externalId !== targetExternalId)
