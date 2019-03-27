INSERT INTO api_key (external_id, issuer, `key`, user_id)
VALUES (?, ?, ?, (SELECT id FROM `user` WHERE external_id = ?));
