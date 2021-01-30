import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollPaginationService {

  constructor() {}

	public listener(element?: HTMLElement, invertScroll?: boolean): Observable<any> {
		const subject = new Subject<any>();
		if (element) {
			element.addEventListener('scroll', () => {
				const scrollTop = element.scrollTop;
				const scrollHeight = element.scrollHeight;
				const offsetHeight = element.offsetHeight;
				const contentHeight = scrollHeight - offsetHeight;
				if ((!invertScroll && scrollTop > contentHeight * .7) || (invertScroll && scrollTop < contentHeight * .3)) {
					subject.next();
				}
			});
		} else {
			window.addEventListener('scroll', () => {
				const height = document.documentElement.scrollHeight - window.innerHeight;
				if ((!invertScroll && window.scrollY > height * .7) || (invertScroll && window.scrollY > height * .3)) {
					subject.next();
				}
			});
		}
		return subject.asObservable();
	}

	public bodyScroll(value: boolean): void {
		if (value) {
			document.documentElement.classList.remove('cdk-global-scrollblock');
		} else {
			document.documentElement.classList.add('cdk-global-scrollblock');
		}
	}
}
