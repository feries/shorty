module.exports = (results, targetExternalId) =>
  results.map((record) => {
    if (record.externalId === targetExternalId) record.urlClick++
    return record
  })
