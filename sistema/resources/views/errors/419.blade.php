<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"> 
<head>
    <title>{{ config('app.name', 'Laravel') }}</title>
    
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <meta name="description" content="{{ config('app.name', 'Laravel') }}">
    <meta name="author" content="Tiago Silva Costa">    
    <link rel="shortcut icon" href="/favicon.ico"> 
    
    <!-- FontAwesome JS-->
    <!--<script defer src="/assets/plugins/fontawesome/js/all.min.js"></script>-->
    
    <!-- App CSS -->  
    <link id="theme-style" defer nonce="{{ csp_nonce() }}" rel="stylesheet" href="/assets/css/portal.css">
    <link id="theme-style" defer nonce="{{ csp_nonce() }}" rel="stylesheet" href="/css/customized.min.css">
 
</head> 

<body class="app app-404-page">   
    <div class="container mb-5">
        <div class="row">
            <div class="col-12 col-md-11 col-lg-7 col-xl-6 mx-auto">
                <div class="app-branding text-center mb-5">
                    <a class="app-logo" href="{{url('/')}}"><img id="img_logo" src="/assets/images/logos/Logo-Oi_3.png" alt="logo"> <span class="logo-text">{{ config('app.name', 'Laravel') }}</span></a>

                </div><!--//app-branding-->  
                <div class="app-card p-5 text-center shadow-sm">
                    <h1 class="page-title mb-4"><span class="font-weight-light">Falha de requisição!</span></h1>
                    <div class="mb-4">
                        Desculpa! Requisição não segura não é autorizada.<br>Volte para a tela principal e tente novamente, por favor. 
                    </div>
                    <a class="btn app-btn-primary" href="{{url('/')}}">Ir para tela princípal</a>
                </div>
            </div><!--//col-->
        </div><!--//row-->
    </div><!--//container-->

    <!-- Javascript -->          
    <script defer nonce="{{ csp_nonce() }}" src="assets/plugins/popper.min.js"></script>
    <script defer nonce="{{ csp_nonce() }}" src="assets/plugins/bootstrap/js/bootstrap.min.js"></script>  
</body>
</html> 
