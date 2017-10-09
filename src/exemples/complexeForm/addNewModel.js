export default [
  {
    type: 'group',
    class: 'cont6',
    inputs: [
      {
        type: 'group',
        class: 'contRec',
        inputs: [
          {
            type: 'group',
            class: 'r',
            inputs: [
              {
                label: 'Nom du modèle :',
                name: 'name',
                placeholder: 'Petit blender',
                classes: 'col4'
              }
            ]
          }
        ]
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
    type: 'groupe',
    class: 'cont6',
    inputs: [
      {
        label: 'Poids :',
        name: 'poids',
        placeholder: '5 kg',
        class: 'col2'
      },
      {
        label: 'Puissance :',
        name: 'puissance',
        placeholder: '2,6 kW',
        class: 'col2'
      },
      {
        label: 'Capacité',
        name: 'capacite',
        placeholder: '200 L',
        class: 'col2'
      }
    ]
  },
  {
    type: 'groupe',
    class: 'cont6',
    inputs: [
      {
        label: 'Dimension :',
        name: 'dimension',
        placeholder: 'L x P x H',
        class: 'col4'
      },
      {
        label: 'Prix :',
        name: 'prix',
        placeholder: '140 €',
        class: 'col2'
      }
    ]
  },
  {
    label: 'Description :',
    name: 'info',
    type: 'textarea',
    class: 'col4'
  },
  {
    label: 'Ajouter',
    behavior: 'add',
    class: ['super'],
    type: 'btn'
  },
  {
    name: 'piecesDetache',
    forms: [
      {
        name: 'name',
        label: 'Nom pièce détaché :'
      },
      {
        name: 'ref',
        label: 'Reference pièce'
      },
      {
        label: 'Ajouter',
        behavior: 'add',
        class: ['super'],
        type: 'btn'
      },
      {
        name: 'pieces',
        forms: [
          {
            name: 'name',
            label: 'Nom piece : '
          },
          {
            name: 'type',
            label: 'Type de piece : '
          },
          {
            label: 'Ajouter',
            behavior: 'add',
            class: ['super'],
            type: 'btn'
          }
        ]
      },
      {
        label: 'Supprimer modèle',
        behavior: 'del',
        class: ['super'],
        type: 'btn'
      }
    ]
  },
  {
    label: 'Supprimer',
    behavior: ['del'],
    class: ['del'],
    type: 'btn'
  }
]
