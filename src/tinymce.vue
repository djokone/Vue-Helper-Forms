<style link="/tinymce/skins/lightgray/skin.min.css"></style>
<style link="/tinymce/skins/lightgray/content.min.css" ></style>
<template>
  <div class="mytinymce">
    <textarea v-model="content" :id="'tinymce'+id">
    </textarea>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/modern/theme'

  import 'tinymce/plugins/paste/plugin'
  import 'tinymce/plugins/link/plugin'
  import 'tinymce/plugins/autoresize/plugin'
  import 'tinymce/plugins/advlist/plugin'
  import 'tinymce/plugins/autolink/plugin'
  import 'tinymce/plugins/lists/plugin'
  import 'tinymce/plugins/image/plugin'
  import 'tinymce/plugins/charmap/plugin'
  import 'tinymce/plugins/print/plugin'
  import 'tinymce/plugins/preview/plugin'
  import 'tinymce/plugins/anchor/plugin'
  import 'tinymce/plugins/searchreplace/plugin'
  import 'tinymce/plugins/visualblocks/plugin'
  import 'tinymce/plugins/code/plugin'
  import 'tinymce/plugins/fullscreen/plugin'
  import 'tinymce/plugins/insertdatetime/plugin'
  import 'tinymce/plugins/media/plugin'
  import 'tinymce/plugins/table/plugin'
  import 'tinymce/plugins/contextmenu/plugin'
  import '@/tinymce/langage/fr_FR'
  // import idSysteme from '../Resources/store'
  // import _ from 'lodash'

  export default ({
    props: {
      'data': {
        required: false,
        type: String,
        default: ''
      },
      'disabled': {
        default: false
      }
    },
    data () {
      return {
        id: this._uid,
        content: ''
      }
    },
    mounted () {
      this.initJs()
    },
    methods: {
      initTiny (editor) {
        let self = this
        editor.settings.readonly = self.disabled
        editor.on('init', function (e) {
          editor.setContent(self.data)
          self.content = editor.getContent()
          editor.getDoc().body.style.fontSize = '12'
          editor.getDoc().body.style.fontFamily = 'Montserrat'
        })
        if (!self.disabled) {
          editor.on('NodeChange Change keyup', function (e) {
            // console.log(editor.getContent())
            self.content = editor.getContent()
            self.$emit('update', self.content)
            // self.updateValue(editor.getContent())
          })
        }
      },
      initJs () {
        this.$nextTick(function () {
          let self = this
          tinymce.init({
            skin: false,
            height: 500,
            selector: '#tinymce' + self.id,
            // target: this.$el.children[0],
            themes: 'modern',
            menubar: false,
            // language: 'fr_FR',
            language_url: false,
            init_instance_callback: self.initTiny,
            // setup: self.initTiny,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table contextmenu paste code'
            ],
            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code'
            // skin_url: '/css/mytinymceskin'
            // themes: 'modern'
          })
        })
      }
    },
    beforeDestroy () {
      tinymce.remove()
    }
  })
</script>