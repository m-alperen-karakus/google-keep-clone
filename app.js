class App {
    constructor() {
        this.notes=[]


        this.$notes = document.querySelector('#notes');
        this.$placeholder = document.querySelector('#placeholder');
        this.$form = document.querySelector('#form');
        this.$noteTitle = document.querySelector('#note-title');
        this.$noteText = document.querySelector("#note-text")
        this.$formButtons = document.querySelector('#form-buttons');
        this.$formSubmitButton = document.querySelector('#submit-button');
        this.$formCloseButton = document.querySelector("form-close-button");
        this.addEventListeners();
        this.isClicked = true;

    }
    
    addEventListeners() {
        document.body.addEventListener('click', event => {
            this.handleFormClick(event);
      });

        this.$form.addEventListener('submit', event => {
            event.preventDefault();
            const title = this.$noteTitle.value
            const note = this.$noteText.value
            const hasData = title || note
            hasData ? this.addNote({title,note}) : console.log("value doesnt exist")
            console.log(this.notes)

            
            
        })

        this.$formCloseButton.addEventListener("click", this.closeForm())
        
         


    }

    handleFormClick(event) {

        const isFormClicked = this.$form.contains(event.target); 
        const hasntOpen = !this.$form.classList.contains("form-open")
        isFormClicked? this.openForm() : this.closeForm()
        
    }

    openForm(){
        
        this.$form.classList.add('form-open');
        this.$noteTitle.style.display = "block";
        this.$formButtons.style.display = "block";
    }

    closeForm(){
        this.$form.classList.remove('form-open');
        this.$formButtons.style.display = "none";
        this.$noteTitle.style.display = "none";
        this.$noteTitle.value = ""
        this.$noteText.value = ""
    }

    addNote(note) {
        const newNote = {
            title:note.title,
            text:note.text,
            color: "white",
            id : this.notes.length > 0 ? this.notes[this.notes.length - 1 ].id + 1 :0
        }
        this.notes = [...this.notes, newNote]
        this.displayNotes()
        this.closeForm()     
    }

    displayNotes(){
        this.$placeholder.style.display = this.notes.length > 0 ? "none" : "block"

        this.$notes.innerHTML = this.notes.map(note =>
            `
            <div style="background: ${note.color}" class="note">
                <div class=${note.title && 'note-title'}>${note.title}</div>
                <div class='note-text'>${note.text}</div>
                <div class="toolbar-container">
                    <div class="toolbar">
                    <i class="toolbar-color fa-solid fa-palette"></i>
                    <i class="toolbar-delete fa-solid fa-trash-can"></i>
                    </div>
                </div>
            </div>
            `).join("")
    }
  }
  
  new App();
  