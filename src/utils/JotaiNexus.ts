/* eslint-disable @typescript-eslint/no-explicit-any */
import { Atom, Getter, Setter, WritableAtom } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
import { useEffect } from 'react'

type Awaitable<T> = T | PromiseLike<T>

type SafeWriteGetter = {
	<Value>(atom: Atom<Value | Promise<Value>>): Awaitable<Value>
	<Value>(atom: Atom<Promise<Value>>): Awaitable<Value>
	<Value>(atom: Atom<Value>): Awaitable<Awaited<Value>>
}

type Callback<Result, Arg> = undefined extends Arg
	? (arg?: Arg) => Result
	: (arg: Arg) => Result

export function useAtomCallbackSafe<Result, Arg>(
	callback: (get: SafeWriteGetter, set: Setter, arg: Arg) => Promise<Result>,
	scope?: any
): Callback<Promise<Result>, Arg> {
	return useAtomCallback(
		(get, set, arg) =>
			callback((atom) => get(atom, { unstable_promise: true }), set, arg),
		scope
	)
}

let _get!: Getter
let _set!: Setter

const JotaiNexus = () => {
	const initReader = useAtomCallbackSafe(async (get, set) => {
		_get = get
		_set = set
	})

	useEffect(() => {
		(async () => {
			await initReader()
		})()
	}, [initReader])

	return null
}

export default JotaiNexus

export const readAtom = <A extends Atom<any>>(
	a: A
): A extends Atom<infer Data> ? Data : never => _get(a)

export const writeAtom = <A extends WritableAtom<any, any>>(
	a: A,
	update: A extends WritableAtom<any, infer Update> ? Update : never
) => a.write(_get, _set, update)
