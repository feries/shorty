SELECT COUNT(id) AS "count"
FROM `user`
WHERE activation_token = ?
  AND account_enabled = 0
  AND password IS NULL;

