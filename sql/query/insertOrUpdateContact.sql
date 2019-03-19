INSERT INTO user_contact (user_id, contact_type_id, value)
  VALUES(
    (SELECT id FROM `user` WHERE external_id = ?),
    (SELECT id FROM `contact_type` WHERE value = ?),
  ?) ON DUPLICATE KEY UPDATE value=?
