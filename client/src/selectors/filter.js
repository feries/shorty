export default (results, targetExternalId) =>
  results.filter((record) => record.externalId !== targetExternalId)
