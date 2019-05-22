INSERT INTO os (external_id, name)
SELECT * FROM (SELECT ?, ?) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM os WHERE name = ?
) LIMIT 1;
