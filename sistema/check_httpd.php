<?php

/**
 * Faz a verificação se o apache está no ar
 * Se não estiver inicia o apache
 */

# Carrega dados do .env
$data = parse_ini_file('.env', false, INI_SCANNER_RAW);

function checkPage($url){
    // Initializing curl
    $curl = curl_init();

    // Sending GET request to reqres.in
    // server to get JSON data
    curl_setopt($curl, CURLOPT_URL, $url);
    
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    
    // Telling curl to store JSON
    // data in a variable instead
    // of dumping on screen
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    
    // Executing curl
    $response = curl_exec($curl);
    
    // Checking if any error occurs 
    // during request or not
    $result = [];
    if($e = curl_error($curl)) {
        echo $e;
    } else {
        // Decoding JSON data
        $result = json_decode($response, true); 
    }
    
    // Closing curl
    curl_close($curl);

    return $result;
}

$resp = checkPage($data['APP_URL'].'/verify_httpd.php');

if(isset($resp['status']) and $resp['status'] == 'ok'){
    echo 'Esta no ar';
}else{
    echo "\n\nnão está no ar! Reiniciando apache.\n\n";
    shell_exec('sudo /webtools/apache/bin/apachectl stop');
    shell_exec('sudo /webtools/apache/bin/apachectl start');
}

?>
