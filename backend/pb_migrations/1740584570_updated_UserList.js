/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4223603992")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_Py7d0lwlbD` ON `UserList` (`user_id`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4223603992")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
