import {Cancel} from 'ts-scheduler'

import {CB} from '../internals/CB'
import {FIO} from '../internals/FIO'

/**
 * @ignore
 */
export class Race<R1, R2, E1, E2, A1, A2>
  implements FIO<R1 & R2, E1 | E2, A1 | A2> {
  public constructor(
    private readonly a: FIO<R1, E1, A1>,
    private readonly b: FIO<R2, E2, A2>
  ) {}

  public fork(env: R1 & R2, rej: CB<E1 | E2>, res: CB<A1 | A2>): Cancel {
    const cancel = new Array<Cancel>()
    const onResponse = <T>(cancelID: number, cb: CB<T>) => (t: T) => {
      cancel[cancelID]()
      cb(t)
    }
    cancel.push(
      this.a.fork(env, onResponse(1, rej), onResponse(1, res)),
      this.b.fork(env, onResponse(0, rej), onResponse(0, res))
    )

    return () => cancel.forEach(i => i())
  }
}
