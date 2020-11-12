// {
//     "$schema": "http://json-schema.org/draft-06/schema",
//     "$id": "http://example.com/example.json",
//     "type": "array",
//     "title": "The root schema",
//     "description": "The root schema comprises the entire JSON document.",
//     "default": [],
//     "examples": [
//         [
//             {
//                 "empId": "jLY6r1",
//                 "email": "samridhikots@gmail.com",
//                 "password": "suYbeW",
//                 "name": "Samridhi Kotnala",
//                 "designation": "Manager",
//                 "image": "",
//                 "department": "IT",
//                 "type": "Employee",
//                 "basicSalary": "10000",
//                 "montlyGoal": "",
//                 "addOn": "",
//                 "deduction": "",
//                 "oId": "4EPj9o"
//             }
//         ]
//     ],
//     "additionalItems": true,
//     "items": {
//         "$id": "#/items",
//         "anyOf": [
//             {
//                 "$id": "#/items/anyOf/0",
//                 "type": "object",
//                 "title": "The first anyOf schema",
//                 "description": "An explanation about the purpose of this instance.",
//                 "default": {},
//                 "examples": [
//                     {
//                         "empId": "jLY6r1",
//                         "email": "samridhikots@gmail.com",
//                         "password": "suYbeW",
//                         "name": "Samridhi Kotnala",
//                         "designation": "Manager",
//                         "image": "",
//                         "department": "IT",
//                         "type": "Employee",
//                         "basicSalary": "10000",
//                         "montlyGoal": "",
//                         "addOn": "",
//                         "deduction": "",
//                         "oId": "4EPj9o"
//                     }
//                 ],
//                 "required": [
//                     "empId",
//                     "email",
//                     "password",
//                     "name",
//                     "designation",
//                     "image",
//                     "department",
//                     "type",
//                     "basicSalary",
//                     "montlyGoal",
//                     "addOn",
//                     "deduction",
//                     "oId"
//                 ],
//                 "properties": {
//                     "empId": {
//                         "$id": "#/items/anyOf/0/properties/empId",
//                         "type": "string",
//                         "title": "The empId schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             "jLY6r1"
//                         ]
//                     },
//                     "email": {
//                         "$id": "#/items/anyOf/0/properties/email",
//                         "type": "string",
//                         "title": "The email schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             "samridhikots@gmail.com"
//                         ]
//                     },
//                     "password": {
//                         "$id": "#/items/anyOf/0/properties/password",
//                         "type": "string",
//                         "title": "The password schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             "suYbeW"
//                         ]
//                     },
//                     "name": {
//                         "$id": "#/items/anyOf/0/properties/name",
//                         "type": "string",
//                         "title": "The name schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             "Samridhi Kotnala"
//                         ]
//                     },
//                     "designation": {
//                         "$id": "#/items/anyOf/0/properties/designation",
//                         "type": "string",
//                         "title": "The designation schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             "Manager"
//                         ]
//                     },
//                     "image": {
//                         "$id": "#/items/anyOf/0/properties/image",
//                         "type": "string",
//                         "title": "The image schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             ""
//                         ]
//                     },
//                     "department": {
//                         "$id": "#/items/anyOf/0/properties/department",
//                         "type": "string",
//                         "title": "The department schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             "IT"
//                         ]
//                     },
//                     "type": {
//                         "$id": "#/items/anyOf/0/properties/type",
//                         "type": "string",
//                         "title": "The type schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             "Employee"
//                         ]
//                     },
//                     "basicSalary": {
//                         "$id": "#/items/anyOf/0/properties/basicSalary",
//                         "type": "string",
//                         "title": "The basicSalary schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             "10000"
//                         ]
//                     },
//                     "montlyGoal": {
//                         "$id": "#/items/anyOf/0/properties/montlyGoal",
//                         "type": "string",
//                         "title": "The montlyGoal schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             ""
//                         ]
//                     },
//                     "addOn": {
//                         "$id": "#/items/anyOf/0/properties/addOn",
//                         "type": "string",
//                         "title": "The addOn schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             ""
//                         ]
//                     },
//                     "deduction": {
//                         "$id": "#/items/anyOf/0/properties/deduction",
//                         "type": "string",
//                         "title": "The deduction schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             ""
//                         ]
//                     },
//                     "oId": {
//                         "$id": "#/items/anyOf/0/properties/oId",
//                         "type": "string",
//                         "title": "The oId schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             "4EPj9o"
//                         ]
//                     }
//                 },
//                 "additionalProperties": false
//             }
//         ]
//     }
// }