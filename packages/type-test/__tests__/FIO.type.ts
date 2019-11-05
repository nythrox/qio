/**
 * Created by tushar on 2019-04-24
 */

import {defaultRuntime, QIO} from '@qio/core'

//#region ASYNC
// $ExpectType QIO<never, never, unknown>
QIO.asyncIO((res, rej) => res(10))

// $ExpectType QIO<never, never, unknown>
QIO.asyncIO((res, rej, runtime) => runtime.delay(() => {}, 10))

// $ExpectType QIO<never, never, unknown>
QIO.asyncIO((res, rej) => res(10))

// $ExpectType QIO<string, never, unknown>
QIO.asyncIO<string>((res, rej) => ({cancel: () => {}}))
//#endregion

//#region Operators
// $ExpectType QIO<number, never, unknown>
QIO.of(1000)

// $ExpectType QIO<never, number, unknown>
QIO.reject(1000)

// $ExpectType QIO<number, never, unknown>
QIO.reject(1000).catch(() => QIO.of(10))

// $ExpectType QIO<number, never, unknown>
QIO.encase((a: string, b: number) => parseInt(a, 10) + b)('10', 2)

// $ExpectType QIO<number, never, unknown>
QIO.reject(new Error('!!!')).catch(() => QIO.of(10))

// $ExpectType QIO<string | number, never, unknown>
QIO.of('OLA').catch(() => QIO.of(10))

// $ExpectType QIO<number, never, unknown>
QIO.never().catch(() => QIO.of(10))

// $ExpectType QIO<number, never, unknown>
QIO.of(100).catch(() => QIO.never())

// $ExpectType QIO<string | number, never, unknown>
QIO.of(1000).catch(() => QIO.of('HI'))

// $ExpectType QIO<number, never, unknown>
QIO.of(10).chain(_ => QIO.of(_))
//#endregion

//#region ZIP
// $ExpectType QIO<[never, number], never, unknown>
QIO.never().zip(QIO.of(10))

// $ExpectType QIO<[never, never], never, unknown>
QIO.never().zip(QIO.never())

// $ExpectType QIO<[number, Date], never, unknown>
QIO.of(1000).zip(QIO.of(new Date()))

// $ExpectType QIO<[number, Date], never, unknown>
QIO.of(1000).zip(QIO.of(new Date()))
//#endregion

//#region Environment Merge
interface IE1 {
  e: 'e1'
}
interface IE2 {
  e: 'e2'
}
declare const a: QIO<
  number,
  IE1,
  {
    console: Console
  }
>
declare const b: QIO<
  string,
  IE2,
  {
    process: NodeJS.Process
  }
>
// $ExpectType QIO<string, IE1 | IE2, { console: Console; } & { process: Process; }>
a.chain(() => b)
//#endregion

// $ExpectType QIO<number, never, unknown>
QIO.never().map(_ => 10)

// $ExpectType QIO<never, never, unknown>
QIO.of(10).chain(QIO.never)

// $ExpectType QIO<[number, never], never, unknown>
QIO.of(10).zip(QIO.never())

// $ExpectType QIO<[never, number], never, unknown>
QIO.never().zip(QIO.of(10))

// $ExpectType QIO<number, never, unknown>
QIO.never().zipWith(QIO.of(10), (a, b) => 10)

// $ExpectType QIO<number, never, unknown>
QIO.never().zipWithPar(QIO.of(10), (a, b) => 10)

// $ExpectType QIO<void, never, unknown>
QIO.never().raceWith(QIO.of(10), QIO.void, QIO.void)

// $ExpectError Argument of type 'QIO<number, never, string>' is not assignable to parameter of type 'QIO<number, never, unknown>'.
defaultRuntime().unsafeExecute(QIO.access((_: string) => _.length))
