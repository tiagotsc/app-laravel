<?php

/**
 * Script que executa o deploy do sistema
 */

# Carrega dados do .env
$data = parse_ini_file('.env', false, INI_SCANNER_RAW);

try {
	$conn = new PDO('mysql:host='.$data['DB_HOST'].';dbname='.$data['DB_DATABASE'], $data['DB_USERNAME'], $data['DB_PASSWORD']);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	# Pega a quantidade de deploys agendados pendentes para o repositório
	$query = "SELECT COUNT(*) qtd FROM deploys WHERE status = 'pending' AND repository='predator' AND enveronment = '".$data['APP_ENV']."'";
	$STH = $conn->prepare( $query );
	$STH->execute();
	$result = $STH->fetch();


	if($result["qtd"] > 0){ # Se existe algum agendamento, executa o deploy

		$res = addslashes(shell_exec('sh /webaplic/predator/deploy.sh'));

		$update = "UPDATE deploys SET status='complete', description='".$res."', updated_at='".date('Y-m-d H:i:s')."' ";
		$update .= "WHERE status='pending' AND repository='predator' AND enveronment='".$data['APP_ENV']."'";

	  // Prepare statement
		$stmt = $conn->prepare($update);
	  // execute the query
		$stmt->execute();
		#echo $stmt->rowCount() . " records UPDATED successfully";

	}
	
} catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}

$conn = null;
?>
