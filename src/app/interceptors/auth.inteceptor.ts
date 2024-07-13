import { HttpInterceptorFn } from "@angular/common/http";

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token') ?? ''
        request = request.clone({
            setHeaders: {
                Authorization: token ? `Token ${token}` : ''
            }
        })
    }
    return next(request)
}