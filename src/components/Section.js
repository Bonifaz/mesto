export class Section {
    constructor({ renderer}, elements){
        this.renderer = renderer;
        this.elements = elements;
    }

    renderItems(items, name){
        items.forEach(item =>{
            this.renderer(item, this.elements, name);
        })
    }
    addItem(item, containItem){
        containItem.prepend(item);
    }
}