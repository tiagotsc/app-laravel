<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * Define informações para configurar a segurança do cabeçalho
 */
class SecurityHeadersMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Content Security Policy
        // $response->headers->set('Content-Security-Policy', "default-src 'self';");

        // X-Frame-Options
        // $response->headers->set('X-Frame-Options', 'DENY');

        // X-XSS-Protection
        // $response->headers->set('X-XSS-Protection', '1; mode=block');

        // X-Content-Type-Options
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Referrer Policy
        // $response->headers->set('Referrer-Policy', 'no-referrer');

        return $response;
        // return $next($request);
    }
}
