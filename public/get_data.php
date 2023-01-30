<?php

$ini_settings = parse_ini_file("../db_settings.ini");
$connection_string = "host=" . $ini_settings['host'] .
  " port=" . $ini_settings['port'] .
  " dbname=" . $ini_settings['dbname'] .
  " user=" . $ini_settings['user'] .
  " password=" . $ini_settings['password'];

$conn = pg_connect($connection_string);

if (!$conn) {
  echo "Error al connectar amb la bbdd.\n";
  exit;
}

$result = pg_query($conn, 'SELECT * FROM "observacions"');
if (!$result) {
  echo "Error al fer la petició a la bbdd.\n";
  exit;
}

if ($data = pg_fetch_all($result)) {
  echo json_encode($data);
}
