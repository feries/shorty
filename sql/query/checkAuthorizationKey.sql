SELECT u.*
FROM `api_key` AS ak
LEFT JOIN user AS u ON u.id = ak.user_id
WHERE ak.key = ?;
