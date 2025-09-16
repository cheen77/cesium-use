import * as Cesium from 'cesium'
import { describe, expect, it } from 'vitest'
import { effectScope } from 'vue'
import { useEntityCollection } from '.'

describe('useEntityCollection', () => {
  it('should work', () => {
    const scope = effectScope()
    const entities = new Cesium.EntityCollection()

    scope.run(() => {
      const collection = useEntityCollection(entities)
      const e = collection.add({})
      expect(entities.contains(e)).toBe(true)

      expect(entities.values.length).toBe(1)
    })

    scope.stop()

    expect(entities.values.length).toBe(0)
  })

  it('should be dispose when scope stop', async () => {
    const scope = effectScope()
    const entities = new Cesium.EntityCollection()

    let p: Promise<any> = Promise.resolve()

    scope.run(() => {
      const collection = useEntityCollection(entities)
      p = sleep(100).then(() => collection.add({}))
    })
    scope.stop()

    await p
    expect(entities.values.length).toBe(0)
  })
})

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}
