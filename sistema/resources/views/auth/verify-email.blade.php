<x-guest-layout>
    <div class="mb-4 text-sm text-gray-600">
        {{ __('Obrigado por se escrever! Antes de começar, você poderia verificar seu endereço de email para clicar no link de email enviado a você? Se você não recebeu o email, nós vamos alegremente te enviar outro.') }}
    </div>

    @if (session('status') == 'verification-link-sent')
        <div class="mb-4 font-medium text-sm text-green-600">
            {{ __('Um novo link de verificação foi enviado para o email que você forneceu durante o cadastro.') }}
        </div>
    @endif

    <div class="auth-form-container text-left">
        <form method="POST" action="{{ route('verification.send') }}">
            @csrf

            <div>
                <x-button class="btn app-btn-primary btn-block theme-btn mx-auto">
                    {{ __('Reenviar email de verificação') }}
                </x-button>
            </div>
        </form>

        <form method="POST" action="{{ route('logout') }}">
            @csrf

            <button type="submit" class="underline text-sm text-gray-600 hover:text-gray-900">
                {{ __('Log Out') }}
            </button>
        </form>
    </div>
</x-guest-layout>
