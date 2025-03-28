<x-guest-layout>
    <h2 class="auth-heading text-center mb-4">Esqueceu sua senha?</h2>
    <div class="auth-intro mb-4 text-center">
        Entre com seu endereço de email abaixo. Nós vamos enviar um email com um link para uma página aonde você poderá redefinir a sua senha.
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <!-- Validation Errors -->
    <!--<x-auth-validation-errors class="mb-4" :errors="$errors" />-->
    @if(count($errors) > 0)
        <div class="alert alert-danger" role="alert">
            <b>Sinto muito!</b> E-mail não localizado! 
        </div>
    @endif

    <div class="auth-form-container text-left">
                    
        <form class="auth-form resetpass-form" method="POST" action="{{ route('password.email') }}">   
            @csrf             
            <div class="email mb-3">
                <label class="sr-only" for="email">Seu email</label>
                <input id="email" name="email" type="email" class="form-control login-email" placeholder="Seu email" :value="old('email')" required autofocus>
            </div><!--//form-group-->
            <div class="text-center">
                <button type="submit" class="btn app-btn-primary btn-block theme-btn mx-auto">Gerar link redefinir senha</button>
            </div>
        </form>
        
        <div class="auth-option text-center pt-5"><a class="app-link" href="{{ route('login') }}" >Log in</a><!-- <span class="px-2">|</span> <a class="app-link" href="login.html" >Sign up</a>--></div>
    </div><!--//auth-form-container-->
</x-guest-layout>
