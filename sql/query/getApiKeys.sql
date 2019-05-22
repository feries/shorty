SELECT
  a.external_id AS "externalId",
  a.`key`,
  a.active,
  GROUP_CONCAT(uc.value SEPARATOR ' ') AS "author",
  a.issuer,
  a.created_at AS "createdAt"
FROM api_key AS a
  JOIN user u ON a.user_id = u.id
  JOIN user_contact uc ON u.id = uc.user_id
  JOIN contact_type ct ON uc.contact_type_id = ct.id
WHERE ct.value = 'name' OR ct.value = 'surname'
GROUP BY a.`key`
ORDER BY a.created_at DESC
LIMIT ? OFFSET ?;
