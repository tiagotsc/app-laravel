<x-guest-layout>

        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <div class="auth-form-container text-left">
						
            <form class="auth-form resetpass-form" method="POST" action="{{ route('password.update') }}">   
                @csrf             

                <!-- Password Reset Token -->
                <input type="hidden" name="token" value="{{ $request->route('token') }}">
                
                <div class="email mb-3">
                    <label for="email">Seu email</label>
                    <input id="email" name="email" type="email" class="form-control login-email" placeholder="Seu email" :value="old('email', $request->email)" required autofocus>
                </div><!--//form-group-->

                <!-- Password -->
                <div class="mt-4">
                    <x-label for="password" :value="__('Nova senha')" />

                    <x-input id="password" class="form-control mt-1 w-full" type="password" name="password" required />
                </div>

                <!-- Confirm Password -->
                <div class="mt-4">
                    <x-label for="password_confirmation" :value="__('Repita nova senha')" />

                    <x-input id="password_confirmation" class="form-control mt-1 w-full"
                                        type="password"
                                        name="password_confirmation" required />
                </div>

                <div class="text-center mt-3">
                    <button type="submit" class="btn app-btn-primary w-100 theme-btn mx-auto"> {{ __('Alterar senha') }}</button>
                </div>
            </form>
            
            <div class="auth-option text-center pt-5"><a class="app-link" href="{{ route('login') }}" >Login in</a><!-- <span class="px-2">|</span> <a class="app-link" href="login.html" >Sign up</a>--></div>
        </div><!--//auth-form-container-->
</x-guest-layout>
