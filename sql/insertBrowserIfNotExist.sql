INSERT INTO browsers (external_id, name)
SELECT * FROM (SELECT ?, ?) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM browsers WHERE name = ?
) LIMIT 1;
