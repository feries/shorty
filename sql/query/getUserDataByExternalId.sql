SELECT
       ct.value as type,
       uc.value as value
FROM user AS u
LEFT JOIN user_contact AS uc ON u.id = uc.user_id
LEFT JOIN contact_type AS ct ON uc.contact_type_id = ct.id
WHERE u.external_id = ?
AND u.account_enabled = 1;
