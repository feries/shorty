INSERT url (external_id, source_url, target_url, author_id, host_id, custom_url) VALUES (?, ?, ?, (SELECT id FROM `user` WHERE external_id = ?), ?, ?);
