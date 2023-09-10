import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';

export type ContactT = {
	id: string;
	first?: string;
	last?: string;
	favorite?: boolean;
	createdAt: number;
	avatar?: string;
	twitter?: string;
	notes?: string;
}

export async function getContacts(query?: string|null) {
	await fakeNetwork(`getContacts:${query}`);
	let contacts: ContactT[] | null = await localforage.getItem(
		'contacts'
	);
	if (!contacts) contacts = [];
	if (query) {
		contacts = matchSorter(contacts, query, { keys: ['first', 'last'] });
	}
	return contacts.sort(sortBy('last', 'createdAt'));
}

export async function createContact() {
	await fakeNetwork();
	const id = Math.random().toString(36).substring(2, 9);
	const contact = { id, createdAt: Date.now() };
	const contacts = await getContacts();
	contacts.unshift(contact);
	await set(contacts);
	return contact;
}

export async function getContact(id:string|undefined) {
	if (!id) throw new Error(`No id provided`);
	await fakeNetwork(`contact:${id}`);
	const contacts:ContactT[] | null = await localforage.getItem('contacts');
	const contact = contacts && contacts.find((contact) => contact.id === id);
	return contact ?? null;
}

export async function updateContact(id:string|undefined, updates:Partial<ContactT>) {
	if (!id) throw new Error(`No id provided`);
	await fakeNetwork();
	const contacts:ContactT[] | null = await localforage.getItem('contacts');
	const contact = contacts &&  contacts.find((contact) => contact.id === id);
	if (!contact) throw new Error(`No contact found for ${id})`)
	Object.assign(contact, updates);
	await set(contacts);
	return contact;
}

export async function deleteContact(id:string|undefined) {
	const contacts :ContactT[] | null = await localforage.getItem('contacts');
	const index = contacts ? contacts.findIndex((contact:ContactT) => contact.id === id):-1;
	if (index > -1 && contacts) {
		contacts.splice(index, 1);
		await set(contacts);
		return true;
	}
	return false;
}

function set(contacts:ContactT[]) {
	return localforage.setItem('contacts', contacts);
}
type fakeCacheT = {
	[key:string]: boolean;
}
// fake a cache so we don't slow down stuff we've already seen
let fakeCache:fakeCacheT = {};

async function fakeNetwork(key?:string) {
	// TODO add types for the fakeCache

	if (!key) {
		fakeCache= {};
	}

	if (key && fakeCache[key]) {
		return;
	}

	key ? fakeCache[key] = true : null;
	return new Promise((res) => {
		setTimeout(res, Math.random() * 800);
	});
}
