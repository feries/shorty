SELECT EXISTS(
  SELECT 1
  FROM url AS U
  WHERE U.host_id = ? AND U.source_url = ?
  LIMIT 1
) AS 'exist';
