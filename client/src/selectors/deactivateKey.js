module.exports = (list, externalId) =>
  list.map((el) => {
    if (el.externalId === externalId) el.active = 0
    return el
  })
