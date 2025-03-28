<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"> 
<head>
    <title>{{ config('app.name', 'Laravel') }}</title>
    
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <meta name="description" content="Portal - Bootstrap 5 Admin Dashboard Template For Developers">
    <meta name="author" content="Xiaoying Riley at 3rd Wave Media">    
    <link rel="shortcut icon" href="favicon.ico"> 
    <!-- <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'nonce-a23gbfz9e'"> -->
    <!-- FontAwesome JS-->
    <!-- <script defer nonce="a23gbfz9e" src="/assets/plugins/fontawesome/js/all.min.js"></script> -->
	<!-- <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/fontawesome/js/all.min.js"></script> -->
    
    <!-- App CSS -->  
    <link id="theme-style" defer nonce="{{ csp_nonce() }}" rel="stylesheet" href="/assets/css/portal.css">
	<!-- App CSS Customizado pelo desenvolvedor -->  
	<link rel="stylesheet" defer nonce="{{ csp_nonce() }}" href="/css/customized.min.css">

</head> 

<body class="app app-login p-0">    	
    <div class="row g-0 app-auth-wrapper">
	    <div class="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
		    <div class="d-flex flex-column align-content-end">
			    <div class="app-auth-body mx-auto">	
				    <div class="app-auth-branding mb-4"><a class="app-logo" href="{{ url('/') }}"><img class="logo-style" src="/assets/images/logos/Logo-Oi_3.png" alt="logo"></a></div>
					<h2 class="auth-heading text-center mb-5">{{ config('app.name', 'Laravel') }}</h2>
			        <div class="auth-form-container text-start">
						{{$slot}}
						
					</div><!--//auth-form-container-->	

			    </div><!--//auth-body-->

		    </div><!--//flex-column-->   
	    </div><!--//auth-main-col-->
	    <div class="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
		    <div class="auth-background-holder">
		    </div>
		    <div class="auth-background-mask"></div>
		    <div class="auth-background-overlay p-3 p-lg-5">
			    <div class="d-flex flex-column align-content-end h-100">
				    <div class="h-100"></div>
				    <div class="overlay-content p-3 p-lg-4 rounded">
					    <h5 class="mb-3 overlay-title">Persista!</h5>
					    <div>Se tudo fosse fácil, qualquer um conseguiria.</div>
				    </div>
				</div>
		    </div><!--//auth-background-overlay-->
	    </div><!--//auth-background-col-->
    
    </div><!--//row-->


</body>
</html> 

