INSERT INTO oss (external_id, name)
SELECT * FROM (SELECT ?, ?) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM oss WHERE name = ?
) LIMIT 1;
