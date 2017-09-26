import modelTable from './addNewModel'

export default [
  {
    name: 'col2',
    type: 'groupe',
    class: 'cont6',
    inputs: [
      {
        label: 'Nom produit :',
        name: 'name',
        type: 'hidden',
        class: 'col4'
        // placeholder: 'Doe'
      },
      {
        label: 'Référence :',
        name: 'ref',
        placeholder: 'WSB XXX E',
        class: 'col2'
      }
    ]
  },
  {
    label: 'Nom de l\'url :',
    name: 'slug',
    placeholder: 'super-produit',
    class: 'col3'
  },
  {
    name: 'col2',
    type: 'groupe',
    groupeClass: 'cont6',
    inputs: [
      {
        label: 'Poids :',
        name: 'poids',
        placeholder: '14 kg',
        class: 'col2'
      },
      {
        label: 'Puissance :',
        name: 'puissance',
        class: 'col2',
        placeholder: '2,4 kW'
      },
      {
        label: 'Capacité :',
        name: 'capacite',
        placeholder: '25 L',
        class: 'col2'
      }
    ]
  },
  {
    name: 'col2',
    type: 'groupe',
    class: 'cont6',
    inputs: [
      {
        label: 'Les dimensions :',
        name: 'dimension',
        placeholder: '120 x 120 x 120',
        class: 'col4'
      },
      {
        label: 'Prix :',
        name: 'prix',
        class: 'col2'
      }
    ]
  },
  {
    label: 'Description',
    name: 'info',
    type: 'tinymce'
  },
  {
    label: 'Modèles',
    name: 'sousproduits',
    btns: ['Supprimer'],
    forms: modelTable
    //   {
    //     label: 'Nom du modèle :',
    //     name: 'name'
    //   },
    //   {
    //     label: 'Référence :',
    //     name: 'ref'
    //   },
    //   {
    //     label: 'Poids :',
    //     name: 'poids'
    //   },
    //   {
    //     label: 'Puissance :',
    //     name: 'puissance'
    //   },
    //   {
    //     label: 'Prix :',
    //     name: 'prix'
    //   },
    //   {
    //     label: 'Description :',
    //     name: 'info',
    //     type: 'textarea'
    //   }
    // ]
  }
]
