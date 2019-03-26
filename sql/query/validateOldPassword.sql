SELECT id
FROM `user` WHERE external_id = ?
AND password = ?
AND account_enabled = 1;
