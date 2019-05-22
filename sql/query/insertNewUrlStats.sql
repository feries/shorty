INSERT stat (url_id, source_url, target_url, author_id) VALUES (?, ?, ?, (SELECT id FROM `user` WHERE external_id = ?));
