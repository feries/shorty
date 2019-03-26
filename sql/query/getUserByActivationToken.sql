SELECT id, external_id, email
FROM `user`
WHERE activation_token = ?
    AND email = ?
    AND account_enabled = 0;
