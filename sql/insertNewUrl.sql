INSERT urls (external_id, source_url, target_url, author_id, host_id, custom_url) VALUES (?, ?, ?, (SELECT id FROM users WHERE external_id = ?), ?, ?);
