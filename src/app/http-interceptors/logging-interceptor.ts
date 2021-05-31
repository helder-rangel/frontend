import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { finalize, tap } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now()
    let ok: string
    console.log('====== req ', req)
    console.log('====== next ', next)
    // extend server response observable with logging
    return next.handle(req).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        // Operation failed; error is an HttpErrorResponse
        (error) => (ok = 'failed')
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started
        const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`
        console.log('====== msg ', msg)
        // this.messenger.add(msg)
      })
    )
  }
}