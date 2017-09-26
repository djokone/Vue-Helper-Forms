
let inputDispatcher = function (obj, create, children) {
  let vnodeArray = []
  vnodeArray.push(createLabel(obj, create))
  vnodeArray.push(createInput(obj, create))
  return createInputContainer(obj, create, vnodeArray)
}
let createLabel = function (obj, create) {
  return create('label',
    {
      attrs: {
        for: obj.name
      },
      domProps: {
        innerHTML: obj.label
      }
    }
  )
}

let createInput = function (obj, create) {
  return create('input',
    {
      attrs: {
        id: obj.name,
        type: obj.type,
        placeholder: obj.placeholder
      }
    }
  )
}
let createInputContainer = function (obj, create, childrens) {
  return create('div',
    {
      'class': {
        input: true
      }
    },
    childrens
  )
}

export default inputDispatcher
