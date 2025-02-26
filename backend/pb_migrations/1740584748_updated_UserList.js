/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4223603992")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_Py7d0lwlbD` ON `UserList` (`user`)"
    ]
  }, collection)

  // remove field
  collection.fields.removeById("text2809058197")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation2375276105",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4223603992")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_Py7d0lwlbD` ON `UserList` (`user_id`)"
    ]
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2809058197",
    "max": 0,
    "min": 0,
    "name": "user_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("relation2375276105")

  return app.save(collection)
})
