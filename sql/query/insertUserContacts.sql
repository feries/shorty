INSERT INTO `user_contact` (user_id, contact_type_id, value)
VALUES
  ((SELECT id FROM `user` WHERE email = ?), (SELECT id FROM contact_type WHERE `value` = 'name'), ?),
  ((SELECT id FROM `user` WHERE email = ?), (SELECT id FROM contact_type WHERE `value` = 'surname'), ?);
