import modelTable from './addNewModel'
import tinymce from '@/tinymce'

export default [
  {
    name: 'prout',
    grouped: false,
    type: 'groupe',
    class: 'cont6',
    inputs: [
      {
        label: 'Nom produit :',
        name: 'name',
        value: 'coucou',
        // type: 'hidden',
        class: 'col4',
        placeholder: 'Doe'
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
    label: 'Catégories :',
    name: 'slug',
    default: 45,
    class: 'col3',
    options: {
      'Cuisson': {
        45: 'friteuse',
        46: 'grille'
      },
      'Préparation': {
        48: 'Blender',
        49: 'Mixeur'
      }
    }
  },
  {
    type: 'groupe',
    class: 'cont6',
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
        label: 'Prix (€) :',
        name: 'prix',
        type: 'Number',
        placeholder: '1000€',
        class: 'col2'
      }
    ]
  },
  {
    label: 'Description',
    name: 'info',
    component: tinymce,
    type: 'tinymce'
  },
  {
    label: 'Modèles',
    name: 'sousproduits',
    btns: ['Supprimer'],
    forms: modelTable
  }
]
