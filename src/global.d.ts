/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="svelte" />

import 'dexie';
import { Subscriber, Unsubscriber } from 'svelte/store';

declare module 'dexie' {
	interface Observable<T> {
		subscribe(run: Subscriber<T>): Unsubscriber | Subscription;
	}
}
