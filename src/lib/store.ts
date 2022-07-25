// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';
import type { Question } from './types';

export const writableArray = writable<Question[]>([]);
