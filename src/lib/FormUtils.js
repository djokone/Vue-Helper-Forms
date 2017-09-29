import helpersInput from '@/helpersInput'
import helpersForm from '@/HelpersForm'
import { isEmpty, forEach } from 'lodash'

// Lunch the recursive while in the component object for dispatching
// Put container to false to get just the childrens
let dispatchRoot = function (obj, create, input = obj, container = true) {
  let childrens = []
  // When inputs is inject in inputs
  if (typeof input.inputs !== 'undefined') {
    input.inputs.forEach((inp, key) => {
      if (dispatch(obj, create, inp)) {
        childrens.push(dispatch(obj, create, inp))
      }
    })
  }
  // When gots forms
  if (typeof input.forms !== 'undefined') {
    input.forms.forEach((inp, key) => {
      if (dispatch(obj, create, inp)) {
        childrens.push(dispatch(obj, create, inp, key))
      }
    })
  }

  if (obj.root && container) { //  If is root and need a container, then create the uniq root container
    return createRootContainer(obj, create, createFormContainer(obj, create, childrens))
  } else if (container) { //  If is a recursive root dispatch
    return createFormContainer(obj, create, childrens)
  } else if (!isEmpty(childrens)) { //  If there are childrens
    return childrens
  } else {
    return false
  }
}

// Lunch the right function in a while
let dispatch = function (obj, create, input, key = false) {
  let toReturn
  if (obj.getType(input) === 'form') {
    toReturn = createHelperForm(obj, create, input)
    if (obj.grouped(input)) {
      let Forms = []
      if (obj.getNew(input)) {
        if (obj.parent === key) {
          // console.log(input)
          let newForm = createHelperForm(obj, create, input)
          Forms.push(create('div', {
            'class': 'add ' + obj.getName(input)
          }, [newForm]))
        }
      }
      if (obj.getName(input) && !isEmpty(obj.localData[obj.getName(input)])) {
        forEach(obj.localData[obj.getName(input)], (value, key) => {
          Forms.push(createHelperForm(obj, create, input, key))
        })
      }
      // forEach(input.localData[key], (v, k) => {
      //   Forms.push(createHelperForm(obj, create, input))
      //   // console.log(v)
      //   // console.log(k)
      // })
      toReturn = create('div', {
        'class': 'multiforms ' + obj.getName(input)
      }, Forms)
      // console.log(toReturn)
    }
  } else if (obj.getType(input) === 'groupe') {
    toReturn = createGroupContainer(obj, create, input)
  } else {
    toReturn = createInput(obj, create, input)
  }
  return toReturn
}

// create a custom input
let createInput = function (obj, create, input) {
  if (obj.grouped(input)) {
    // console.log(obj.getValue(input))
  }
  let props = {
    label: obj.getLabel(input),
    name: obj.getName(input),
    type: obj.getType(input),
    placeholder: obj.getPlaceholder(input),
    value: obj.getValue(input)
  }

  if (input.options) {
    props['options'] = input.options
  }
  if (input.component) {
    props['component'] = input.component
  }
  let on = {
    input: obj.upInput
  }
  // console.log(props)
  return create(
    helpersInput,
    {
      'class': [input.class],
      on,
      props: props
    }
  )
}

// Create a new helper form inside a helper form
let createHelperForm = function (obj, create, input, key = false) {
  let props = {}
  let on = {}
  if (obj.hasForms(input) && obj.getType(input)) {
    props = {
      inputs: input.forms,
      root: false,
      cle: key,
      name: input.name,
      hasToBeGrouped: obj.hasToBeGroup(input)
    }
  }
  if (!obj.name) {
    props['parent'] = 'root'
  } else {
    props['parent'] = obj.name
  }
  if (key !== false) {
    props['data'] = obj.getValue(input)[key]
  }
  return create(
    helpersForm,
    {
      props,
      on
    }
  )
}

let createGroupContainer = function (obj, create, input, childrens) {
  childrens = childrens || []
  let classes = []
  let classe = input.class ? input.class : ''
  classes.push(classe)
  let getRoot = dispatchRoot(obj, create, input, false)
  if (getRoot) {
    // console.log(getRoot)
    childrens = getRoot
  }
  return create(
    'div',
    {
      'class': [classes]
    },
    childrens
  )
}

let createFormContainer = function (obj, create, childrens) {
  return create(
    'form',
    {
      'class': ['forms']
    },
    childrens
  )
}

// Create a root container
let createRootContainer = function (obj, create, childrens) {
  let vnodeArray = []
  vnodeArray.push(childrens)
  return create(
    obj.tag, {
    },
    vnodeArray
  )
}

export default dispatchRoot
