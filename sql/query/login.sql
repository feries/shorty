SELECT * 
FROM `user`
WHERE 
	email = ?
	AND
	account_enabled = 1;
