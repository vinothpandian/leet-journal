import { readable, writable } from 'svelte/store';

export const modalId = readable<string>('daisy-modal');

interface IModalInfo {
	title: string;
	message: string;
}

interface IModalAction {
	text: string;
	callback: VoidFunction;
}

const INITIAL_MODAL_INFO: IModalInfo = {
	title: '',
	message: '',
};

const INITIAL_MODAL_ACTION: IModalAction = {
	text: '',
	callback: () => undefined,
};

export const isModalOpen = writable<boolean>(false);

export const modalInfo = writable<IModalInfo>(INITIAL_MODAL_INFO);

export const modalAction = writable<IModalAction>(INITIAL_MODAL_ACTION);

export const closeModal = () => {
	modalInfo.set(INITIAL_MODAL_INFO);
	modalAction.set(INITIAL_MODAL_ACTION);

	isModalOpen.set(false);
};
