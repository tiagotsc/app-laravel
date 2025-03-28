<x-guest-layout>
    <div class="mb-4 text-sm text-gray-600">
        {{ __('Essa é uma área segura da aplicação. Por favor, confirme a senha antes de continuar.') }}
    </div>

    <!-- Validation Errors -->
    <x-auth-validation-errors class="mb-4" :errors="$errors" />

    <div class="auth-form-container text-left">
        <form class="auth-form resetpass-form" method="POST" action="{{ route('password.confirm') }}">   
            @csrf             

            <!-- Password -->
            <div class="mt-4">
                <x-label for="password" :value="__('Senha')" />

                <x-input id="password" class="form-control mt-1 w-full" type="password" name="password" required autocomplete="current-password" />
            </div>

            <div class="text-center mt-3">
                <button type="submit" class="btn app-btn-primary btn-block theme-btn mx-auto"> {{ __('Confirmar') }}</button>
            </div>
        </form>
    </div>
</x-guest-layout>
