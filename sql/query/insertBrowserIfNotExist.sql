INSERT INTO browser (external_id, name)
SELECT * FROM (SELECT ?, ?) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM browser WHERE name = ?
) LIMIT 1;
