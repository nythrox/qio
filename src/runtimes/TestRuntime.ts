/**
 * Created by tushar on 2019-05-24
 */

import {testScheduler} from 'ts-scheduler/test'

import {Exit} from '../main/Exit'
import {FIO, IO} from '../main/FIO'

import {BaseRuntime} from './BaseRuntime'

export class TestRuntime extends BaseRuntime {
  public readonly scheduler = testScheduler()

  public executeSync<E, A>(io: IO<E, A>): A | E | undefined {
    const result = this.exit(io)
    this.scheduler.run()
    switch (result[0]) {
      case Exit.Failure:
      case Exit.Success:
        return result[1]
      default:
        return undefined
    }
  }

  public exit<E, A>(io: FIO<E, A>): Exit<E, A> {
    let result: Exit<E, A> = Exit.pending
    this.execute(
      io,
      _ => (result = Exit.success(_)),
      _ => (result = Exit.failure(_))
    )
    this.scheduler.run()

    return result
  }
}

export const testRuntime = () => new TestRuntime()
