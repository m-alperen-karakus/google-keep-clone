
class App {
    constructor() {
        this.notes= JSON.parse(localStorage.getItem("notes")) || []
        this.modalTitle=""
        this.modalText=""
        this.modalId=""

        this.$notes = document.querySelector('#notes');
        this.$placeholder = document.querySelector('#placeholder');
        this.$form = document.querySelector('#form');
        this.$noteTitle = document.querySelector('#note-title');
        this.$noteText = document.querySelector("#note-text")
        this.$formButtons = document.querySelector('#form-buttons');
        this.$formSubmitButton = document.querySelector('#submit-button');
        this.$formCloseButton = document.querySelector("#form-close-button");
        
        this.$modal = document.querySelector(".modal");
        this.$modalTitle = document.querySelector(".modal-title");
        this.$modalText = document.querySelector(".modal-text");
        this.$modalCloseButton = document.querySelector('.modal-close-button');
        this.$colorTooltip = document.querySelector('#color-tooltip');

        this.displayNotes()
        this.addEventListeners();

    }
    
    addEventListeners() {
        document.body.addEventListener('click', event => {
            this.handleFormClick(event);
            this.selectNote(event);
            this.openModal(event);
            this.deleteNote(event)
      });

        document.body.addEventListener("mouseover", event => this.openTooltip(event))
        document.body.addEventListener("mouseout", event => this.closeTooltip(event))
        this.$colorTooltip.addEventListener("mouseover", function(){this.style.display="flex"})
        this.$colorTooltip.addEventListener("mouseout", function(){this.style.display="none"})
        this.$colorTooltip.addEventListener("click", event=>{
            const selectedColor = event.target.dataset.color
            if(selectedColor) {this.editNoteColor(selectedColor)}
        })




        this.$form.addEventListener('submit', event => {
            event.preventDefault();
            const title = this.$noteTitle.value
            const text = this.$noteText.value
        
            const hasData = title || text
            hasData ? this.addNote({title,text}) : console.log("value doesnt exist")
            console.log(this.notes)
        })

        this.$formCloseButton.addEventListener("click", event =>this.closeForm(event))
        this.$modalCloseButton.addEventListener("click", event =>this.closeModal(event))

        

    }

    handleFormClick(event) {
        const isClickedToClose = event.target.matches("#form-close-button") || false;  

        const isFormClicked = this.$form.contains(event.target); 
        const title = this.$noteTitle.value
        const text = this.$noteText.value
        const hasData = title || text

        if (isFormClicked && !isClickedToClose) { this.openForm() }
        else if(hasData) {this.addNote({title,text})}
        else {this.closeForm()}        
    }

    openForm(){
        
        this.$form.classList.add('form-open');
        this.$noteTitle.style.display = "block";
        this.$formButtons.style.display = "block";
    }

    closeForm(event){
        
        this.$form.classList.remove('form-open');
        this.$formButtons.style.display = "none";
        this.$noteTitle.style.display = "none";
        this.$noteTitle.value = ""
        this.$noteText.value = ""
    }

    addNote({title,text}) {
        const newNote = {
            title:title,
            text:text,
            color: "white",
            id : this.notes.length > 0 ? this.notes[this.notes.length - 1 ].id + 1 :0
        }
        this.notes = [...this.notes, newNote]
        this.displayNotes()
        this.closeForm()     
    }
    saveNotes(){
        localStorage.setItem("notes",JSON.stringify(this.notes))
    }

    displayNotes(){
        this.saveNotes()
        if(!this.notes.length < 0) return
        this.$placeholder.style.display = this.notes.length > 0 ? "none" : "flex"

        this.$notes.innerHTML = this.notes.map(note =>
            `
            <div style="background: ${note.color}" class="note" data-id=${note.id}>
                <div class=${note.title && 'note-title'}>${note.title}</div>
                <div class='note-text'>${note.text}</div>
                <div class="toolbar-container">
                    <div class="toolbar">
                    <i class="toolbar-color fa-solid fa-palette" data-id=${note.id}></i>
                    <i class="toolbar-delete fa-solid fa-trash-can" data-id=${note.id}></i>
                    </div>
                </div>
            </div>
            `).join("")
    }
    openModal(event){
    if (event.target.matches('.toolbar-delete')) return;  

    if (event.target.closest('.note')){
          this.$modal.classList.toggle("open-modal")

          this.$modalTitle.value =this.modalTitle
          this.$modalText.value = this.modalText
      }
    }

    selectNote(event){
        const $selectedNote= event.target.closest('.note')
        if (event.target.matches('.toolbar-delete')) return;  
        if (!$selectedNote) return
        // const [$noteTitle, $noteText] = $selectedNote.children;
        // this.modalTitle = $noteTitle.innerText
        // this.modalText = $noteText.innerText

        this.modalId = $selectedNote.dataset.id;

        this.modalTitle = this.notes[this.modalId]?.title || ""
        this.modalText = this.notes[this.modalId]?.text || ""
    
    }

    closeModal(event){
        this.editModal()
        this.$modal.classList.remove("open-modal")

    }
    editModal(){
        this.notes[this.modalId].title = this.$modalTitle.value
        this.notes[this.modalId].text = this.$modalText.value
        this.displayNotes()
    }

    openTooltip(event){
        if(!event.target.matches(".toolbar-color")) return

        this.modalId = event.target.dataset.id;
        const noteCords = event.target.getBoundingClientRect();
        const horizontal = noteCords.left + window.scrollY
        const vercital = noteCords.top + window.scrollX

        this.$colorTooltip.style.transform= `translate(${horizontal}px, ${vercital}px)`
        this.$colorTooltip.style.display = "flex"
    }
    closeTooltip(event){
        if(!event.target.matches(".toolbar-color")) return
        this.$colorTooltip.style.display="none"
    }

    editNoteColor(color){
        this.notes[this.modalId].color = color
        this.displayNotes()
    }

    deleteNote(event){
        event.stopPropagation();
        this.displayNotes()
        
        if(!event.target.matches(".toolbar-delete")) return
        const id = event.target.dataset.id
        this.notes = this.notes.filter(note => note.id !== Number(id));
        
        this.saveNotes()
        this.displayNotes()

    }
  }

  
  new App();
  