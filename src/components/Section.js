export class Section {
    constructor({items, renderer}, elements){
        this.items = items;
        this.renderer = renderer;
        this.elements = elements;
    }

    rendItems(){
        this.items.forEach(item =>{
            this.renderer(item, this.elements);
        })
    }
    addItem(item, containItem){
        containItem.prepend(item);
    }
}