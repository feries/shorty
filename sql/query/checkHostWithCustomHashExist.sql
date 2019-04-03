SELECT EXISTS(
  SELECT 1
  FROM url AS u
  WHERE u.host_id = ? AND u.source_url = ?
  LIMIT 1
) AS 'exist';
