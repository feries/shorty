SELECT
  DATE_FORMAT(s.created_at, '%Y-%m-%d') AS click_date,
  COUNT(1) AS total,
	u.target_url AS "targetUrl",
	CONCAT(h.short_url, '/', u.source_url) AS "shortUrl",
	b.`name` AS "browser",
	o.`name` AS "os"
FROM stats AS s
JOIN urls AS u ON u.id = s.url_id
	LEFT JOIN `hosts` AS h ON h.id = u.host_id
	LEFT JOIN browsers AS b ON b.id = s.browser_id
	LEFT JOIN oss AS o ON o.id = s.os_id
WHERE u.external_id = ?
	AND (
    NOT ? OR (
      s.created_at >= ?
      AND s.created_at <  ?
    )
  )
GROUP BY DATE_FORMAT(s.created_at, '%Y-%m-%d');

