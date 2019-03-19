SELECT
	id,
	target_url AS "targetUrl"
FROM url
WHERE source_url = ?
  AND active = 1;
