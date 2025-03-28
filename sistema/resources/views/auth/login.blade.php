<x-guest-layout>
        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" />

        <!-- Validation Errors -->
        <!--<x-auth-validation-errors class="mb-4" :errors="$errors" />-->

        @if(count($errors) > 0)
            <div class="alert alert-danger" role="alert">
                <b>Sinto muito!</b> Dados incorretos! 
            </div>
        @endif

        <form class="auth-form login-form" method="POST" action="{{ route('login') }}"> 
            @csrf        
            <div class="email mb-3">
                <label class="sr-only" for="username" :value="__('username')">Username</label>
                <input id="username" name="username" type="username" class="form-control signin-email" placeholder="login" required="required" :value="old('username')">
            </div><!--//form-group-->
            <div class="password mb-3">
                <label class="sr-only" for="password" :value="__('Password')">Password</label>
                <input id="password" name="password" type="password" class="form-control signin-password" placeholder="senha" required="required" autocomplete="current-password">
                <div class="extra mt-3 row justify-content-between">
                    <div class="col-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="remember_me" name="remember">
                            <label class="form-check-label" for="remember_me">
                                {{ __('Remember me') }}
                            </label>
                        </div>
                    </div><!--//col-6-->
                    <div class="col-6">
                        @if (Route::has('password.request'))
                        <div class="forgot-password text-end">
                            <a href="{{ route('password.request') }}">{{ __('Esqueceu sua senha?') }}</a>
                        </div>
                        @endif
                    </div><!--//col-6-->
                </div><!--//extra-->
            </div><!--//form-group-->
            <div class="text-center">
                <button type="submit" class="btn app-btn-primary w-100 theme-btn mx-auto"> {{ __('Log in') }}</button>
            </div>
        </form>
</x-guest-layout>
