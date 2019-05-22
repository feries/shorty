INSERT INTO stat (url_id, browser_id, os_id, device_id, referrer, country) VALUES
  (?, (SELECT id FROM browser WHERE name = ?), (SELECT id FROM os WHERE name = ?), ?, ?, ?)
