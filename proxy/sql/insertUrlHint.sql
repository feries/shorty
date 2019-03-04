INSERT INTO stats (url_id, browser_id, os_id, is_mobile, is_tablet, is_desktop, referrer, country) VALUES
  (?, (SELECT id FROM browsers WHERE name = ?), (SELECT id FROM oss WHERE name = ?), ?, ?, ?, ?, ?)
