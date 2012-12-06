declare var $;
declare var ace;

var HashHandler = ace.require('ace/keyboard/hash_handler').HashHandler;

class AutoCompleteView {
    
    static selectedClassName = 'autocomplete_selected';
    static className = 'autocomplete';
    wrap:HTMLElement;
    listElement:HTMLElement;
    private handler = new HashHandler();
    changeListener;
    active = false;
    completions;

    constructor(private editor) {
        this.init();
        this.initKeys();
        this.editor.container.appendChild(this.wrap);
        this.listElement.innerHTML = '';
      }

      init() {
        this.wrap = document.createElement('div');
        this.listElement = document.createElement('ul');
        this.wrap.className = AutoCompleteView.className;
        this.wrap.appendChild(this.listElement);
      };

      // Get the text between cursor and start
      getInputText() {
          var cursor = this.editor.getCursorPosition();
          var result = this.editor.getSession().getTokenAt(cursor.row,cursor.column);
          if (result) 
            return result.value;
          else 
            return "";
      }

      filter() {
        var text = this.getInputText().toLowerCase();
        if (! text) return this.completions;

        var result = this.completions.filter(function(entry){
                    return entry.name.toLowerCase().indexOf(text) > -1 ;
        });
        return result;
      }


      initKeys() {

        this.handler.bindKey("Down",() => {this.focusNext()});
        this.handler.bindKey("Up",() => {this.focusPrev()});
        this.handler.bindKey("Esc",() => {this.hide()});  
        this.handler.bindKey("Return|Tab",() => {
            var current = this.current();
            if(current){
                    this.editor.insert(current.dataset["name"]);
            }
            this.hide();
        });    

        // this.handler.bindKeys(AutoCompleteView.KeyBinding);

      }


      show() {
        this.editor.keyBinding.addKeyboardHandler(this.handler);
        this.wrap.style.display = 'block';
        this.changeListener = (ev) => this.onChange(ev);
        // this.editor.getSession().removeAllListeners('change');
        this.editor.getSession().on("change",this.changeListener);
        this.active = true;
      };


      hide() {
        this.editor.keyBinding.removeKeyboardHandler(this.handler);
        this.wrap.style.display = 'none';
        this.editor.getSession().removeListener('change', this.changeListener);
        // this.editor.getSession().removeAllListeners('change');
        this.active = false;
        // this.editor.getSession().on("change",CATS.onChangeHandler);
        // this.editor.getSession().removeAllListeners('change');
      };

      onChange(ev) {
          var key = ev.data.text;
          if(" -=,[]_/()!';:<>".indexOf(key) !== -1){ 
                    this.hide();
          }
      }


      showCompletions(completions){
            if ( this.active) return;

            this.completions = completions;
            var infos = completions; // this.filter();

            if (infos.length > 0){
                this.listElement.innerHTML="";
                // Todo fix text length
                var text = ""; // compilationService.matchText;
                var cursor = this.editor.getCursorPosition();
                var coords = this.editor.renderer.textToScreenCoordinates(cursor.row, cursor.column - text.length);
                this.setPosition(coords);

                this.show();
                var html = '';
                // TODO use template
                for(var n in infos) {
                    var info = infos[n]; 
                    var kindClass = "kind-" + info.kind;                   
                    var name =  '<span class="name '+ kindClass+'">' + info.name + '</span>';
                    var type = "";
                    if (info.name !== info.type) {
                        type =  '<span class="type">' + info.type + '</span>';
                    }
                    var kind = ""; // '<span class="label-kind label-kind-'+ info.kind + '">' + info.kind.charAt(0) + '</span>';

                    html += '<li data-name="' + info.name + '">' + kind + name + type + '</li>';
                }
                this.listElement.innerHTML = html;
                this.ensureFocus();
            }else{
                this.hide();
            }
        };



      // TODO remove jquery dependency
      setPosition(coords) {
        var bottom, editorBottom, top;
        top = coords.pageY + 20;
        editorBottom = $(this.editor.container).offset().top + $(this.editor.container).height();
        bottom = top + $(this.wrap).height();
        if (bottom < editorBottom) {
          this.wrap.style.top = top + 'px';
          return this.wrap.style.left = coords.pageX + 'px';
        } else {
          this.wrap.style.top = (top - $(this.wrap).height() - 20) + 'px';
          return this.wrap.style.left = coords.pageX + 'px';
        }
      };

      current() {
        var child, children, i;
        children = this.listElement.childNodes;
        for (i in children) {
          child = children[i];
          if (child.className === AutoCompleteView.selectedClassName) return child;
        }
        return null;
      };

      focusNext() {
        var curr, focus;
        curr = this.current();
        focus = curr.nextSibling;
        if (focus) {
          curr.className = '';
          focus.className = AutoCompleteView.selectedClassName;
          return this.adjustPosition();
        }
      };

      focusPrev() {
        var curr, focus;
        curr = this.current();
        focus = curr.previousSibling;
        if (focus) {
          curr.className = '';
          focus.className = AutoCompleteView.selectedClassName;
          return this.adjustPosition();
        }
      };

      ensureFocus() {
        if (!this.current()) {
          var element = <HTMLElement>this.listElement.firstChild;
          if (element) {
            element.className = AutoCompleteView.selectedClassName;
            return this.adjustPosition();
          }
        }
      };

      // ToDO use plain DOM API isntead of jquery
      adjustPosition() {
        var elm, elmOuterHeight, newMargin, pos, preMargin, wrapHeight;
        elm = this.current();
        if (elm) {
          newMargin = '';
          wrapHeight = $(this.wrap).height();
          elmOuterHeight = $(elm).outerHeight();
          preMargin = $(this.listElement).css("margin-top").replace('px', '');
          preMargin = parseInt(preMargin);
          pos = $(elm).position();
          if (pos.top >= (wrapHeight - elmOuterHeight)) {
            newMargin = (preMargin - elmOuterHeight) + 'px';
            $(this.listElement).css("margin-top", newMargin);
          }
          if (pos.top < 0) {
            newMargin = (-pos.top + preMargin) + 'px';
            return $(this.listElement).css("margin-top", newMargin);
          }
        }
      };

}
