export default [
  {
    name: 'name',
    type: 'groupe',
    groupeClass: 'cont6',
    inputs: [
      {
        label: 'Nom du modèle :',
        name: 'name',
        placeholder: 'Petit blender',
        classes: 'col4'
      },
      {
        label: 'Référence :',
        name: 'ref',
        placeholder: 'BB180PE',
        classes: 'col2 last'
      }
    ]
  },
  {
    name: 'number',
    type: 'groupe',
    groupeClass: 'cont6',
    inputs: [
      {
        label: 'Poids :',
        name: 'poids',
        placeholder: '5 kg',
        classes: 'col2'
      },
      {
        label: 'Puissance :',
        name: 'puissance',
        placeholder: '2,6 kW',
        classes: 'col2'
      },
      {
        label: 'Capacité',
        name: 'capacite',
        placeholder: '200 L',
        classes: 'col2'
      }
    ]
  },
  {
    name: 'number',
    type: 'groupe',
    groupeClass: 'cont6',
    inputs: [
      {
        label: 'Dimension :',
        name: 'dimension',
        placeholder: 'L x P x H',
        classes: 'col4'
      },
      {
        label: 'Prix :',
        name: 'prix',
        placeholder: '140 €',
        classes: 'col2'
      }
    ]
  },
  {
    label: 'Description :',
    name: 'info',
    type: 'textarea',
    classes: 'col4'
  }
]
