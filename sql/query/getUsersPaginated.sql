SELECT
  u.external_id AS "externalId",
  u.email,
  u.account_enabled AS "active"
FROM `user` as u
ORDER BY u.created_at DESC
LIMIT ? OFFSET ?;
