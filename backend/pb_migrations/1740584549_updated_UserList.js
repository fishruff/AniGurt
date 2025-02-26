/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4223603992")

  // remove field
  collection.fields.removeById("number1705183361")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4223603992")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number1705183361",
    "max": null,
    "min": null,
    "name": "user_list_id",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
