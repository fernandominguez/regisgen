SELECT
  r.`id`,
  r.`number`,
  r.`type`,
  r.`subtype`,
  r.`date`,
  DATE_FORMAT(r.`date`, '%d/%m/%Y %H:%i:%s') dateFormat,
  r.`title`,
  r.`content`,
  r.`origin`,
  torigin.`name` originThirdpartyName,
  dorigin.`name` originDepartmentName,
  r.`destiny`,
  tdestiny.`name` destinyThirdpartyName,
  ddestiny.`name` destinyDepartmentName,
  r.`channel`,
  r.`tag`,
  r.`state`,
  COUNT(DISTINCT(rfiles.`id-file`))
FROM
  `registry` r
  LEFT JOIN thirdparties torigin ON r.`origin` = torigin.`id`
  LEFT JOIN thirdparties tdestiny ON r.`destiny` = tdestiny.`id`
  LEFT JOIN departments dorigin ON r.`origin` = dorigin.`id`
  LEFT JOIN departments ddestiny ON r.`destiny` = ddestiny.`id`
  LEFT JOIN `registry-files` rfiles ON r.`id` = rfiles.`id-registry`
GROUP BY r.`id`
ORDER BY
  r.`id` DESC