<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"> 
<head>
    <title>{{ config('app.name', 'Laravel') }}</title>
    
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <meta name="description" content="{{ config('app.name', 'Laravel') }}">
    <meta name="author" content="Tiago Silva Costa">    
    <link rel="shortcut icon" href="/favicon.ico"> 
    
    <!-- FontAwesome JS-->
    <!-- <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/fontawesome/js/all.min.js"></script> -->
    
@section('includesCSS')
    <!-- App CSS -->  
    <link nonce="{{ csp_nonce() }}" rel="stylesheet" href="/assets/css/portal.css">
    <!-- Include com bootstrap icons (não está funcionando muito bem no layout por isso foi comentado)-->
    <!--<link rel="stylesheet" href="/css/additional_template.css">-->
    <link nonce="{{ csp_nonce() }}" rel="stylesheet" href="/css/customized.min.css">
    <link nonce="{{ csp_nonce() }}" rel="stylesheet" href="/assets/plugins/bootstrap-icons/font/bootstrap-icons.min.css">
    <link nonce="{{ csp_nonce() }}" rel="stylesheet" href="/assets/plugins/datatables-novo/datatables.min.css">
    <link nonce="{{ csp_nonce() }}" rel="stylesheet" href="/assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css">
    <link nonce="{{ csp_nonce() }}" rel="stylesheet" href="/assets/plugins/select2/select2.min.css">
@show

@section('includesScriptsAlpineJS')
    <!-- ALPINEJS -->
    <!-- <script defer src="/assets/plugins/alpinejs.min.js"></script> -->
    <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/alpine-csp.min.js"></script>
    <script nonce="{{ csp_nonce() }}" src="/js/alpinejs.main.min.js"></script>

@show

@section('includePluginsJquery')
    <!-- JQUERY E PLUGINS -->
    <script nonce="{{ csp_nonce() }}" src="/assets/plugins/jquery-3.6.0.min.js"></script>
    <script nonce="{{ csp_nonce() }}" src="/js/util.min.js"></script>
    <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/jquery.blockUI.js"></script>
    <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/jquery.validate.min.js"></script>
    <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/additional-methods.min.js"></script>
    <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/datatables-novo/datatables.min.js"></script>
    <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/jquery.mask.min.js"></script>
    <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/moment-with-locales.js"></script>
    <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.pt-BR.min.js"></script>
    <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/jquery.maskMoney.min.js"></script>
    <script defer nonce="{{ csp_nonce() }}" src="/assets/plugins/select2/select2.min.js"></script>
@show
    
</head> 

<body class="app" x-data="main">   	
    <header class="app-header fixed-top">	   	            
        <div class="app-header-inner">  
	        <div class="container-fluid py-2">
		        <div class="app-header-content"> 
		            <div class="row justify-content-between align-items-center">
			        
				    <div class="col-auto">
					    <a id="sidepanel-toggler" class="sidepanel-toggler d-inline-block d-xl-none" href="#">
						    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img"><title>Menu</title><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path></svg>
					    </a>
				    </div><!--//col-->
		            
		            <div class="app-utilities col-auto">
			            <div class="app-utility-item app-notifications-dropdown dropdown">  
                            <!-- 
                                MENU NOTIFICAÇÃO (ESTA OCULTADO)
                                ESTA EM layouts.app_notifications
                            -->
				        </div><!--//app-utility-item-->
                        <!-- MENU COM OPÇÕES PARA NAVEGAÇÃO DO USUÁRIO LOGADO -->
			            @include('layouts.app_navigation')  
		            </div><!--//app-utilities-->
		        </div><!--//row-->
	            </div><!--//app-header-content-->
	        </div><!--//container-fluid-->
        </div><!--//app-header-inner-->
        <div id="app-sidepanel" class="app-sidepanel"> 
	        <div id="sidepanel-drop" class="sidepanel-drop"></div>
	        <div class="sidepanel-inner d-flex flex-column">
		        <a href="#" id="sidepanel-close" class="sidepanel-close d-xl-none">&times;</a>
		        <div id="div_logo" class="app-branding">
		            <a class="app-logo" href="{{url('/')}}"><img id="img_logo" src="/assets/images/logos/Logo-Oi_3.png" alt="logo"><span class="logo-text">{{ config('app.name', 'Laravel') }}</span></a>
		        </div><!--//app-branding-->  
		        
                <nav id="app-nav-main" class="app-nav app-nav-main flex-grow-1">
                    <ul class="app-menu list-unstyled accordion" id="menu-accordion">
                        @include(config('laravel-menu.views.bootstrap-items'), ['items' => $mainMenu->roots()])
                </nav><!--//app-nav-->
                <div class="app-sidepanel-footer">
                    <nav class="app-nav app-nav-footer">
                        <ul class="app-menu footer-menu list-unstyled">
                        @include(config('laravel-menu.views.bootstrap-items'), ['items' => $adminMenu->roots()])
                    </nav>
                    
                </div><!--//app-sidepanel-footer-->
		       
	        </div><!--//sidepanel-inner-->
	    </div><!--//app-sidepanel-->
    </header><!--//app-header-->
    
    <div class="app-wrapper">
	    
	    <div class="app-content pt-3 p-md-3 p-lg-4">
		    <div class="container-xl">
			    @if (session('alertMessage'))
                    @php
                        $alert = explode('|',session('alertMessage'));
                    @endphp
                    <div class="alert {{ $alert[0] }} alert-dismissible fade show" role="alert">
                        {{ $alert[1] }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endisset
                
			    <h1 class="app-page-title">@yield('title')</h1>
                @yield('content')
			    <!--<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reset-password">
                    Launch demo modal
                </button>-->
		    </div><!--//container-fluid-->
	    </div><!--//app-content-->
	    
    </div><!--//app-wrapper-->    					

    <!-- Modal Reset Senha -->
    <div class="modal fade" id="reset-password" tabindex="-1" aria-labelledby="resetPassword" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="resetPassword">Deseja alterar a senha?</h5>
                <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button> -->
                <!-- <i class="bi bi-x-lg cursor-pointer text-secudary" data-bs-dismiss="modal"></i> -->
                </div>
                <form id="frm-reset-password" action="{{route('user.update_password',[Auth::user()->id])}}">
                    <div class="modal-body">
                        <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="new_password" class="form-label">
                                        <b>Nova senha</b>
                                    </label>
                                    <span class="mandatory">*</span>
                                    <input @keyup="validationResetPassword" type="password" class="form-control" id="new_password" name="new_password">
                                    <p x-show="show1" x-html="message1" class="error"></p>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="new_password" class="form-label">
                                        <b>Repita nova senha</b>
                                    </label>
                                    <span class="mandatory">*</span>
                                    <input @keyup="validationResetPassword" type="password" class="form-control" id="again_new_password" name="again_new_password">
                                    <p x-show="show2" x-html="message2" class="error"></p>
                                </div>
                        </div>
                        <div class="row">
                            <div x-html="statusResetPass" class="col-md-12">
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" :disabled="execAlter" data-bs-dismiss="modal">Fechar</button>
                        <button type="button" @click="resetPassword" :disabled="btn_block" x-text="btAlterPsw" class="btn btn-primary color-white">Alterar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal responsável por apagar registro -->
    <div class="modal fade" id="delete-register" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteRegisterModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="deleteRegisterModalLabel">Deseja apagar o registro?</h1>
                <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                <i id="bt1-close-modal-delete" class="bi bi-x-lg cursor-pointer text-secudary" data-bs-dismiss="modal"></i>
            </div>
            <div class="modal-body">
                <div class="row text-center">
                    <b class="h4" id="delete_register_name"></b>
                    <p id="msg-modal-delete"></p>
                </div>
                <input type="hidden" name="delete_register_url" id="delete_register_url">
            </div>
            <div class="modal-footer">
                <button type="button" id="bt2-close-modal-delete" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" id="modal-bt-delete-register" class="btn btn-danger"><span id="modal-label-bt-delete" class="text-white">Excluir</span></button>
            </div>
            </div>
        </div>
    </div>

    <!-- Modal status -->
    <div class="modal fade" id="modal-status" tabindex="-1" aria-labelledby="title-modal-status" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="title-modal-status"></h1>
                <i class="bi bi-x-lg cursor-pointer text-secudary" data-bs-dismiss="modal"></i>
            </div>
            <div class="modal-body text-center">
                <b class="h4" id="desc-status-modal"></b>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
            </div>
        </div>
    </div>

    <!-- Modal confirm -->
    <div class="modal fade" id="modal-confirm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="confirm-modal-title" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="confirm-modal-title"></h1>
            </div>
            <div class="modal-body text-center">
                <h5 id="modal-confirm-desc"></h5>
                <div id="return-modal-confirm"></div>
                <input type="hidden" name="modal_confirm_url" id="modal_confirm_url">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="bt-close-modal-confirm" data-bs-dismiss="modal">Fechar</button>
                <button type="button" id="bt-modal-confirm" class="btn btn-primary text-white">Sim</button>
            </div>
            </div>
        </div>
    </div>
@section('includesJS')
    <!-- Javascript -->          
    <script nonce="{{ csp_nonce() }}" src="/assets/plugins/popper.min.js"></script>
    <script nonce="{{ csp_nonce() }}" src="/assets/plugins/bootstrap/js/bootstrap.min.js"></script>  

    <!-- Charts JS -->
    <!--<script src="/assets/plugins/chart.js/chart.min.js"></script> 
    <script src="/assets/js/index-charts.js"></script> -->
    
    <!-- Page Specific JS -->
    <script nonce="{{ csp_nonce() }}" src="/assets/js/app.js"></script> 
    <script nonce="{{ csp_nonce() }}" defer src="/js/bootstrap-util.min.js"></script>

@show

</body>
</html> 

