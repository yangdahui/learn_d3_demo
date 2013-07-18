
<?php

// connect
$m = new MongoClient();

// select a database
$db = $m->analysisresult;

// select a collection (analogous to a relational database's table)
$collection = $db->tmresult;


$cursor = $collection->find();

$data = array();

// iterate through the results
foreach ($cursor as $document) {
    $data[] = $document;
}

echo json_encode($data);

?>
