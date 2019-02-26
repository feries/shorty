SELECT
	id,
	target_url AS "targetUrl"
FROM urls
WHERE source_url = ?;