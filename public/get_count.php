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


if (isset($_GET['any'])) {
  $selector_in_year = '"DATE" >= \'' . $_GET['any'] . '-01-01\' and "DATE" <= \'' . $_GET['any'] . '-12-31\'';
}
$where = "";
if (isset($_GET['especie']) && isset($_GET['any']))
  $where = 'WHERE "ID_SPECIES" = ' . $_GET['especie'] . ' and ' . $selector_in_year;
else if (isset($_GET['any']))
  $where =  'WHERE ' . $selector_in_year;
else if (isset($_GET['especie']))
  $where = 'WHERE "ID_SPECIES" = ' . $_GET['especie'];

$query = 'SELECT date_part(\'year\', "DATE") as "any",
  date_part(\'week\', "DATE") AS setmana,
  "NAME_SPECIES" as especie,
  SUM("TOTAL_COUNT") as total           
  FROM public.observacions ' . $where . '
  GROUP BY "any", setmana, especie
  ORDER BY "any", setmana, especie;';


$result = pg_query($conn, $query);

if (!$result) {
  echo "Error al fer la petició a la bbdd.\n";
  exit;
}

if ($data = pg_fetch_all($result)) {
  echo json_encode($data);
}

pg_close($conn);
