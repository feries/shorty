SELECT * 
FROM users
WHERE 
	email = ?
	AND
	account_enabled = 1;
