INSERT INTO stats (url_id, browser_id, os_id, device_id, referrer, country) VALUES
  (?, (SELECT id FROM browsers WHERE name = ?), (SELECT id FROM oss WHERE name = ?), ?, ?, ?)
