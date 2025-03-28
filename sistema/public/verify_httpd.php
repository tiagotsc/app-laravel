<?php
$response = ['status' => 'ok', 'description' => 'tudo certo'];
http_response_code(200);
echo json_encode($response);
